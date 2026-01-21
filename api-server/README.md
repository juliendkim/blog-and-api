# Memo API Server

Node.js(Express)와 PostgreSQL을 사용한 메모 및 게시글 관리 API 서버입니다.

## 주요 기능

- **사용자 인증**: JWT를 사용한 회원가입 및 로그인 기능
- **메모 관리**: 단순 메모 CRUD 기능
- **게시글 관리**: 사용자 계정과 연동된 게시글 CRUD 기능 (인증 필요)

## 기술 스택

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token), bcrypt
- **Database Driver**: pg (node-postgres)

## 시작하기

### 환경 변수 설정

루트 디렉토리에 `.env` 파일을 생성하고 다음 설정을 입력합니다:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret_key
```

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 모드로 실행 (nodemon)
npm run dev

# 운영 모드로 실행
npm start
```

## API 엔드포인트

### 1. 사용자 인증 (`/auth`)
- `POST /auth/register`: 회원가입 (email, password, username)
- `POST /auth/login`: 로그인 (email, password) -> JWT 토큰 반환

### 2. 메모 관리 (`/memos`)
- `GET /memos`: 모든 메모 목록 조회
- `GET /memos/:id`: 특정 메모 상세 조회
- `POST /memos`: 새로운 메모 생성 (title, content)
- `PUT /memos/:id`: 메모 수정
- `DELETE /memos/:id`: 메모 삭제

### 3. 게시글 관리 (`/posts`)
- `GET /posts`: 모든 게시글 목록 조회 (작성자 정보 포함)
- `GET /posts/:id`: 특정 게시글 상세 조회
- `POST /posts`: 새로운 게시글 생성 (인증 필요)
- `PUT /posts/:id`: 게시글 수정 (본인 작성 글만 가능, 인증 필요)
- `DELETE /posts/:id`: 게시글 삭제 (본인 작성 글만 가능, 인증 필요)

## 데이터베이스 구조

### users 테이블
- `id` (PK)
- `email` (Unique)
- `password`
- `username`

### memos 테이블
- `id` (PK)
- `title`
- `content`
- `created_at`

### posts 테이블
- `id` (PK)
- `title`
- `content`
- `user_id` (FK -> users.id)
- `created_at`
