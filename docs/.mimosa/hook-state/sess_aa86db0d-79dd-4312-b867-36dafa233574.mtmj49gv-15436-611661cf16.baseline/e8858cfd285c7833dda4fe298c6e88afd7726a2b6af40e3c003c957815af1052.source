package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/edge"
)

// Space holds the schema definition for the Space entity.
type Space struct {
	ent.Schema
}

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
		edge.From("owner", User.Type).Ref("spaces").Unique(),
		edge.To("files", File.Type),
		edge.To("shares", Share.Type),
	}
}