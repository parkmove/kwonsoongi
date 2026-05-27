import { useCallback, useEffect, useState } from "react";
import {
  Check,
  Loader2,
  LogOut,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import Seo from "../components/Seo";
import {
  FAIR_BUCKET,
  FAIR_TABLE,
  SUPABASE_ENABLED,
  supabase,
  type FairPhoto,
} from "../lib/supabase";

type FilterKey = "pending" | "approved" | "all";

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setBootstrapping(false);
      return;
    }
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setBootstrapping(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_, s) =>
      setSession(s),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <>
      <Seo title="운영자" path="/fair/admin" noindex />
      <section className="mx-auto max-w-screen-2xl px-5 pt-20 pb-24 sm:px-6 sm:pt-28 lg:px-8">
        <p className="text-base font-bold text-magenta">운영자</p>
        <h1 className="mt-2 text-3xl leading-tight font-bold tracking-[-0.025em] text-ink-900 sm:text-5xl">
          사진 게시판 관리
        </h1>

        {!SUPABASE_ENABLED && (
          <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
            Supabase 환경변수가 설정되지 않았습니다.
          </div>
        )}

        {SUPABASE_ENABLED && bootstrapping && (
          <div className="mt-10 flex items-center gap-3 text-ink-500">
            <Loader2 className="h-5 w-5 animate-spin" /> 세션 확인 중…
          </div>
        )}

        {SUPABASE_ENABLED && !bootstrapping && !session && <SignIn />}

        {SUPABASE_ENABLED && session && (
          <AdminPanel
            email={session.user.email ?? "(이메일 없음)"}
            onSignOut={async () => {
              await supabase?.auth.signOut();
            }}
          />
        )}
      </section>
    </>
  );
}

/* -------------------------------------------------------------- */
/* 로그인 (magic link)                                            */
/* -------------------------------------------------------------- */

function SignIn() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    if (!supabase) return;
    if (!email.includes("@")) {
      setError("이메일을 정확히 입력해 주세요.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { error: e } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/fair/admin`,
        },
      });
      if (e) throw e;
      setSent(true);
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : "로그인 메일 전송에 실패했습니다.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div className="mt-10 max-w-md rounded-2xl border border-ink-100 bg-ink-50/40 p-6">
        <p className="text-lg font-bold text-ink-900">
          이메일을 보내드렸습니다.
        </p>
        <p className="mt-2 text-sm text-ink-500">
          받은 메일의 로그인 링크를 눌러 주십시오. 같은 브라우저에서 열어야
          합니다.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-md">
      <p className="text-base text-ink-500">
        운영자 이메일로 로그인 링크를 보내드립니다. 사전에 Supabase
        Authentication 에서 등록된 이메일만 받을 수 있습니다.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          autoComplete="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-2xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 focus:border-ink-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={send}
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-base font-bold text-white hover:bg-ink-700 disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "로그인 링크 받기"
          )}
        </button>
      </div>
      {error && (
        <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------- */
/* 관리 패널                                                       */
/* -------------------------------------------------------------- */

function AdminPanel({
  email,
  onSignOut,
}: {
  email: string;
  onSignOut: () => void | Promise<void>;
}) {
  const [photos, setPhotos] = useState<FairPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("pending");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    let q = supabase
      .from(FAIR_TABLE)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (filter === "pending") q = q.eq("approved", false);
    if (filter === "approved") q = q.eq("approved", true);
    const { data, error: e } = await q;
    if (e) setError(e.message);
    else setPhotos((data as FairPhoto[]) ?? []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const setApproved = async (p: FairPhoto, next: boolean) => {
    if (!supabase) return;
    setBusyId(p.id);
    setError(null);
    const { error: e } = await supabase
      .from(FAIR_TABLE)
      .update({ approved: next })
      .eq("id", p.id);
    if (e) setError(e.message);
    setBusyId(null);
    void refetch();
  };

  const remove = async (p: FairPhoto) => {
    if (!supabase) return;
    if (!confirm("이 사진을 삭제할까요? 되돌릴 수 없습니다.")) return;
    setBusyId(p.id);
    setError(null);
    const { error: dbErr } = await supabase
      .from(FAIR_TABLE)
      .delete()
      .eq("id", p.id);
    if (dbErr) {
      setError(dbErr.message);
      setBusyId(null);
      return;
    }
    await supabase.storage.from(FAIR_BUCKET).remove([p.storage_path]);
    setBusyId(null);
    void refetch();
  };

  const counts = {
    pending: photos.filter((p) => !p.approved).length,
    approved: photos.filter((p) => p.approved).length,
  };

  return (
    <div className="mt-10">
      {/* 헤더 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 pb-5">
        <p className="text-sm text-ink-500">
          로그인: <span className="font-bold text-ink-900">{email}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-bold text-ink-700 hover:bg-ink-50"
          >
            <RotateCcw className="h-4 w-4" /> 새로고침
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-bold text-white hover:bg-ink-700"
          >
            <LogOut className="h-4 w-4" /> 로그아웃
          </button>
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="mt-6 flex gap-2">
        {(
          [
            { k: "pending", label: `대기 ${counts.pending || ""}` },
            { k: "approved", label: `공개 ${counts.approved || ""}` },
            { k: "all", label: "전체" },
          ] as const
        ).map((t) => (
          <button
            key={t.k}
            type="button"
            onClick={() => setFilter(t.k)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              filter === t.k
                ? "bg-ink-900 text-white"
                : "bg-ink-50 text-ink-700 hover:bg-ink-100"
            }`}
          >
            {t.label.trim()}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading && (
        <div className="mt-10 flex items-center gap-3 text-ink-500">
          <Loader2 className="h-5 w-5 animate-spin" /> 불러오는 중…
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-ink-50/40 p-12 text-center text-ink-500">
          표시할 사진이 없습니다.
        </div>
      )}

      {photos.length > 0 && (
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {photos.map((p) => (
            <li
              key={p.id}
              className="overflow-hidden rounded-2xl border border-ink-100 bg-white"
            >
              <a
                href={p.public_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={p.public_url}
                  alt={p.author_name}
                  loading="lazy"
                  className="aspect-square h-auto w-full object-cover"
                />
              </a>
              <div className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-bold text-ink-900">
                    {p.author_name}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      p.approved
                        ? "bg-magenta/15 text-magenta"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {p.approved ? "공개" : "대기"}
                  </span>
                </div>
                {p.caption && (
                  <p className="line-clamp-3 text-sm text-ink-500">
                    {p.caption}
                  </p>
                )}
                <p className="text-xs text-ink-400">
                  {new Date(p.created_at).toLocaleString("ko-KR")}
                </p>
                <div className="flex gap-2 pt-2">
                  {p.approved ? (
                    <button
                      type="button"
                      onClick={() => setApproved(p, false)}
                      disabled={busyId === p.id}
                      className="flex-1 rounded-full border border-ink-200 px-3 py-1.5 text-xs font-bold text-ink-700 hover:bg-ink-50 disabled:opacity-50"
                    >
                      <X className="mr-1 inline h-3.5 w-3.5" />
                      비공개
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setApproved(p, true)}
                      disabled={busyId === p.id}
                      className="flex-1 rounded-full bg-magenta px-3 py-1.5 text-xs font-bold text-ink-900 hover:opacity-90 disabled:opacity-50"
                    >
                      <Check className="mr-1 inline h-3.5 w-3.5" />
                      공개
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(p)}
                    disabled={busyId === p.id}
                    className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-50"
                    aria-label="삭제"
                  >
                    {busyId === p.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
