package fs

import "strings"

// CleanPath normalizes a file path
func CleanPath(path string) string {
	if path == "" || path == "/" {
		return "/"
	}
	if path[0] != '/' {
		path = "/" + path
	}
	// Remove trailing slash
	for len(path) > 1 && path[len(path)-1] == '/' {
		path = path[:len(path)-1]
	}
	return path
}

// SplitPath splits a path into parent directory and base name
func SplitPath(path string) (string, string) {
	path = CleanPath(path)
	if path == "/" {
		return "/", ""
	}
	idx := strings.LastIndex(path, "/")
	if idx == 0 {
		return "/", path[1:]
	}
	return path[:idx], path[idx+1:]
}

// DirName returns the parent directory path
func DirName(path string) string {
	parent, _ := SplitPath(path)
	return parent
}

// BaseName returns the file name from a path
func BaseName(path string) string {
	_, name := SplitPath(path)
	return name
}

// IsDir checks if a path represents a directory
func IsDir(path string) bool {
	return path == "" || path == "/" || path[len(path)-1] == '/'
}

// isValidName checks if a filename is valid
func isValidName(name string) bool {
	if len(name) == 0 || len(name) > 255 {
		return false
	}
	if strings.Contains(name, "/") || strings.Contains(name, "\x00") {
		return false
	}
	if name == "." || name == ".." {
		return false
	}
	return true
}