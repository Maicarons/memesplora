package main

import (
	"context"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"memesplora/backend/internal/api"
	"memesplora/backend/internal/api/handler"
	"memesplora/backend/internal/api/middleware"
	"memesplora/backend/internal/config"
	"memesplora/backend/internal/device"
	"memesplora/backend/internal/fs"
	"memesplora/backend/internal/s3"
	"memesplora/backend/internal/service"
	"memesplora/backend/internal/webdav"
	"memesplora/backend/pkg/logger"
)

func main() {
	configPath := flag.String("config", "internal/config/config.yaml", "config file path")
	flag.Parse()

	cfg, err := config.LoadConfig(*configPath)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to load config: %v\n", err)
		os.Exit(1)
	}

	logger.SetLevel(cfg.Log.Level)
	logger.Info("Memesplora starting...")

	// Initialize device manager
	deviceMgr := device.NewManager()
	devices, err := deviceMgr.Detect()
	if err != nil {
		logger.Warn("Device detection failed: %v", err)
	}
	logger.Info("Detected %d storage devices", len(devices))

	// Initialize memory filesystem
	memFS := fs.NewMemFileSystem()
	if err := memFS.Init(context.Background(), 100*1024*1024, cfg.Storage.DefaultBlockSize); err != nil {
		logger.Error("Failed to initialize filesystem: %v", err)
		os.Exit(1)
	}
	memFS.Mount(context.Background())

	// Initialize services
	svc := service.NewService(memFS, deviceMgr)

	// Initialize REST API
	authMW := middleware.NewAuthMiddleware(cfg.Auth.JWTSecret)
	apiHandler := handler.NewHandler(svc, cfg)
	router := api.NewRouter(apiHandler, authMW, cfg)

	// Initialize S3 API
	s3Handler := s3.NewHandler(svc, cfg)

	// Initialize WebDAV
	webdavHandler := webdav.NewHandler(memFS, cfg)

	// Start HTTP server
	httpServer := &http.Server{
		Addr:              fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.HTTPPort),
		Handler:           router,
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       30 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	// Start S3 server
	s3Server := &http.Server{
		Addr:              fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.S3Port),
		Handler:           s3Handler,
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       30 * time.Second,
		WriteTimeout:      30 * time.Second,
	}

	// Start WebDAV server
	webdavServer := &http.Server{
		Addr:              fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.WebDAVPort),
		Handler:           webdavHandler,
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       30 * time.Second,
		WriteTimeout:      30 * time.Second,
	}

	// Start servers
	go func() {
		logger.Info("HTTP server listening on :%d", cfg.Server.HTTPPort)
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Error("HTTP server error: %v", err)
		}
	}()

	go func() {
		logger.Info("S3 API listening on :%d", cfg.Server.S3Port)
		if err := s3Server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Error("S3 server error: %v", err)
		}
	}()

	go func() {
		logger.Info("WebDAV listening on :%d", cfg.Server.WebDAVPort)
		if err := webdavServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Error("WebDAV server error: %v", err)
		}
	}()

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logger.Info("Shutting down servers...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	httpServer.Shutdown(ctx)
	s3Server.Shutdown(ctx)
	webdavServer.Shutdown(ctx)
	memFS.Unmount()

	logger.Info("Memesplora stopped")
}