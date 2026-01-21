# 블로그 풀스택 애플리케이션 (Blog Fullstack Application)

이 프로젝트는 React 프론트엔드와 Node.js(Express) 백엔드로 구성된 풀스택 블로그 애플리케이션입니다.

## 프로젝트 구조

- **[api-server](./api-server)**: Node.js, Express, PostgreSQL을 사용한 RESTful API 서버
- **[blog-app](./blog-app)**: React를 사용한 싱글 페이지 애플리케이션 (SPA)

## 주요 기능

- **사용자 인증**: JWT 기반 회원가입 및 로그인
- **게시글 관리**: 게시글 작성, 조회, 수정, 삭제 (CRUD)
- **메모 관리**: 단순 메모 저장 기능 (API 서버 전용)
- **보호된 라우트**: 로그인한 사용자만 게시글 작성 및 수정 가능

## 기술 스택

### Backend (api-server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT, bcrypt

### Frontend (blog-app)
- **Library**: React (v19)
- **Routing**: React Router (v7)
- **State Management**: Context API
- **HTTP Client**: Axios

## 시작하기

### 1. 백엔드 설정 (api-server)

1. `api-server` 디렉토리로 이동합니다.
2. `.env` 파일을 생성하고 데이터베이스 및 JWT 설정을 입력합니다.
3. 의존성을 설치하고 서버를 실행합니다.

```bash
cd api-server
npm install
npm run dev # http://localhost:3001
```

### 2. 프론트엔드 설정 (blog-app)

1. `blog-app` 디렉토리로 이동합니다.
2. 의존성을 설치하고 앱을 실행합니다.

```bash
cd blog-app
npm install
npm start # http://localhost:3000
```

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
