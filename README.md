# 권순기.kr

권순기 공식 웹사이트.

## 스택
- Vite 7 + React 19 + TypeScript 5.9 (SPA)
- Tailwind CSS v4 (다크 베이스 + 마젠타 메인 컬러)
- motion (스크롤·페이지 모션)
- react-router-dom 7
- SUIT Variable / GounBatang (선택 명조)
- Supabase (`/fair` 게시판 · `/report` 제보)
- Cloudflare Pages (배포) + Turnstile (봇 방지) + GA4 (선택)

## 페이지
- `/`            — 홈
- `/fair`        — 사진 게시판 (익명 업로드 + 사후승인)
- `/fair/admin`  — 운영자 (Supabase Auth magic link)
- `/report`      — 비공개 제보 입력 폼
- `/terms`, `/privacy`

## 개발
```bash
nvm use
npm install
cp .env.example .env.local   # 키 채우기
npm run dev                  # http://localhost:5173
npm run build                # → dist/
npm run typecheck
```

## 배포
[DEPLOY.md](./DEPLOY.md) 참고. **GitHub + Cloudflare Pages**.

## 도메인
한국어 도메인 `권순기.kr` → punycode `xn--lr4b14b6tba.kr`. Cloudflare가 자동으로 SSL 발급.
