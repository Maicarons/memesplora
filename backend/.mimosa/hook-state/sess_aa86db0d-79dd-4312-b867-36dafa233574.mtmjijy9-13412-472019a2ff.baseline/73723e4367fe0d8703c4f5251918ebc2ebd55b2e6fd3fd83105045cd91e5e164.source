//go:build linux || darwin

package device

import (
	"context"
	"fmt"
	"math/bits"
	"sync"
	"syscall"
	"time"
	"unsafe"

	"memesplora/backend/pkg/logger"
)

type region struct {
	offset uint64
	size   uint64
	free   bool
	order  int
}

type RAMDevice struct {
	mu        sync.RWMutex
	info      DeviceInfo
	data      []byte
	base      uintptr
	totalSize uint64
	regions   []*region
	// Buddy system free lists
	freeLists [64][]*region
}

func NewRAMDevice(id string, size uint64) (*RAMDevice, error) {
	if size < 4096 {
		return nil, fmt.Errorf("%w: minimum size is 4KB", ErrInvalidSize)
	}

	data, err := syscall.Mmap(
		-1, 0, int(size),
		syscall.PROT_READ|syscall.PROT_WRITE,
		syscall.MAP_PRIVATE|syscall.MAP_ANONYMOUS,
	)
	if err != nil {
		return nil, fmt.Errorf("mmap failed: %w", err)
	}

	dev := &RAMDevice{
		info: DeviceInfo{
			ID:        id,
			Name:      "System Memory",
			Type:      DeviceRAM,
			TotalSize: size,
			FreeSize:  size,
			Healthy:   true,
		},
		data:      data,
		base:      uintptr(unsafe.Pointer(&data[0])),
		totalSize: size,
	}
	dev.initBuddySystem()

	logger.Info("RAM device initialized: id=%s size=%d", id, size)
	return dev, nil
}

func (d *RAMDevice) initBuddySystem() {
	order := bits.Len64(d.totalSize/4096) - 1
	region := &region{
		offset: 0,
		size:   d.totalSize,
		free:   true,
		order:  order,
	}
	d.freeLists[order] = append(d.freeLists[order], region)
	d.regions = append(d.regions, region)
}

func (d *RAMDevice) Info() DeviceInfo {
	d.mu.RLock()
	defer d.mu.RUnlock()
	return d.info
}

func (d *RAMDevice) Allocate(ctx context.Context, size uint64) (*Block, error) {
	d.mu.Lock()
	defer d.mu.Unlock()

	// Align to block size (4KB)
	alignedSize := (size + 4095) & ^uint64(4095)
	order := bits.Len64(alignedSize/4096) - 1

	// Find a free block of sufficient order
	var found *region
	var foundIdx int
	for o := order; o < len(d.freeLists); o++ {
		for i, r := range d.freeLists[o] {
			if r.free && r.size >= alignedSize {
				found = r
				foundIdx = i
				break
			}
		}
		if found != nil {
			break
		}
	}

	if found == nil {
		return nil, ErrDeviceFull
	}

	// Split if needed
	for found.size > alignedSize {
		halfSize := found.size / 2
		halfOrder := found.order - 1

		// Split into two buddies
		buddy := &region{
			offset: found.offset + halfSize,
			size:   halfSize,
			free:   true,
			order:  halfOrder,
		}
		found.size = halfSize
		found.order = halfOrder

		// Add buddy to free list
		d.freeLists[halfOrder] = append(d.freeLists[halfOrder], buddy)
		d.regions = append(d.regions, buddy)
	}

	// Remove from free list
	d.freeLists[found.order] = append(d.freeLists[found.order][:foundIdx], d.freeLists[found.order][foundIdx+1:]...)
	found.free = false

	block := &Block{
		ID:        fmt.Sprintf("block_%d_%d", found.offset, time.Now().UnixNano()),
		DeviceID:  d.info.ID,
		Offset:    found.offset,
		Size:      alignedSize,
		CreatedAt: time.Now(),
	}

	d.info.UsedSize += alignedSize
	d.info.FreeSize = d.totalSize - d.info.UsedSize

	logger.Debug("RAM allocated: offset=%d size=%d", found.offset, alignedSize)
	return block, nil
}

func (d *RAMDevice) Free(ctx context.Context, block *Block) error {
	d.mu.Lock()
	defer d.mu.Unlock()

	// Find the region
	var region *region
	for _, r := range d.regions {
		if r.offset == block.Offset && !r.free {
			region = r
			break
		}
	}
	if region == nil {
		return ErrBlockNotFound
	}

	region.free = true
	d.freeLists[region.order] = append(d.freeLists[region.order], region)

	// Try to merge buddies
	d.mergeBuddies(region)

	d.info.UsedSize -= block.Size
	d.info.FreeSize = d.totalSize - d.info.UsedSize

	logger.Debug("RAM freed: offset=%d size=%d", block.Offset, block.Size)
	return nil
}

func (d *RAMDevice) mergeBuddies(r *region) {
	for r.order < bits.Len64(d.totalSize/4096)-1 {
		buddyOffset := r.offset ^ (1 << (r.order + 12))
		var buddy *region
		for _, reg := range d.regions {
			if reg.offset == buddyOffset && reg.free && reg.order == r.order {
				buddy = reg
				break
			}
		}
		if buddy == nil {
			break
		}
		// Merge
		if buddy.offset < r.offset {
			r, buddy = buddy, r
		}
		r.size *= 2
		r.order++
		// Remove buddy from free list
		for i, reg := range d.freeLists[buddy.order] {
			if reg == buddy {
				d.freeLists[buddy.order] = append(d.freeLists[buddy.order][:i], d.freeLists[buddy.order][i+1:]...)
				break
			}
		}
		buddy.free = false
	}
}

func (d *RAMDevice) Read(ctx context.Context, block *Block, offset uint64, buf []byte) (int, error) {
	d.mu.RLock()
	defer d.mu.RUnlock()

	if offset+uint64(len(buf)) > block.Size {
		return 0, fmt.Errorf("read out of bounds")
	}

	start := block.Offset + offset
	copy(buf, d.data[start:start+uint64(len(buf))])
	return len(buf), nil
}

func (d *RAMDevice) Write(ctx context.Context, block *Block, offset uint64, buf []byte) (int, error) {
	d.mu.Lock()
	defer d.mu.Unlock()

	if offset+uint64(len(buf)) > block.Size {
		return 0, fmt.Errorf("write out of bounds")
	}

	start := block.Offset + offset
	copy(d.data[start:start+uint64(len(buf))], buf)
	return len(buf), nil
}

func (d *RAMDevice) Close() error {
	d.mu.Lock()
	defer d.mu.Unlock()
	return syscall.Munmap(d.data)
}