# 데이터베이스 설계

## 개요

Memesplora는 데이터베이스 관리를 위해 ent ORM을 사용하며, SQLite(개발) 및 PostgreSQL(프로덕션)을 지원합니다. 데이터베이스는 메타데이터만 저장하며, 실제 파일 내용은 메모리 내 파일시스템에 저장됩니다.

## 스키마

### 사용자
- id, username (고유), email (고유), password, nickname
- group_id, storage_used, max_storage, is_admin
- created_at, updated_at

### 공간
- id, name, description, total_size, used_size
- block_size, device_id, device_type, status
- owner_id (FK → User), created_at, updated_at

### 파일
- id, name, path, size, type, mime_type
- inode_id, parent_id, storage_key, is_shareable
- space_id (FK → Space), created_at, updated_at, deleted_at (소프트 삭제)

### 공유
- id, share_key (고유), download_limit, download_count
- expire_at, is_password, password
- owner_id (FK → User), space_id (FK → Space), file_id (FK → File)
- created_at

## 데이터베이스 선택

| 환경 | 데이터베이스 | 비고 |
|:-----------:|:--------:|-------|
| 개발 | SQLite | 설정 불필요, 파일 기반 |
| 단일 사용자 | SQLite | 단일 사용자 시나리오에 적합 |
| 프로덕션 | PostgreSQL | 동시성 지원, 다중 사용자 |
