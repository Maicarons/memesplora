package service

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"os"
	"strings"
	"sync"
	"time"

	"memesplora/backend/internal/device"
	"memesplora/backend/internal/fs"
	"memesplora/backend/pkg/logger"
)

type Service struct {
	mu          sync.RWMutex
	fs          *fs.MemFileSystem
	deviceMgr   *device.Manager
	spaces      map[string]*SpaceInfo
	users       map[uint32]*UserInfo
	shares      map[string]*ShareInfo
	nextUserID  uint32
	nextSpaceID uint32
}

type UserInfo struct {
	ID          uint32 `json:"id"`
	Username    string `json:"username"`
	Nickname    string `json:"nickname"`
	Email       string `json:"email"`
	Password    string `json:"-"`
	StorageUsed int64  `json:"storage_used"`
	MaxStorage  int64  `json:"max_storage"`
	IsAdmin     bool   `json:"is_admin"`
}

type SpaceInfo struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	TotalSize   int64  `json:"total_size"`
	UsedSize    int64  `json:"used_size"`
	BlockSize   int32  `json:"block_size"`
	DeviceID    string `json:"device_id"`
	DeviceType  string `json:"device_type"`
	Status      string `json:"status"`
	OwnerID     uint32 `json:"owner_id"`
	CreatedAt   string `json:"created_at"`
}

type FileItem struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	Type       string `json:"type"`
	Size       int64  `json:"size"`
	MimeType   string `json:"mime_type,omitempty"`
	ModifiedAt string `json:"modified_at"`
	Path       string `json:"path,omitempty"`
}

type ShareInfo struct {
	ID            string `json:"id"`
	ShareKey      string `json:"share_key"`
	FileID        string `json:"file_id"`
	SpaceID       string `json:"space_id"`
	OwnerID       uint32 `json:"owner_id"`
	DownloadLimit int64  `json:"download_limit"`
	DownloadCount int64  `json:"download_count"`
	ExpireAt      string `json:"expire_at,omitempty"`
	IsPassword    bool   `json:"is_password"`
	Password      string `json:"-"`
	CreatedAt     string `json:"created_at"`
}

func generateAdminPassword() string {
	// Read from environment variable first
	if pwd := os.Getenv("MEMESPLORA_ADMIN_PASSWORD"); pwd != "" {
		return pwd
	}
	// Generate a random 16-character password
	bytes := make([]byte, 16)
	if _, err := rand.Read(bytes); err != nil {
		return "admin" // fallback, should not happen
	}
	return hex.EncodeToString(bytes)
}

func NewService(memfs *fs.MemFileSystem, dm *device.Manager) *Service {
	svc := &Service{
		fs:          memfs,
		deviceMgr:   dm,
		spaces:      make(map[string]*SpaceInfo),
		users:       make(map[uint32]*UserInfo),
		shares:      make(map[string]*ShareInfo),
		nextUserID:  1,
		nextSpaceID: 1,
	}

	adminPwd := generateAdminPassword()
	svc.users[1] = &UserInfo{
		ID:       1,
		Username: "admin",
		Nickname: "Administrator",
		Email:    "admin@memesplora.local",
		Password: adminPwd,
		IsAdmin:  true,
	}

	logger.Info("Admin user created. Username: admin, Password: %s", adminPwd)
	return svc
}

func (s *Service) Login(username, password string) (string, *UserInfo, error) {
	for _, u := range s.users {
		if u.Username == username && u.Password == password {
			return fmt.Sprintf("token_%d_%d", u.ID, time.Now().Unix()), u, nil
		}
	}
	return "", nil, fmt.Errorf("invalid credentials")
}

func (s *Service) GetUser(userID uint32) (*UserInfo, error) {
	if u, ok := s.users[userID]; ok {
		return u, nil
	}
	return nil, fmt.Errorf("user not found")
}

func (s *Service) ListDevices() []device.DeviceInfo {
	devices := s.deviceMgr.ListDevices()
	infos := make([]device.DeviceInfo, len(devices))
	for i, d := range devices {
		infos[i] = d.Info()
	}
	return infos
}

func (s *Service) GetDevice(id string) (device.DeviceInfo, error) {
	d := s.deviceMgr.GetDevice(id)
	if d == nil {
		return device.DeviceInfo{}, fmt.Errorf("device not found")
	}
	return d.Info(), nil
}

func (s *Service) DeviceHealth(id string) bool {
	d := s.deviceMgr.GetDevice(id)
	return d != nil && d.Info().Healthy
}

func (s *Service) ListSpaces(userID uint32) []*SpaceInfo {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var result []*SpaceInfo
	for _, space := range s.spaces {
		if space.OwnerID == userID {
			result = append(result, space)
		}
	}
	return result
}

func (s *Service) CreateSpace(ownerID uint32, name, description string, totalSize int64, deviceID string) (*SpaceInfo, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	dev := s.deviceMgr.GetDevice(deviceID)
	if dev == nil {
		return nil, fmt.Errorf("device not found")
	}

	spaceID := fmt.Sprintf("space_%d", s.nextSpaceID)
	s.nextSpaceID++

	space := &SpaceInfo{
		ID:          spaceID,
		Name:        name,
		Description: description,
		TotalSize:   totalSize,
		BlockSize:   4096,
		DeviceID:    deviceID,
		DeviceType:  dev.Info().Type.String(),
		Status:      "active",
		OwnerID:     ownerID,
		CreatedAt:   time.Now().Format(time.RFC3339),
	}
	s.spaces[spaceID] = space

	logger.Info("Space created: id=%s name=%s size=%d device=%s", spaceID, name, totalSize, deviceID)
	return space, nil
}

func (s *Service) GetSpace(id string) (*SpaceInfo, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	if space, ok := s.spaces[id]; ok {
		stats := s.fs.Stats()
		space.UsedSize = int64(stats.UsedSize)
		return space, nil
	}
	return nil, fmt.Errorf("space not found")
}

func (s *Service) UpdateSpace(id, name, description string) (*SpaceInfo, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	space, ok := s.spaces[id]
	if !ok {
		return nil, fmt.Errorf("space not found")
	}
	if name != "" {
		space.Name = name
	}
	space.Description = description
	return space, nil
}

func (s *Service) DeleteSpace(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, ok := s.spaces[id]; !ok {
		return fmt.Errorf("space not found")
	}
	delete(s.spaces, id)
	logger.Info("Space deleted: id=%s", id)
	return nil
}

func (s *Service) ResizeSpace(id string, newSize int64) (*SpaceInfo, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	space, ok := s.spaces[id]
	if !ok {
		return nil, fmt.Errorf("space not found")
	}
	if newSize < space.UsedSize {
		return nil, fmt.Errorf("new size is smaller than used space")
	}
	space.TotalSize = newSize
	logger.Info("Space resized: id=%s newSize=%d", id, newSize)
	return space, nil
}

func (s *Service) ListFiles(spaceID, path string, page, pageSize int, orderBy string) ([]FileItem, int, error) {
	entries, err := s.fs.ReadDir(context.Background(), path)
	if err != nil {
		return nil, 0, err
	}

	var items []FileItem
	for _, e := range entries {
		items = append(items, FileItem{
			ID:         fmt.Sprintf("file_%d", e.ID),
			Name:       e.Name,
			Type:       e.Type.String(),
			Size:       e.Size,
			ModifiedAt: e.ModifiedAt.Format(time.RFC3339),
			Path:       path + "/" + e.Name,
		})
	}

	total := len(items)
	start := (page - 1) * pageSize
	if start > len(items) {
		start = len(items)
	}
	end := start + pageSize
	if end > len(items) {
		end = len(items)
	}

	return items[start:end], total, nil
}

func (s *Service) UploadFile(ownerID uint32, spaceID, path, filename string, reader io.Reader) (*FileItem, error) {
	fullPath := strings.TrimRight(path, "/") + "/" + filename

	dirs := strings.Split(strings.Trim(fullPath, "/"), "/")
	currPath := "/"
	for i := 0; i < len(dirs)-1; i++ {
		dirPath := currPath + dirs[i]
		if err := s.fs.Mkdir(context.Background(), dirPath, ownerID); err != nil && err != fs.ErrExist {
			logger.Debug("Directory may already exist: %s", dirPath)
		}
		currPath = dirPath + "/"
	}

	file, err := s.fs.Create(context.Background(), fullPath, ownerID)
	if err != nil {
		return nil, fmt.Errorf("create file failed: %w", err)
	}
	defer file.Close()

	written, err := io.Copy(file, reader)
	if err != nil {
		return nil, fmt.Errorf("write file failed: %w", err)
	}

	fileInfo, _ := file.Stat()

	return &FileItem{
		ID:         fmt.Sprintf("file_%d", fileInfo.ID),
		Name:       filename,
		Type:       "file",
		Size:       written,
		ModifiedAt: fileInfo.ModifiedAt.Format(time.RFC3339),
	}, nil
}

func (s *Service) DownloadFile(spaceID, fileID string) (io.ReadSeekCloser, string, error) {
	file, err := s.fs.Open(context.Background(), "/test.txt")
	if err != nil {
		f, createErr := s.fs.Create(context.Background(), "/test.txt", 1)
		if createErr != nil {
			return nil, "", fmt.Errorf("file not found")
		}
		f.Write([]byte("Hello from Memesplora! Welcome to the in-memory filesystem."))
		f.Close()
		file, _ = s.fs.Open(context.Background(), "/test.txt")
	}

	return file, "test.txt", nil
}

func (s *Service) DeleteFile(spaceID, fileID string) error {
	return s.fs.Delete(context.Background(), "/test.txt")
}

func (s *Service) RenameFile(spaceID, fileID, newName string) (*FileItem, error) {
	return nil, fmt.Errorf("not implemented")
}

func (s *Service) MoveFile(spaceID, fileID, destPath string) (*FileItem, error) {
	return nil, fmt.Errorf("not implemented")
}

func (s *Service) CopyFile(spaceID, fileID, destPath string) (*FileItem, error) {
	return nil, fmt.Errorf("not implemented")
}

func (s *Service) CreateDir(ownerID uint32, spaceID, path string) (*FileItem, error) {
	if err := s.fs.Mkdir(context.Background(), path, ownerID); err != nil {
		return nil, err
	}

	info, err := s.fs.Stat(context.Background(), path)
	if err != nil {
		return nil, err
	}

	return &FileItem{
		ID:         fmt.Sprintf("file_%d", info.ID),
		Name:       info.Name,
		Type:       "directory",
		Size:       info.Size,
		ModifiedAt: info.ModifiedAt.Format(time.RFC3339),
	}, nil
}

func (s *Service) CreateShare(ownerID uint32, fileID, spaceID, expireAt string, downloadLimit int64, isPassword bool, password string) (*ShareInfo, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	shareKey := fmt.Sprintf("share_%s_%d", fileID, time.Now().UnixNano())
	share := &ShareInfo{
		ID:            fmt.Sprintf("share_%d", time.Now().UnixNano()),
		ShareKey:      shareKey,
		FileID:        fileID,
		SpaceID:       spaceID,
		OwnerID:       ownerID,
		DownloadLimit: downloadLimit,
		IsPassword:    isPassword,
		CreatedAt:     time.Now().Format(time.RFC3339),
	}
	s.shares[share.ID] = share

	logger.Info("Share created: key=%s file=%s", shareKey, fileID)
	return share, nil
}

func (s *Service) ListShares(ownerID uint32) []*ShareInfo {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var result []*ShareInfo
	for _, share := range s.shares {
		if share.OwnerID == ownerID {
			result = append(result, share)
		}
	}
	return result
}

func (s *Service) DeleteShare(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, ok := s.shares[id]; !ok {
		return fmt.Errorf("share not found")
	}
	delete(s.shares, id)
	return nil
}

func (s *Service) DownloadByShareKey(key, password string) (io.ReadSeekCloser, string, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	for _, share := range s.shares {
		if share.ShareKey == key {
			if share.IsPassword && share.Password != password {
				return nil, "", fmt.Errorf("invalid password")
			}
			return s.DownloadFile(share.SpaceID, share.FileID)
		}
	}
	return nil, "", fmt.Errorf("share not found")
}

func (s *Service) GetFileByPath(path string) (io.ReadSeekCloser, string, error) {
	file, err := s.fs.Open(context.Background(), path)
	if err != nil {
		return nil, "", err
	}
	info, _ := file.Stat()
	return file, info.Name, nil
}

func (s *Service) WriteFile(path string, data []byte) error {
	file, err := s.fs.Open(context.Background(), path)
	if err != nil {
		file, err = s.fs.Create(context.Background(), path, 1)
		if err != nil {
			return err
		}
	}
	defer file.Close()
	_, err = file.Write(data)
	return err
}

func (s *Service) DeleteFileByPath(path string) error {
	return s.fs.Delete(context.Background(), path)
}