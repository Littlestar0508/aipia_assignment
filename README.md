# 📰 AIPIA NEWS

Hacker News API를 활용하여 최신 뉴스를 조회하고,  
탭 기반 탐색과 무한 스크롤을 통해 사용자 경험을 개선한 웹 서비스입니다.

---

## 🔗 데모

👉 https://aipia-assignment.vercel.app/

---

## 🛠 개발 환경

- TypeScript + React
- Zustand (전역 상태 관리)
- Tailwind CSS (UI 스타일링)
- Vite (번들링 및 개발 환경)
- React Router (라우팅)

---

## 🚀 주요 기능

### 1. 탭 기반 뉴스 탐색

- Top / New / Best 탭 클릭 시 상태 변경
- Zustand를 활용한 전역 상태 관리

---

### 2. 동적 API 호출

- 탭 상태에 따라 API endpoint 분기
- Hacker News API 구조에 맞게  
  **ID 목록 → 상세 데이터 조회 방식으로 구성**

---

### 3. 상세 페이지 라우팅

- 뉴스 카드 클릭 시 `/news/:id`로 이동
- React Router 기반 동적 라우팅 구현

---

### 4. 외부 링크 이동

- 원문 링크 클릭 시 새 탭에서 열림 (`_blank`)
- `rel="noopener noreferrer"` 적용으로 보안 대응

---

### 5. 무한 스크롤

- Intersection Observer 기반 구현
- 페이지 단위(PAGE_SIZE)로 데이터 점진적 로딩

---

### 6. 스켈레톤 UI

- 로딩 중 skeleton UI 제공
- 사용자 경험 개선

---

### 7. 이미지 fallback 처리

- 외부 이미지 로드 실패 시 기본 이미지(`base.png`)로 대체

---

## 🧠 구현 포인트

### 🔹 비동기 요청 제어

- AbortController를 활용하여 이전 요청 취소
- 탭 변경 시 race condition 방지

---

### 🔹 중복 요청 방지

- `useRef` 기반 상태 관리로 중복 fetch 차단

---

### 🔹 에러 처리

- ErrorBoundary 적용
- 사용자에게 명확한 에러 메시지 및 재시도 UX 제공

---

### 🔹 데이터 정합성 유지

- 동일 ID 기준으로 중복 데이터 제거

---

## 🛠 트러블슈팅

### ❗ 문제

- 탭 전환 시 이전 API 요청 결과가 뒤늦게 반영되는 문제 발생

### ✅ 해결

- AbortController로 기존 요청 취소
- 상태 초기화를 통해 데이터 일관성 유지

---

## 📦 설치 및 실행

```bash
pnpm install
pnpm dev
```
