import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import Seo from "../components/Seo";
import {
  SUPABASE_ENABLED,
  TURNSTILE_ENABLED,
  TURNSTILE_SITE_KEY,
  supabase,
} from "../lib/supabase";

const MAX_BODY = 4000;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const REPORT_BUCKET = "reports";
const REPORT_TABLE = "reports";

export default function ReportPage() {
  const [body, setBody] = useState("");
  const [contact, setContact] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File | null) => {
    setError(null);
    if (!f) {
      setFile(null);
      return;
    }
    if (f.size > MAX_FILE_BYTES) {
      setError("첨부 파일은 최대 10MB까지 가능합니다.");
      return;
    }
    setFile(f);
  };

  const submit = async () => {
    if (!supabase) return;
    if (!body.trim()) {
      setError("제보 내용을 적어 주세요.");
      return;
    }
    if (TURNSTILE_ENABLED && !turnstileToken) {
      setError("아래 인간 확인을 마쳐 주세요.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      let attachmentPath: string | null = null;
      let attachmentUrl: string | null = null;

      if (file) {
        const safe = file.name.replace(/[^\w.\-]+/g, "_");
        const path = `${new Date().getFullYear()}/${crypto.randomUUID()}_${safe}`;
        const { error: upErr } = await supabase.storage
          .from(REPORT_BUCKET)
          .upload(path, file, {
            contentType: file.type || "application/octet-stream",
            upsert: false,
          });
        if (upErr) throw upErr;
        attachmentPath = path;
        const { data } = supabase.storage.from(REPORT_BUCKET).getPublicUrl(path);
        attachmentUrl = data.publicUrl;
      }

      const { error: insErr } = await supabase.from(REPORT_TABLE).insert({
        body: body.trim(),
        contact: contact.trim() || null,
        attachment_path: attachmentPath,
        attachment_url: attachmentUrl,
      });
      if (insErr) throw insErr;

      setDone(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "전송에 실패했습니다.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Seo
        title="제보하기"
        description="권순기 — 비공개 제보 입력 폼."
        path="/report"
      />

      <section className="bg-ink-900">
        <div className="mx-auto max-w-screen-md px-5 pt-24 pb-32 sm:px-6 sm:pt-32 lg:px-8">
          <p className="text-base font-bold text-magenta">제보하기</p>
          <h1 className="mt-3 text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-ink-50 sm:text-6xl">
            비공개로
            <br />
            전달해 주세요.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-200">
            제보 내용은 운영자에게만 전달됩니다. 신원이 외부에 공개되지
            않습니다.
          </p>

          {!SUPABASE_ENABLED && (
            <div className="mt-10 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6 text-base text-amber-200">
              제보 폼은 곧 열립니다. (관리자: Supabase 환경변수 미설정)
            </div>
          )}

          {done ? (
            <div className="mt-12 rounded-3xl border border-magenta/30 bg-magenta/10 p-8">
              <p className="text-2xl font-bold text-ink-50">
                제보를 받았습니다.
              </p>
              <p className="mt-3 text-base text-ink-200">
                보내주신 내용을 꼼꼼히 살피겠습니다. 감사합니다.
              </p>
            </div>
          ) : (
            <div className="mt-12 space-y-6">
              {/* 본문 */}
              <label className="block">
                <span className="text-sm font-bold text-ink-100">
                  제보 내용 <span className="text-magenta">*</span>
                </span>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value.slice(0, MAX_BODY))}
                  rows={10}
                  placeholder="알리고 싶은 내용을 자유롭게 적어 주세요."
                  className="mt-2 w-full resize-y rounded-2xl border border-ink-700 bg-ink-800 px-4 py-3 text-base text-ink-50 placeholder-ink-500 focus:border-magenta focus:outline-none"
                />
                <span className="mt-1 block text-right text-xs text-ink-500">
                  {body.length.toLocaleString()} / {MAX_BODY.toLocaleString()}
                </span>
              </label>

              {/* 연락처 (선택) */}
              <label className="block">
                <span className="text-sm font-bold text-ink-100">
                  연락처 <span className="text-ink-400">(선택)</span>
                </span>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value.slice(0, 120))}
                  placeholder="회신이 필요하면 이메일 또는 전화번호를 적어 주세요."
                  className="mt-2 w-full rounded-2xl border border-ink-700 bg-ink-800 px-4 py-3 text-base text-ink-50 placeholder-ink-500 focus:border-magenta focus:outline-none"
                />
              </label>

              {/* 파일 첨부 (선택) */}
              <label className="block">
                <span className="text-sm font-bold text-ink-100">
                  파일 첨부 <span className="text-ink-400">(선택, 최대 10MB)</span>
                </span>
                <input
                  type="file"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  className="mt-2 block w-full text-sm text-ink-200 file:mr-4 file:rounded-full file:border-0 file:bg-ink-700 file:px-5 file:py-2.5 file:text-sm file:font-bold file:text-ink-50 hover:file:bg-ink-600"
                />
                {file && (
                  <p className="mt-2 text-xs text-ink-400">
                    {file.name} · {(file.size / 1024).toFixed(0)} KB
                  </p>
                )}
              </label>

              {/* Turnstile */}
              {TURNSTILE_ENABLED ? (
                <div>
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    options={{ theme: "dark", size: "flexible" }}
                    onSuccess={setTurnstileToken}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setTurnstileToken(null)}
                  />
                </div>
              ) : (
                <p className="rounded-xl bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
                  관리자: 인간 확인이 비활성 상태입니다.
                </p>
              )}

              {error && (
                <p className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-300">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={submit}
                disabled={
                  !body.trim() ||
                  (TURNSTILE_ENABLED && !turnstileToken) ||
                  !SUPABASE_ENABLED ||
                  busy
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-magenta px-6 py-4 text-base font-bold text-ink-900 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {busy ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
                제보 보내기
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
