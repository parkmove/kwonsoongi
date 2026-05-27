-- =============================================================
-- migration_001_auto_publish
-- 사진 사후승인 제거 → 업로드 즉시 게시
-- Supabase Studio → SQL Editor 에 붙여넣고 Run 1회
-- =============================================================

-- 1) anon 이 모든 사진을 SELECT 할 수 있도록 (approved 필터 제거)
drop policy if exists "anon read approved" on public.photos;
create policy "anon read all"
  on public.photos for select to anon, authenticated
  using (true);

-- 2) anon 이 approved=true 로 INSERT 할 수 있도록 (제약 제거)
drop policy if exists "anon insert unapproved" on public.photos;
create policy "anon insert"
  on public.photos for insert to anon, authenticated
  with check (true);

-- 3) 기존에 쌓여 있던 미승인 사진들을 즉시 공개로 전환
update public.photos set approved = true where approved = false;
