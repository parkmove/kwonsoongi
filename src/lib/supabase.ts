import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Supabase 클라이언트. 환경변수가 없으면 null 반환 — UI에서 fallback 안내.
 * /fair 페이지 외에는 사용 안 함.
 */
export const supabase: SupabaseClient | null =
  url && anon ? createClient(url, anon) : null;

export const SUPABASE_ENABLED = supabase !== null;

export const FAIR_BUCKET = "fair-photos";
export const FAIR_TABLE = "photos";

export type FairPhoto = {
  id: string;
  storage_path: string;
  public_url: string;
  caption: string;
  author_name: string;
  approved: boolean;
  created_at: string;
};

export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "";
export const TURNSTILE_ENABLED = TURNSTILE_SITE_KEY.length > 0;
