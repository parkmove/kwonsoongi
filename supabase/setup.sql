-- =============================================================
-- 권순기.kr — Supabase 세팅 (한 번에 실행)
--   · /fair  : 사진 게시판 (사후승인 RLS)
--   · /report: 비공개 제보 입력 폼
--   · 운영자 (Supabase Auth authenticated) : 전체 관리 권한
-- Supabase Studio → SQL Editor 에 붙여넣고 Run 1회
-- =============================================================

-- ============================================================
-- 1) photos — 사진 게시판
-- ============================================================
create table if not exists public.photos (
  id            uuid        primary key default gen_random_uuid(),
  storage_path  text        not null,
  public_url    text        not null,
  caption       text        not null,
  author_name   text        not null,
  approved      boolean     not null default false,
  created_at    timestamptz not null default now()
);

create index if not exists photos_approved_created_idx
  on public.photos (approved, created_at desc);

alter table public.photos enable row level security;

drop policy if exists "anon read approved" on public.photos;
create policy "anon read approved"
  on public.photos for select to anon, authenticated
  using (approved = true);

drop policy if exists "anon insert unapproved" on public.photos;
create policy "anon insert unapproved"
  on public.photos for insert to anon, authenticated
  with check (approved = false);

drop policy if exists "auth select all" on public.photos;
create policy "auth select all"
  on public.photos for select to authenticated using (true);

drop policy if exists "auth update any" on public.photos;
create policy "auth update any"
  on public.photos for update to authenticated using (true) with check (true);

drop policy if exists "auth delete any" on public.photos;
create policy "auth delete any"
  on public.photos for delete to authenticated using (true);

-- ============================================================
-- 2) reports — 비공개 제보
-- ============================================================
create table if not exists public.reports (
  id              uuid        primary key default gen_random_uuid(),
  body            text        not null,
  contact         text,
  attachment_path text,
  attachment_url  text,
  handled         boolean     not null default false,
  created_at      timestamptz not null default now()
);

create index if not exists reports_created_idx
  on public.reports (handled, created_at desc);

alter table public.reports enable row level security;

drop policy if exists "anon insert report" on public.reports;
create policy "anon insert report"
  on public.reports for insert to anon, authenticated
  with check (handled = false);

drop policy if exists "auth read reports" on public.reports;
create policy "auth read reports"
  on public.reports for select to authenticated using (true);

drop policy if exists "auth update reports" on public.reports;
create policy "auth update reports"
  on public.reports for update to authenticated using (true) with check (true);

drop policy if exists "auth delete reports" on public.reports;
create policy "auth delete reports"
  on public.reports for delete to authenticated using (true);

-- ============================================================
-- 3) Storage 버킷 + 정책
-- ============================================================
insert into storage.buckets (id, name, public)
values ('fair-photos', 'fair-photos', true)
on conflict (id) do nothing;

-- reports 버킷은 public 으로 두지만, anon 에게는 select 정책을 안 주므로 사실상 비공개.
insert into storage.buckets (id, name, public)
values ('reports', 'reports', true)
on conflict (id) do nothing;

-- fair-photos 정책
drop policy if exists "anon upload fair" on storage.objects;
create policy "anon upload fair"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'fair-photos');

drop policy if exists "public read fair" on storage.objects;
create policy "public read fair"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'fair-photos');

drop policy if exists "auth delete fair" on storage.objects;
create policy "auth delete fair"
  on storage.objects for delete to authenticated
  using (bucket_id = 'fair-photos');

-- reports 정책
drop policy if exists "anon upload report" on storage.objects;
create policy "anon upload report"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'reports');

drop policy if exists "auth read report" on storage.objects;
create policy "auth read report"
  on storage.objects for select to authenticated
  using (bucket_id = 'reports');

drop policy if exists "auth delete report" on storage.objects;
create policy "auth delete report"
  on storage.objects for delete to authenticated
  using (bucket_id = 'reports');

-- =============================================================
-- 운영 가이드
-- =============================================================
-- ▸ 신규 사진 업로드는 approved=false 로 들어옵니다 → Studio 또는 /fair/admin 에서 승인
-- ▸ 신규 제보는 handled=false 로 들어옵니다 → Studio Table Editor 에서 확인 후 토글
-- ▸ Auth → Settings → "Allow new users to sign up" OFF
-- ▸ Authentication → Users 에서 운영자 이메일을 미리 초대해 두십시오
