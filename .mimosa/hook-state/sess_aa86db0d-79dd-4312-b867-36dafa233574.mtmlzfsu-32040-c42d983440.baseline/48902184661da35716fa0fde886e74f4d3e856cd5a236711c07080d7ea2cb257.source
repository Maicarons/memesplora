package logger

import (
	"testing"
)

func TestLoggerLevels(t *testing.T) {
	// Should not panic
	SetLevel("debug")
	Debug("test debug: %s", "message")
	Info("test info: %s", "message")
	Warn("test warn: %s", "message")
	Error("test error: %s", "message")

	SetLevel("error")
	Debug("should not appear")
	Info("should not appear")
	Warn("should not appear")
	Error("should appear")
}

func TestSetLevel(t *testing.T) {
	SetLevel("invalid")
	SetLevel("")
	SetLevel("DEBUG")
	SetLevel("INFO")
	SetLevel("WARN")
	SetLevel("ERROR")
}