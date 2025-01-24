## Dowit-log

### 1주차 - 2024.12.17 (v0.1)

**프로젝트 초기 설정**

-   **Next.js**: 15.1.0 버전
-   **TypeScript**: 타입 안전한 개발을 위한 설정
-   **Tailwind CSS**: 유틸리티 우선의 CSS 스타일링
-   **ESLint & Prettier**: 코드 린팅 및 포맷팅을 위한 설정
    <br/>

```bash
dowit-log/
├── app/                    # 애플리케이션의 페이지 및 컴포넌트
├── components/             # 재사용 가능한 컴포넌트
├── public/                 # 정적 파일
├── .gitignore              # Git ignore 설정
├── eslint.config           # ESLint 설정
├── next-env.d.ts           # Next.js TypeScript 환경 설정
├── next.config.js          # Next.js 설정
├── package-lock.json       # npm 의존성 잠금 파일
├── package.json            # 프로젝트 의존성
├── postcss.config.js       # PostCSS 설정
├── README.md               # 프로젝트 문서
├── tailwind.config.js      # Tailwind CSS 설정
└── tsconfig.json           # TypeScript 설정
```

## refactor: 컴포넌트 구조 통합 및 디렉토리 정리

```
- app/
  - (페이지 관련 파일들 위치)

- components/
  - layout/         # 레이아웃 및 주요 구조 관련
    - nav/
      - Desktop.tsx
      - Mobile.tsx
    - Navbar.tsx     # Nav 관련 조합 및 공통 처리
    - Footer.tsx
    - Header.tsx
    - BackgroundCanvas.tsx
    - HeaderCanvas.tsx

  - common/          # 공통적으로 재사용 가능한 컴포넌트
    - Tag.tsx
    - PostDetail.tsx

  - ui/              # 스타일링 관련 공통 UI 컴포넌트
    - Button.tsx
    - Dropdown.tsx

  - pages/           # 특정 페이지에서만 사용되는 컴포넌트
    - home/
      - Intro.tsx    # 홈 페이지 인트로
    - about/
    - blog/
      - BlogList.tsx
      - BlogPost.tsx
    - til/
```

-   공통 컴포넌트는 `common/` 디렉토리 통합
-   레이아웃 관련 컴포넌트를 `layout/` 디렉토리로 통합
-   UI 컴포넌트를 `ui/`로 분리하여 역할 명확화
-   페이지별 컴포넌트는 `pages/` 하위에 정리
