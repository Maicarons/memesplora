package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/edge"
)

// File holds the schema definition for the File entity.
type File struct {
	ent.Schema
}

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
		edge.From("space", Space.Type).Ref("files").Unique(),
		edge.To("shares", Share.Type),
	}
}