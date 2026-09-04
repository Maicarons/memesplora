.PHONY: build run test clean dev docs

# Build backend
build:
	cd backend && go build -o memesplora ./cmd/server

# Run backend
run:
	cd backend && go run ./cmd/server

# Run tests
test:
	cd backend && go test -v ./...

# Clean build artifacts
clean:
	rm -f backend/memesplora
	rm -rf frontend/dist
	rm -rf docs/.vitepress/dist

# Run frontend dev server
dev-frontend:
	cd frontend && npm run dev

# Run docs dev server
docs:
	cd docs && npm run dev

# Run all services
dev:
	@echo "Starting backend..."
	cd backend && go run ./cmd/server &
	@echo "Starting frontend..."
	cd frontend && npm run dev &
	@echo "Starting docs..."
	cd docs && npm run dev &
	wait

# Build all
all: build
	cd frontend && npm run build
	cd docs && npm run build

# Docker
docker:
	docker build -t memesplora .