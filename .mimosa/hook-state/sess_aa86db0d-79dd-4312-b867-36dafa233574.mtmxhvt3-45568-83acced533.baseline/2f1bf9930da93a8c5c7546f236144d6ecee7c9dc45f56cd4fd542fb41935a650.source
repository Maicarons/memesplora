package logger

import (
	"log"
	"os"
	"strings"
)

type Level int

const (
	LevelDebug Level = iota
	LevelInfo
	LevelWarn
	LevelError
)

var (
	currentLevel = LevelInfo
	infoLog      = log.New(os.Stdout, "[INFO] ", log.Ldate|log.Ltime)
	warnLog      = log.New(os.Stdout, "[WARN] ", log.Ldate|log.Ltime)
	errorLog     = log.New(os.Stderr, "[ERROR] ", log.Ldate|log.Ltime)
	debugLog     = log.New(os.Stdout, "[DEBUG] ", log.Ldate|log.Ltime)
)

func SetLevel(level string) {
	switch strings.ToLower(level) {
	case "debug":
		currentLevel = LevelDebug
	case "info":
		currentLevel = LevelInfo
	case "warn":
		currentLevel = LevelWarn
	case "error":
		currentLevel = LevelError
	}
}

func Debug(format string, v ...interface{}) {
	if currentLevel <= LevelDebug {
		debugLog.Printf(format, v...)
	}
}

func Info(format string, v ...interface{}) {
	if currentLevel <= LevelInfo {
		infoLog.Printf(format, v...)
	}
}

func Warn(format string, v ...interface{}) {
	if currentLevel <= LevelWarn {
		warnLog.Printf(format, v...)
	}
}

func Error(format string, v ...interface{}) {
	if currentLevel <= LevelError {
		errorLog.Printf(format, v...)
	}
}