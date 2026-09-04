# डेटाबेस डिज़ाइन

## अवलोकन

Memesplora डेटाबेस प्रबंधन के लिए ent ORM का उपयोग करता है, जो SQLite (डेवलपमेंट/स्टैंडअलोन) और PostgreSQL (प्रोडक्शन) का समर्थन करता है। डेटाबेस केवल मेटाडेटा संग्रहीत करता है, वास्तविक फ़ाइल सामग्री मेमोरी फ़ाइल सिस्टम में संग्रहीत होती है।

## ER आरेख

```
┌──────────┐       ┌──────────┐       ┌──────────┐
│   User   │       │  Space   │       │  File    │
├──────────┤       ├──────────┤       ├──────────┤
│ ID       │──┐    │ ID       │──┐    │ ID       │
│ Username │  │    │ Name     │  │    │ Name     │
│ Email    │  │    │ OwnerID  │◄─┘    │ Path     │
│ Password │  │    │ TotalSize│       │ Size     │
│ GroupID  │  │    │ UsedSize │       │ Type     │
│ Storage  │  │    │ BlockSize│       │ SpaceID  │◄──┐
│ Max      │  │    │ DeviceID │       │ ParentID │   │
│ IsAdmin  │  │    │ DeviceType│      │ InodeID  │   │
│ Created  │  │    │ Status   │       │ Created  │   │
│ Updated  │  │    │ Created  │       │ Updated  │   │
└──────────┘  │    └──────────┘       │ Deleted  │   │
              │                       └──────────┘   │
              │    ┌──────────┐                       │
              │    │  Share   │                       │
              │    ├──────────┤                       │
              │    │ ID       │                       │
              └───►│ OwnerID  │                       │
                   │ SpaceID  │◄──────────────────────┘
                   │ FileID   │
                   │ ShareKey │
                   │ ExpireAt │
                   │ Password │
                   │ Created  │
                   └──────────┘
```

## डेटा तालिका परिभाषा

### User (उपयोगकर्ता)

```go
func (User) Fields() []ent.Field {
    return []ent.Field{
        field.String("username").Unique(),
        field.String("email").Unique(),
        field.String("password").Sensitive(),
        field.String("nickname").Default(""),
        field.Int("group_id"),
        field.Int64("storage_used").Default(0),
        field.Int64("max_storage").Default(0), // 0 = असीमित
        field.Bool("is_admin").Default(false),
        field.Time("created_at"),
        field.Time("updated_at"),
    }
}

func (User) Edges() []ent.Edge {
    return []ent.Edge{
        hasMany("spaces"),
        hasMany("shares"),
    }
}
```

### Space (स्टोरेज स्पेस)

```go
func (Space) Fields() []ent.Field {
    return []ent.Field{
        field.String("name"),
        field.String("description").Optional(),
        field.Int64("total_size"),
        field.Int64("used_size").Default(0),
        field.Int("block_size").Default(4096),
        field.String("device_id"),
        field.Enum("device_type").Values("ram", "vram", "swap"),
        field.Enum("status").Values("active", "inactive", "error"),
        field.JSON("options", map[string]interface{}{}).Optional(),
        field.Time("created_at"),
        field.Time("updated_at"),
    }
}

func (Space) Edges() []ent.Edge {
    return []ent.Edge{
        belongsTo("owner", User.Type),
        hasMany("files"),
        hasMany("shares"),
    }
}
```

### File (फ़ाइल मेटाडेटा)

```go
func (File) Fields() []ent.Field {
    return []ent.Field{
        field.String("name"),
        field.String("path"),
        field.Int64("size"),
        field.Enum("type").Values("file", "directory"),
        field.String("mime_type").Optional(),
        field.Uint64("inode_id"),
        field.String("parent_id").Optional(),
        field.String("storage_key").Optional(),
        field.Bool("is_shareable").Default(false),
        field.Time("created_at"),
        field.Time("updated_at"),
        field.Time("deleted_at").Optional().Nillable(),
    }
}

func (File) Edges() []ent.Edge {
    return []ent.Edge{
        belongsTo("space", Space.Type),
        hasMany("shares"),
    }
}
```

### Share (शेयर लिंक)

```go
func (Share) Fields() []ent.Field {
    return []ent.Field{
        field.String("share_key").Unique(),
        field.Int64("download_limit").Default(0),
        field.Int64("download_count").Default(0),
        field.Time("expire_at").Optional().Nillable(),
        field.Bool("is_password").Default(false),
        field.String("password").Optional().Sensitive(),
        field.Time("created_at"),
    }
}

func (Share) Edges() []ent.Edge {
    return []ent.Edge{
        belongsTo("owner", User.Type),
        belongsTo("space", Space.Type),
        belongsTo("file", File.Type),
    }
}
```

## डेटाबेस चयन

| वातावरण | डेटाबेस | विवरण |
|:----:|:------:|------|
| डेवलपमेंट | SQLite | अतिरिक्त कॉन्फ़िगरेशन की आवश्यकता नहीं, फ़ाइल डेटाबेस |
| स्टैंडअलोन डिप्लॉयमेंट | SQLite | एकल उपयोगकर्ता परिदृश्य के लिए उपयुक्त |
| प्रोडक्शन डिप्लॉयमेंट | PostgreSQL | समवर्ती का समर्थन करता है, बहु-उपयोगकर्ता के लिए उपयुक्त |

## इंडेक्स डिज़ाइन

```sql
-- उपयोगकर्ता तालिका
CREATE INDEX idx_user_username ON users(username);
CREATE INDEX idx_user_email ON users(email);

-- स्पेस तालिका
CREATE INDEX idx_space_owner ON spaces(owner_id);
CREATE INDEX idx_space_device ON spaces(device_id);

-- फ़ाइल तालिका
CREATE INDEX idx_file_space_path ON files(space_id, path);
CREATE INDEX idx_file_parent ON files(parent_id);
CREATE INDEX idx_file_deleted ON files(deleted_at);

-- शेयर तालिका
CREATE INDEX idx_share_key ON shares(share_key);
CREATE INDEX idx_share_owner ON shares(owner_id);
```