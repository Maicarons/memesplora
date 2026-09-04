package device

import (
	"sync"
)

type Manager struct {
	mu       sync.RWMutex
	devices  []Device
	detector Detector
}

func NewManager() *Manager {
	return &Manager{}
}

func (m *Manager) Detect() ([]Device, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	// Detect RAM
	ramDetector := NewRAMDetector()
	ramDevices, err := ramDetector.Detect()
	if err != nil {
		return nil, err
	}
	m.devices = append(m.devices, ramDevices...)

	// Detect GPU
	gpuDetector := NewGPUDetector()
	gpuDevices, err := gpuDetector.Detect()
	if err == nil {
		m.devices = append(m.devices, gpuDevices...)
	}

	return m.devices, nil
}

func (m *Manager) ListDevices() []Device {
	m.mu.RLock()
	defer m.mu.RUnlock()
	result := make([]Device, len(m.devices))
	copy(result, m.devices)
	return result
}

func (m *Manager) GetDevice(id string) Device {
	m.mu.RLock()
	defer m.mu.RUnlock()
	for _, d := range m.devices {
		if d.Info().ID == id {
			return d
		}
	}
	return nil
}