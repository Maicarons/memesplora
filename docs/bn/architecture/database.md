# ডাটাবেস ডিজাইন

## ওভারভিউ

Memesplora ent ORM ব্যবহার করে ডাটাবেস ম্যানেজমেন্ট করে, যা SQLite (ডেভেলপমেন্ট/একক মেশিন) এবং PostgreSQL (প্রোডাকশন) সমর্থন করে। ডাটাবেস শুধুমাত্র মেটাডেটা সংরক্ষণ করে, প্রকৃত ফাইল কন্টেন্ট মেমোরি ফাইলসিস্টেমে সংরক্ষিত থাকে।

## ER ডায়াগ্রাম

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

## ডেটা টেবিল সংজ্ঞা

### User (ব্যবহারকারী)

```go
func (User) Fields() []ent.Field {
    return []ent.Field{
        field.String("username").Unique(),
        field.String("email").Unique(),
        field.String("password").Sensitive(),
        field.String("nickname").Default(""),
        field.Int("group_id"),
        field.Int64("storage_used").Default(0),
        field.Int64("max_storage").Default(0), // 0 = সীমাহীন
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

### Space (স্টোরেজ স্পেস)

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

### File (ফাইল মেটাডেটা)

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

### Share (শেয়ার লিংক)

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

## ডাটাবেস নির্বাচন

| পরিবেশ | ডাটাবেস | বিবরণ |
|:----:|:------:|------|
| ডেভেলপমেন্ট | SQLite | অতিরিক্ত কনফিগারেশনের প্রয়োজন নেই, ফাইল ডাটাবেস |
| একক মেশিন ডিপ্লয়মেন্ট | SQLite | একক ইউজার দৃশ্যের জন্য উপযুক্ত |
| প্রোডাকশন ডিপ্লয়মেন্ট | PostgreSQL | কনকারেন্সি সমর্থন করে, মাল্টি-ইউজারের জন্য উপযুক্ত |

## ইনডেক্স ডিজাইন

```sql
-- ইউজার টেবিল
CREATE INDEX idx_user_username ON users(username);
CREATE INDEX idx_user_email ON users(email);

-- স্পেস টেবিল
CREATE INDEX idx_space_owner ON spaces(owner_id);
CREATE INDEX idx_space_device ON spaces(device_id);

-- ফাইল টেবিল
CREATE INDEX idx_file_space_path ON files(space_id, path);
CREATE INDEX idx_file_parent ON files(parent_id);
CREATE INDEX idx_file_deleted ON files(deleted_at);

-- শেয়ার টেবিল
CREATE INDEX idx_share_key ON shares(share_key);
CREATE INDEX idx_share_owner ON shares(owner_id);
```