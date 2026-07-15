# 📝 Project Plan: DevOps-Board (초기)

## 1. 프로젝트 개요 (Overview)
* **프로젝트명:** DevOps-Board (On-Premise GitLab 기반 CI/CD 3-Tier Web Service)
* **목적:** AWS EC2 인스턴스 내부에 **Private GitLab 서버와 Runner**를 직접 구축하고, 이를 통해 **S3 정적 호스팅(프론트엔드)** 및 **Docker Container(백엔드 & DB)** 환경을 완전 자동화(CI/CD)하는 DevOps 중심의 3-Tier 프로젝트.
* **개발 기간:** 2026.07.15 ~ 진행 중

---

## 2. 기술 스택 (Tech Stack)

| 구분 | 기술 스택 | 선택 이유 |
| :--- | :--- | :--- |
| **Frontend** | React (Vite, TypeScript), Tailwind CSS, Axios | 빠른 빌드 속도 및 컴파일 타임 에러 방지, 가벼운 S3 정적 호스팅 최적화 |
| **Backend** | NestJS (TypeScript), TypeORM | 구조화된 모듈 아키텍처 및 객체지향적 백엔드 설계 |
| **Database** | MySQL (8.0) | 프리티어 환경(RAM 1GB)에 적합한 멀티 스레드 기반의 가벼운 RDBMS |
| **DevOps & Infra** | AWS (S3, EC2), Docker & Docker Compose, GitLab Server, GitLab Runner | 인프라 독립성 확보(On-Premise GitLab), DooD 방식을 활용한 무중단 컨테이너 배포 파이프라인 구축 |

---

## 3. 시스템 아키텍처 (Architecture)
[아키텍처 다이어그램]
- Presentation Tier: AWS S3 (Vite React 정적 자원 호스팅)
- Application Tier (EC2 / Docker): NestJS API 서버 컨테이너 (Port: 80)
- Data Tier (EC2 / Docker): MySQL DB 컨테이너 (Port: 3306)
- DevOps Infrastructure (EC2 / Docker): GitLab Server (Port: 8080) 및 GitLab Runner (DooD 방식 연동)


## 4. 데이터베이스 엔티티 설계 (ERD)
MySQL 데이터베이스에 구성할 게시판 관련 핵심 데이터 모델 구조입니다.
[erd 다이어그램]
테이블 스키마 상세:
- id: 게시글 고유 식별자 (자동 증가 정수)
- title: 게시글 제목 (최대 100자)
- content: 게시글 본문 (길이 제한이 적은 TEXT 타입)
- author: 작성자 닉네임 또는 이름 (최대 50자)
- createdAt: 생성 일자 (레코드 삽입 시 자동 입력)
- updatedAt: 수정 일자 (레코드 갱신 시 자동 업데이트)

## 5. API 명세서 (API Specification)

프론트엔드(Vite React)와 백엔드(NestJS) 간의 데이터를 주고받기 위한 RESTful API 규격 정의입니다.

| 기능 | HTTP Method | Endpoint | Request Body (DTO) | Response (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| **글 작성** | `POST` | `/board` | `{ "title": "string", "content": "string", "author": "string" }` | `{ "id": 1, "title": "...", "content": "...", "author": "...", "createdAt": "..." }` |
| **글 목록 조회** | `GET` | `/board` | 없음 | `[{ "id": 1, "title": "...", "author": "...", "createdAt": "..." }, ...]` |
| **글 상세 조회** | `GET` | `/board/:id` | 없음 | `{ "id": 1, "title": "...", "content": "...", "author": "...", "createdAt": "...", "updatedAt": "..." }` |
| **글 수정** | `PATCH`| `/board/:id` | `{ "title": "string", "content": "string" }` | `{ "success": true }` |
| **글 삭제** | `DELETE`| `/board/:id` | 없음 | `{ "success": true }` |

---

## 6. 개발 및 배포 마일스톤 (Milestones)

### ⚙️ Phase 1: 개발 환경 초기 구성 & 인프라 설계
- [ ] 프론트엔드(Vite React) 및 백엔드(NestJS) 로컬 보일러플레이트 생성
- [ ] 모노레포 구성에 따른 Git 저장소 통합 및 `.gitignore` 설정 (Submodule 이슈 방지)
- [ ] 전체 프로젝트 설계 문서 작성 및 README.md 업데이트

### 🎨 Phase 2: 프론트엔드 UI 및 화면 라우팅 구현 (React)
- [ ] CSS 프레임워크(Tailwind CSS 또는 UI 라이브러리) 연동
- [ ] `react-router-dom`을 활용한 SPA 멀티 페이지 라우팅 구현
  - [ ] 목록 페이지 (`/`) 뼈대 및 가짜 데이터(Mock) 바인딩
  - [ ] 상세 페이지 (`/post/:id`) 레이아웃 구현
  - [ ] 글작성 페이지 (`/write`) 폼(Form) 구성

### 💾 Phase 3: 로컬 백엔드 CRUD 및 데이터베이스 연동 (NestJS & MySQL)
- [ ] Docker Compose를 활용하여 로컬 개발용 MySQL 띄우기
- [ ] NestJS CLI(`nest g resource board`)를 활용한 CRUD 모듈 생성
- [ ] TypeORM을 통한 NestJS - MySQL 엔티티 매핑 및 마이그레이션

### 🔌 Phase 4: 프론트-백엔드 데이터 통합 테스트 (API 연동)
- [ ] NestJS CORS 설정 완료 및 로컬 통합 연동 테스트
- [ ] `axios`를 사용한 리액트 페이지의 API 호출 연동
  - [ ] 게시글 작성 API 및 목록/상세 API 실제 데이터 매핑
  - [ ] 로컬 환경 전체 CRUD 시나리오 검증

### ☁️ Phase 5: AWS EC2 인프라 및 Private GitLab 구축 (Infra)
- [ ] AWS EC2 인스턴스 생성 및 보안 그룹 설정 (HTTP 80, GitLab 8080, SSH 등)
- [ ] EC2 내부 Docker 및 Docker Compose 설치 완료
- [ ] 최상위 `docker-compose.yml`을 통해 **GitLab Server** 및 **GitLab Runner** 컨테이너 구동
- [ ] GitLab 웹 콘솔에 접속하여 프로젝트 저장소 생성 및 로컬 코드 초기 Push

### 🤖 Phase 6: GitLab Runner CI/CD 배포 자동화 (DevOps)
- [ ] GitLab Runner를 GitLab 서버에 등록(Register) 및 Docker Executor 설정
- [ ] **Frontend Pipeline:**
  - [ ] `frontend/` 변경 시 GitLab Runner가 빌드 후 AWS S3로 자동 업로드(Sync)하는 파이프라인 구축
- [ ] **Backend & DB Pipeline (DooD 방식):**
  - [ ] `backend/` 변경 시 GitLab Runner가 호스트 Docker 엔진을 제어하여 `backend/Dockerfile` 빌드
  - [ ] 빌드된 NestJS 이미지와 MySQL 컨테이너를 실 서비스용 컨테이너로 EC2 내부에 자동 구동 및 롤링 업데이트