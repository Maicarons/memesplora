# 프론트엔드 아키텍처

## 개요

프론트엔드는 React 18 + TypeScript + Ant Design 5.x로 구축되었으며, REST API를 통해 백엔드와 통신하는 단일 페이지 애플리케이션(SPA)을 제공합니다.

## 기술 스택

| 기술 | 버전 | 목적 |
|-----------|:-------:|---------|
| React | 18.x | UI 프레임워크 |
| TypeScript | 5.x | 타입 안전성 |
| Vite | 5.x | 빌드 도구 |
| Ant Design | 5.x | UI 컴포넌트 라이브러리 |
| React Router | 6.x | 라우팅 |
| Zustand | 4.x | 상태 관리 |
| TanStack Query | 5.x | 서버 상태 관리 |
| Axios | 1.x | HTTP 클라이언트 |

## 라우트

```
/                → /files로 리디렉션
/login           → 로그인 페이지
/dashboard       → 대시보드
/files           → 파일 관리 (기본 공간)
/files/:spaceId  → 파일 관리 (특정 공간)
/devices         → 디바이스 관리
/shares          → 공유 관리
/admin           → 관리자 패널
/share/:key      → 공개 공유 페이지 (인증 불필요)
```

## 상태 관리

전역 상태를 위해 Zustand를 사용하며, 인증, 파일 상태 및 UI 기본 설정(사이드바, 다크 모드)을 위한 스토어를 제공합니다.

## API 레이어

Axios를 인터셉터와 함께 사용하여 자동 JWT 토큰 주입 및 401 리디렉션 처리를 수행합니다.
