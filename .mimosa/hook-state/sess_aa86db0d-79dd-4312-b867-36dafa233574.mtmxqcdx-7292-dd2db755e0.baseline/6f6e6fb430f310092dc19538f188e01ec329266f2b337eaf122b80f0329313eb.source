package device

import (
	"context"
	"fmt"
	"sync"
	"time"

	"memesplora/backend/pkg/logger"
)

// cgo VRAM stubs for platforms without CUDA
// Real CUDA implementation would use cgo with cuda_runtime.h

type VRAMDevice struct {
	mu        sync.RWMutex
	info      DeviceInfo
	deviceIdx int
	blocks    map[string]*cudaBlock
}

type cudaBlock struct {
	offset uint64
	size   uint64
	ptr    uintptr
}

func NewVRAMDevice(id string, deviceIdx int, totalSize uint64, model string) *VRAMDevice {
	return &VRAMDevice{
		info: DeviceInfo{
			ID:        id,
			Name:      fmt.Sprintf("GPU %d", deviceIdx),
			Type:      DeviceVRAM,
			TotalSize: totalSize,
			FreeSize:  totalSize,
			Healthy:   true,
			Model:     model,
		},
		deviceIdx: deviceIdx,
		blocks:    make(map[string]*cudaBlock),
	}
}

func (d *VRAMDevice) Info() DeviceInfo {
	d.mu.RLock()
	defer d.mu.RUnlock()
	return d.info
}

func (d *VRAMDevice) Allocate(ctx context.Context, size uint64) (*Block, error) {
	d.mu.Lock()
	defer d.mu.Unlock()

	if size > d.info.FreeSize {
		return nil, ErrDeviceFull
	}

	// Stub: in production, use cudaMalloc via cgo
	block := &Block{
		ID:        fmt.Sprintf("vram_block_%d_%d", time.Now().UnixNano(), d.deviceIdx),
		DeviceID:  d.info.ID,
		Offset:    0,
		Size:      size,
		CreatedAt: time.Now(),
	}

	d.blocks[block.ID] = &cudaBlock{
		offset: 0,
		size:   size,
		ptr:    0,
	}

	d.info.UsedSize += size
	d.info.FreeSize = d.info.TotalSize - d.info.UsedSize

	logger.Info("VRAM allocated: device=%d size=%d", d.deviceIdx, size)
	return block, nil
}

func (d *VRAMDevice) Free(ctx context.Context, block *Block) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	if _, ok := d.blocks[block.ID]; !ok {
		return ErrBlockNotFound
	}

	delete(d.blocks, block.ID)

	d.info.UsedSize -= block.Size
	d.info.FreeSize = d.info.TotalSize - d.info.UsedSize

	logger.Info("VRAM freed: device=%d size=%d", d.deviceIdx, block.Size)
	return nil
}

func (d *VRAMDevice) Read(ctx context.Context, block *Block, offset uint64, buf []byte) (int, error) {
	d.mu.RLock()
	defer d.mu.RUnlock()

	if _, ok := d.blocks[block.ID]; !ok {
		return 0, ErrBlockNotFound
	}

	// Stub: in production, use cudaMemcpyDtoH via cgo
	logger.Debug("VRAM read stub: device=%d offset=%d size=%d", d.deviceIdx, offset, len(buf))
	return len(buf), nil
}

func (d *VRAMDevice) Write(ctx context.Context, block *Block, offset uint64, buf []byte) (int, error) {
	d.mu.RLock()
	defer d.mu.RUnlock()

	if _, ok := d.blocks[block.ID]; !ok {
		return 0, ErrBlockNotFound
	}

	// Stub: in production, use cudaMemcpyHtoD via cgo
	logger.Debug("VRAM write stub: device=%d offset=%d size=%d", d.deviceIdx, offset, len(buf))
	return len(buf), nil
}

func (d *VRAMDevice) Close() error {
	d.mu.Lock()
	defer d.mu.Unlock()

	// Stub: in production, free all cudaMalloc'd memory
	d.blocks = make(map[string]*cudaBlock)
	return nil
}