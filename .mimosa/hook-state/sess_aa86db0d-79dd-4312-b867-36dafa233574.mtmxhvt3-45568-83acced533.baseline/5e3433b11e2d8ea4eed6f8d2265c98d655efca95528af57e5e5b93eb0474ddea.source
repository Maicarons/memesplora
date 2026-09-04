package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/edge"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

func (User) Fields() []ent.Field {
	return []ent.Field{
		field.String("username").Unique(),
		field.String("email").Unique(),
		field.String("password").Sensitive(),
		field.String("nickname").Default(""),
		field.Int("group_id").Default(1),
		field.Int64("storage_used").Default(0),
		field.Int64("max_storage").Default(0),
		field.Bool("is_admin").Default(false),
		field.Time("created_at"),
		field.Time("updated_at"),
	}
}

func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("spaces", Space.Type),
		edge.To("shares", Share.Type),
	}
}