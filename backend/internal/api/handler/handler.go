package handler

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"memesplora/backend/internal/config"
	"memesplora/backend/internal/service"
)

type Handler struct {
	svc *service.Service
	cfg *config.Config
}

func NewHandler(svc *service.Service, cfg *config.Config) *Handler {
	return &Handler{svc: svc, cfg: cfg}
}

// Auth handlers

func (h *Handler) Login(c *gin.Context) {
	var req struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": "Invalid request"})
		return
	}

	token, user, err := h.svc.Login(req.Username, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"code": 40002, "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": 0,
		"data": gin.H{
			"token": token,
			"user":  user,
		},
	})
}

func (h *Handler) GetSession(c *gin.Context) {
	userID, _ := c.Get("user_id")
	user, err := h.svc.GetUser(userID.(uint32))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"code": 40004, "message": "User not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": user})
}

// Device handlers

func (h *Handler) ListDevices(c *gin.Context) {
	devices := h.svc.ListDevices()
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": devices})
}

func (h *Handler) GetDevice(c *gin.Context) {
	id := c.Param("id")
	device, err := h.svc.GetDevice(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"code": 40004, "message": "Device not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": device})
}

func (h *Handler) DeviceHealth(c *gin.Context) {
	id := c.Param("id")
	healthy := h.svc.DeviceHealth(id)
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": gin.H{"healthy": healthy}})
}

// Space handlers

func (h *Handler) ListSpaces(c *gin.Context) {
	userID, _ := c.Get("user_id")
	spaces := h.svc.ListSpaces(userID.(uint32))
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": spaces})
}

func (h *Handler) CreateSpace(c *gin.Context) {
	var req struct {
		Name        string `json:"name" binding:"required"`
		Description string `json:"description"`
		TotalSize   int64  `json:"total_size" binding:"required"`
		DeviceID    string `json:"device_id" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": "Invalid request"})
		return
	}

	userID, _ := c.Get("user_id")
	space, err := h.svc.CreateSpace(userID.(uint32), req.Name, req.Description, req.TotalSize, req.DeviceID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": space})
}

func (h *Handler) GetSpace(c *gin.Context) {
	id := c.Param("id")
	space, err := h.svc.GetSpace(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"code": 40004, "message": "Space not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": space})
}

func (h *Handler) UpdateSpace(c *gin.Context) {
	var req struct {
		Name        string `json:"name"`
		Description string `json:"description"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": "Invalid request"})
		return
	}
	id := c.Param("id")
	space, err := h.svc.UpdateSpace(id, req.Name, req.Description)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": space})
}

func (h *Handler) DeleteSpace(c *gin.Context) {
	id := c.Param("id")
	if err := h.svc.DeleteSpace(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "message": "Space deleted"})
}

func (h *Handler) ResizeSpace(c *gin.Context) {
	var req struct {
		NewSize int64 `json:"new_size" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": "Invalid request"})
		return
	}
	id := c.Param("id")
	space, err := h.svc.ResizeSpace(id, req.NewSize)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": space})
}

// File handlers

func (h *Handler) ListFiles(c *gin.Context) {
	spaceID := c.Param("id")
	path := c.DefaultQuery("path", "/")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "50"))
	orderBy := c.DefaultQuery("order_by", "name")

	files, total, err := h.svc.ListFiles(spaceID, path, page, pageSize, orderBy)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"code": 0,
		"data": gin.H{
			"files":     files,
			"total":     total,
			"page":      page,
			"page_size": pageSize,
		},
	})
}

func (h *Handler) UploadFile(c *gin.Context) {
	spaceID := c.Param("id")
	path := c.DefaultQuery("path", "/")

	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": "No file provided"})
		return
	}
	defer file.Close()

	userID, _ := c.Get("user_id")
	fileInfo, err := h.svc.UploadFile(userID.(uint32), spaceID, path, header.Filename, file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": fileInfo})
}

func (h *Handler) DownloadFile(c *gin.Context) {
	spaceID := c.Param("id")
	fileID := c.Param("fileId")

	reader, name, err := h.svc.DownloadFile(spaceID, fileID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"code": 40004, "message": "File not found"})
		return
	}
	defer reader.Close()

	c.Header("Content-Disposition", "attachment; filename="+name)
	c.Header("Content-Type", "application/octet-stream")
	http.ServeContent(c.Writer, c.Request, name, time.Time{}, reader)
}

func (h *Handler) DeleteFile(c *gin.Context) {
	spaceID := c.Param("id")
	fileID := c.Param("fileId")

	if err := h.svc.DeleteFile(spaceID, fileID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "message": "File deleted"})
}

func (h *Handler) UpdateFile(c *gin.Context) {
	// Stub: update file metadata
	c.JSON(http.StatusOK, gin.H{"code": 0, "message": "Not implemented"})
}

func (h *Handler) RenameFile(c *gin.Context) {
	var req struct {
		Name string `json:"name" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": "Invalid request"})
		return
	}

	spaceID := c.Param("id")
	fileID := c.Param("fileId")

	fileInfo, err := h.svc.RenameFile(spaceID, fileID, req.Name)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": fileInfo})
}

func (h *Handler) MoveFile(c *gin.Context) {
	var req struct {
		DestPath string `json:"dest_path" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": "Invalid request"})
		return
	}

	spaceID := c.Param("id")
	fileID := c.Param("fileId")

	fileInfo, err := h.svc.MoveFile(spaceID, fileID, req.DestPath)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": fileInfo})
}

func (h *Handler) CopyFile(c *gin.Context) {
	var req struct {
		DestPath string `json:"dest_path" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": "Invalid request"})
		return
	}

	spaceID := c.Param("id")
	fileID := c.Param("fileId")

	fileInfo, err := h.svc.CopyFile(spaceID, fileID, req.DestPath)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": fileInfo})
}

func (h *Handler) CreateDir(c *gin.Context) {
	var req struct {
		Path string `json:"path" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": "Invalid request"})
		return
	}

	spaceID := c.Param("id")
	userID, _ := c.Get("user_id")

	dirInfo, err := h.svc.CreateDir(userID.(uint32), spaceID, req.Path)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": dirInfo})
}

// Share handlers

func (h *Handler) CreateShare(c *gin.Context) {
	var req struct {
		FileID        string `json:"file_id" binding:"required"`
		SpaceID       string `json:"space_id" binding:"required"`
		ExpireAt      string `json:"expire_at"`
		DownloadLimit int64  `json:"download_limit"`
		IsPassword    bool   `json:"is_password"`
		Password      string `json:"password"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": "Invalid request"})
		return
	}

	userID, _ := c.Get("user_id")
	share, err := h.svc.CreateShare(userID.(uint32), req.FileID, req.SpaceID, req.ExpireAt, req.DownloadLimit, req.IsPassword, req.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": share})
}

func (h *Handler) ListShares(c *gin.Context) {
	userID, _ := c.Get("user_id")
	shares := h.svc.ListShares(userID.(uint32))
	c.JSON(http.StatusOK, gin.H{"code": 0, "data": shares})
}

func (h *Handler) DeleteShare(c *gin.Context) {
	id := c.Param("id")
	if err := h.svc.DeleteShare(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"code": 40001, "message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"code": 0, "message": "Share deleted"})
}

func (h *Handler) DownloadByShareKey(c *gin.Context) {
	key := c.Param("key")
	password := c.DefaultQuery("password", "")

	reader, name, err := h.svc.DownloadByShareKey(key, password)
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"code": 40003, "message": err.Error()})
		return
	}
	defer reader.Close()

	c.Header("Content-Disposition", "attachment; filename="+name)
	c.Header("Content-Type", "application/octet-stream")
	http.ServeContent(c.Writer, c.Request, name, time.Time{}, reader)
}