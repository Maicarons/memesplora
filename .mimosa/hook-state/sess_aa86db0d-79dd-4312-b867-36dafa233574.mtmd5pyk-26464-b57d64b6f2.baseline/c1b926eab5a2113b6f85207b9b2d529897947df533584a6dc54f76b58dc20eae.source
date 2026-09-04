package api

import (
	"github.com/gin-gonic/gin"

	"memesplora/backend/internal/api/handler"
	"memesplora/backend/internal/api/middleware"
	"memesplora/backend/internal/config"
)

func NewRouter(h *handler.Handler, authMW *middleware.AuthMiddleware, cfg *config.Config) *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()

	// Global middleware
	r.Use(middleware.CORSMiddleware())
	r.Use(middleware.LoggerMiddleware())
	r.Use(middleware.RateLimitMiddleware())
	r.Use(gin.Recovery())

	// API v3 routes
	v3 := r.Group("/api/v3")
	{
		// Auth routes (no auth required)
		adminGroup := v3.Group("/admin")
		{
			adminGroup.POST("/login", h.Login)
		}

		// User routes
		userGroup := v3.Group("/user")
		userGroup.Use(authMW.RequireAuth())
		{
			userGroup.GET("/session", h.GetSession)
		}

		// Device routes
		deviceGroup := v3.Group("/device")
		deviceGroup.Use(authMW.RequireAuth())
		{
			deviceGroup.GET("", h.ListDevices)
			deviceGroup.GET("/:id", h.GetDevice)
			deviceGroup.GET("/:id/health", h.DeviceHealth)
		}

		// Space routes
		spaceGroup := v3.Group("/space")
		spaceGroup.Use(authMW.RequireAuth())
		{
			spaceGroup.GET("", h.ListSpaces)
			spaceGroup.POST("", h.CreateSpace)
			spaceGroup.GET("/:id", h.GetSpace)
			spaceGroup.PATCH("/:id", h.UpdateSpace)
			spaceGroup.DELETE("/:id", h.DeleteSpace)
			spaceGroup.POST("/:id/resize", h.ResizeSpace)
		}

		// File routes
		fileGroup := v3.Group("/space/:id")
		fileGroup.Use(authMW.RequireAuth())
		{
			fileGroup.GET("/files", h.ListFiles)
			fileGroup.POST("/files", h.UploadFile)
			fileGroup.GET("/files/:fileId", h.DownloadFile)
			fileGroup.DELETE("/files/:fileId", h.DeleteFile)
			fileGroup.PUT("/files/:fileId", h.UpdateFile)
			fileGroup.POST("/files/:fileId/rename", h.RenameFile)
			fileGroup.POST("/files/:fileId/move", h.MoveFile)
			fileGroup.POST("/files/:fileId/copy", h.CopyFile)
			fileGroup.POST("/dirs", h.CreateDir)
		}

		// Share routes
		shareGroup := v3.Group("/share")
		shareGroup.Use(authMW.RequireAuth())
		{
			shareGroup.POST("", h.CreateShare)
			shareGroup.GET("/list", h.ListShares)
			shareGroup.DELETE("/:id", h.DeleteShare)
		}
	}

	// Public share route (no auth)
	r.GET("/api/v3/share/:key/download", h.DownloadByShareKey)

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	return r
}