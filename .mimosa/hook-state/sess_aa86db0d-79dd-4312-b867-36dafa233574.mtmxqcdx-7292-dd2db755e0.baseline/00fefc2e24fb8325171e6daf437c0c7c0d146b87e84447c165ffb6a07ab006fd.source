package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/edge"
)

// Share holds the schema definition for the Share entity.
type Share struct {
	ent.Schema
}

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
		edge.From("owner", User.Type).Ref("shares").Unique(),
		edge.From("space", Space.Type).Ref("shares").Unique(),
		edge.From("file", File.Type).Ref("shares").Unique(),
	}
}