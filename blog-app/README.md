# 블로그 앱 (Blog App)

React와 RESTful API 백엔드로 구축된 모던 풀스택 블로그 애플리케이션입니다.

## 주요 기능

- **사용자 인증**: 안전한 회원가입 및 로그인 시스템을 제공합니다.
- **게시글 작성**: 로그인한 사용자는 새로운 블로그 게시글을 작성하고 등록할 수 있습니다.
- **게시글 조회**: 홈페이지에서 모든 블로그 게시글 목록을 확인할 수 있습니다.
- **수정 및 삭제**: 사용자는 자신이 작성한 게시글을 직접 수정하거나 삭제할 수 있습니다.
- **반응형 디자인**: CSS를 활용하여 깔끔하고 모바일 친화적인 UI를 제공합니다.

## 기술 스택

- **프론트엔드**: React (v19), React Router (v7), Axios
- **상태 관리**: React Context API (AuthContext)
- **스타일링**: Custom CSS
- **테스팅**: React Testing Library

## 시작하기

### 사전 요구 사항

- Node.js (v14 이상)
- npm 또는 yarn

### 설치 방법

1. 저장소를 클론(Clone)합니다:
   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. 의존성 패키지를 설치합니다:
   ```bash
   npm install
   ```

3. 개발 서버를 실행합니다:
   ```bash
   npm start
   ```

   애플리케이션이 `http://localhost:3000`에서 실행됩니다.

## 프로젝트 구조

```
src/
├── components/      # 재사용 가능한 UI 컴포넌트 (Navbar, ProtectedRoute)
├── context/         # 전역 상태 관리를 위한 React Context (AuthContext)
├── pages/           # 페이지 컴포넌트 (Home, Login, Register, CreatePost, EditPost)
├── utils/           # 유틸리티 함수 (API 설정 등)
├── App.js           # 라우팅이 포함된 메인 애플리케이션 컴포넌트
└── index.js         # 진입점 (Entry point)
```

## API 연동

이 애플리케이션은 `http://localhost:3001`에서 실행되는 백엔드 API를 예상하며, 다음과 같은 엔드포인트를 사용합니다:

- `POST /auth/register` - 회원가입
- `POST /auth/login` - 로그인
- `GET /posts` - 전체 게시글 조회
- `POST /posts` - 새 게시글 작성
- `GET /posts/:id` - 특정 게시글 조회
- `PUT /posts/:id` - 게시글 수정
- `DELETE /posts/:id` - 게시글 삭제

## 기여하기

1. 이 저장소를 포크(Fork)합니다.
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`).
3. 변경 사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`).
5. 풀 리퀘스트(Pull Request)를 보냅니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.