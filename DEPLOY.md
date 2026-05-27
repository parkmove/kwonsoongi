# 배포 가이드 — Cloudflare Pages + GitHub

선거 사이트 운용은 **GitHub repo + Cloudflare Pages 무료 호스팅** 조합으로 갑니다.
서버·DB·게시판이 없으므로 운영 부담이 가장 낮고, push 한 번에 자동 배포됩니다.

---

## 1. 사전 준비

| 항목 | 비고 |
|---|---|
| GitHub 계정 | 캠프 또는 사용자 개인 |
| Cloudflare 계정 | 무료 가입, 캠프 도메인 보유자 명의 권장 |
| 도메인 `songssam.one` | 현재 Cloudflare에서 사용 중인지 확인. 기존 NS 그대로 사용 가능 |

---

## 2. GitHub 레포 생성

캠프 GitHub 조직 또는 사용자 계정에 **private** 또는 **public** 레포로 생성.

- 권장 이름: `songssamone-2.0`
- 가시성: public 권장 (Cloudflare Pages 무료 연동은 public/private 모두 가능)
- README 자동 생성 X (이미 로컬 README.md 있음)

### gh CLI로 한 번에 (옵션)

```bash
gh repo create songssamone-2.0 --public --source=. --remote=origin --push
```

### 또는 수동

```bash
git remote add origin https://github.com/<owner>/songssamone-2.0.git
git branch -M main
git push -u origin main
```

---

## 3. Cloudflare Pages 연결

1. Cloudflare 대시보드 → **Workers & Pages → Create → Pages → Connect to Git**
2. GitHub 계정 인증 후 `songssamone-2.0` 레포 선택
3. **Build 설정**:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: (비워둠)
   - Node version: 환경 변수 `NODE_VERSION=20` 추가 (또는 .nvmrc 자동 인식)
4. **Save and Deploy**

빌드 약 1~2분. 첫 배포 후 `https://<project>.pages.dev` 임시 도메인 발급.

---

## 4. 커스텀 도메인 연결

### A. `songssam.one`이 이미 Cloudflare에 있으면

1. Pages 프로젝트 → **Custom domains → Set up a custom domain**
2. `songssam.one` 입력 → 자동으로 DNS 레코드 생성
3. 1~5분 후 인증서(자동) 발급 완료

### B. `songssam.one`이 다른 등록기관에 있으면

1. 등록기관에서 NS 레코드를 Cloudflare 네임서버로 변경하거나
2. Cloudflare Pages에서 제공하는 CNAME을 등록기관 DNS에 추가

권장: A 방식. NS만 옮기면 이후 모든 DNS/SSL 자동.

### `www.songssam.one`도 같이?

같은 절차로 `www.songssam.one` 추가 후 Pages → **Domains → 301 Redirect to root**로 설정.

---

## 5. 임시 도메인으로 먼저 확인

본 도메인 컷오버 전, Pages 제공 `*.pages.dev` URL로 확인하는 단계를 권장.

`v2.songssam.one` 같은 서브로 임시 운영도 가능:
1. Cloudflare DNS → CNAME `v2` → `<project>.pages.dev`
2. Pages 프로젝트 → Custom domains에 `v2.songssam.one` 추가

---

## 6. 자동 배포 동작

| Git 동작 | Cloudflare 동작 |
|---|---|
| `main` push | 자동 빌드 → 프로덕션 배포 |
| 다른 브랜치 push | 자동 프리뷰 배포 (`<branch>.<project>.pages.dev`) |
| PR 생성 | 자동 프리뷰 + PR 코멘트에 URL 첨부 |

브랜치 워크플로:
- `main` = 즉시 라이브
- `staging` 같은 브랜치를 두면 프리뷰로 검수 후 main에 머지하는 흐름도 가능

---

## 7. 환경 변수

`/fair` 사진 게시판이 Supabase를 사용합니다. 다른 페이지는 환경 변수 없이 동작.

| 키 | 용도 | 어디서 얻나 |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL | Supabase Studio → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | 익명 공개 키 (RLS로 권한 제한) | 동일 |

설정 위치:
- **로컬**: 프로젝트 루트에 `.env.local` 생성 후 두 키 입력 → `npm run dev` 재시작
- **Cloudflare Pages**: Settings → Environment variables → Production·Preview 둘 다 추가 → Redeploy

> `.env.local`은 `.gitignore`에 자동 포함되므로 키가 git에 올라가지 않습니다.
> ANON KEY는 공개 키지만 RLS 정책이 권한을 제한하니 안전합니다. (service_role 키는 절대 클라이언트에 두지 마십시오.)

### Supabase 프로젝트 세팅 (한 번만)

1. https://supabase.com → New project (지역: Tokyo / Singapore 권장, 비밀번호 보관)
2. 좌측 **SQL Editor** → 새 쿼리 → 레포의 `supabase/setup.sql` 내용 복사·붙여넣기 → Run
   - `photos` 테이블 + RLS 정책 + `fair-photos` Storage 버킷 + Storage 정책이 한 번에 생성됩니다.
3. **Settings → API** 에서 `URL`, `anon public` 키 복사 → 위 환경변수에 등록

### 운영 (사후승인)

- 새 업로드는 `approved = false` 로 들어옵니다.
- Studio → **Table Editor → photos** 에서 행을 열어 `approved` 토글 → true 로 바꾸면 즉시 갤러리 노출.
- 부적절 사진은 행 삭제 또는 `approved=false` 유지. 파일은 **Storage → fair-photos** 버킷에서도 직접 삭제 가능.

---

## 8. 빌드 결과 (참고)

```
dist/index.html                  1.9 kB  gzip 0.8 kB
dist/assets/index-*.css         45.2 kB  gzip 8.2 kB
dist/assets/index-*.js         458.9 kB  gzip 145.3 kB
```

총 전송 약 **155KB gzip**. 초기 로딩 1~2초 이내 목표.

---

## 9. 운영 체크리스트

배포 직후 다음을 확인:

- [ ] `https://songssam.one/` 200, 로고·인물 사진 정상 표시
- [ ] `/song`, `/manifesto`, `/terms`, `/privacy` 모두 200
- [ ] `/proposal`, `/with` 클릭 시 Google Forms 새 탭으로 이동
- [ ] 모바일에서 햄버거 메뉴 동작
- [ ] 카카오톡에 링크 공유 시 OG 미리보기 표시
- [ ] PWA: iOS Safari "홈화면에 추가" 시 아이콘·이름 정상
- [ ] Google 검색 콘솔에 `sitemap.xml` 등록 (선택)

---

## 10. 롤백

문제가 생기면 Cloudflare Pages → **Deployments → 이전 배포 → Rollback** 한 번 클릭으로 즉시 복귀.

git에서는:
```bash
git revert <commit>
git push origin main
```
