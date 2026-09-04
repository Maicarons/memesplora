package config

import (
	"os"

	"gopkg.in/yaml.v3"
)

type Config struct {
	Server   ServerConfig   `yaml:"server"`
	Database DatabaseConfig `yaml:"database"`
	Auth     AuthConfig     `yaml:"auth"`
	Storage  StorageConfig  `yaml:"storage"`
	Log      LogConfig      `yaml:"log"`
}

type ServerConfig struct {
	HTTPPort   int    `yaml:"http_port"`
	S3Port     int    `yaml:"s3_port"`
	WebDAVPort int    `yaml:"webdav_port"`
	Host       string `yaml:"host"`
}

type DatabaseConfig struct {
	Driver string `yaml:"driver"`
	DSN    string `yaml:"dsn"`
}

type AuthConfig struct {
	JWTSecret    string `yaml:"jwt_secret"`
	TokenExpire  string `yaml:"token_expire"`
}

type StorageConfig struct {
	DefaultBlockSize uint32 `yaml:"default_block_size"`
	MaxSpaceSize     string `yaml:"max_space_size"`
	AllowVRAM        bool   `yaml:"allow_vram"`
}

type LogConfig struct {
	Level string `yaml:"level"`
	File  string `yaml:"file"`
}

func DefaultConfig() *Config {
	return &Config{
		Server: ServerConfig{
			HTTPPort:   5212,
			S3Port:     5213,
			WebDAVPort: 5214,
			Host:       "0.0.0.0",
		},
		Database: DatabaseConfig{
			Driver: "sqlite",
			DSN:    "./data/memesplora.db",
		},
		Auth: AuthConfig{
			JWTSecret:   "change-me-to-a-random-string",
			TokenExpire: "24h",
		},
		Storage: StorageConfig{
			DefaultBlockSize: 4096,
			MaxSpaceSize:     "1TB",
			AllowVRAM:        false,
		},
		Log: LogConfig{
			Level: "info",
		},
	}
}

func LoadConfig(path string) (*Config, error) {
	cfg := DefaultConfig()
	data, err := os.ReadFile(path)
	if err != nil {
		if os.IsNotExist(err) {
			return cfg, nil
		}
		return nil, err
	}
	if err := yaml.Unmarshal(data, cfg); err != nil {
		return nil, err
	}
	return cfg, nil
}