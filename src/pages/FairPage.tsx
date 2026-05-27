import { useCallback, useEffect, useRef, useState } from "react";
import {
  Download,
  ImagePlus,
  Loader2,
  RotateCcw,
  Upload,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import Cropper, { type Area } from "react-easy-crop";
import { Turnstile } from "@marsidev/react-turnstile";
import Seo from "../components/Seo";
import {
  FAIR_BUCKET,
  FAIR_TABLE,
  SUPABASE_ENABLED,
  TURNSTILE_ENABLED,
  TURNSTILE_SITE_KEY,
  supabase,
  type FairPhoto,
} from "../lib/supabase";

const MAX_INPUT_BYTES = 12 * 1024 * 1024; // 원본 12MB
const OUTPUT_EDGE = 1600; // 정방형 출력 한 변(px)
const OUTPUT_QUALITY = 0.85;

/** 사용자의 크롭 영역(원본 좌표)을 받아 OUTPUT_EDGE × OUTPUT_EDGE webp로 만든다. */
async function makeSquareWebp(
  src: string,
  crop: Area,
): Promise<Blob> {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_EDGE;
  canvas.height = OUTPUT_EDGE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas context 없음");
  ctx.drawImage(
    img,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    OUTPUT_EDGE,
    OUTPUT_EDGE,
  );
  const supportsWebp = canvas
    .toDataURL("image/webp")
    .startsWith("data:image/webp");
  const mime = supportsWebp ? "image/webp" : "image/jpeg";
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("encode 실패"))),
      mime,
      OUTPUT_QUALITY,
    );
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("이미지 로드 실패"));
    img.src = src;
  });
}

export default function FairPage() {
  const [photos, setPhotos] = useState<FairPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const refetch = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from(FAIR_TABLE)
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(120);
    if (data) setPhotos(data as FairPhoto[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return (
    <>
      <Seo
        title="사진 게시판"
        description="함께한 순간을 나누는 공간."
        path="/fair"
      />

      {/* Hero */}
      <section className="bg-ink-900 text-white">
        <div className="mx-auto max-w-screen-xl px-5 pt-24 pb-12 sm:px-6 sm:pt-32 sm:pb-16 lg:px-8">
          <p className="text-base font-bold text-magenta">
            사진 게시판
          </p>
          <h1 className="mt-3 text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-6xl">
            함께한 순간을 나누세요.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            현장의 한 장면을 사진과 한 줄 제목으로 남겨 주세요. 검토 후
            게시판에 공개됩니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              disabled={!SUPABASE_ENABLED}
              className="inline-flex items-center gap-2 rounded-full bg-magenta px-7 py-4 text-base font-bold tracking-[-0.01em] text-ink-900 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ImagePlus className="h-5 w-5" />
              사진 올리기
            </button>
            {/* 피켓 다운로드 — URL 사용자가 채울 자리 */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-4 text-base font-bold tracking-[-0.01em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink-900"
            >
              <Download className="h-5 w-5" />
              피켓 다운로드
            </a>
          </div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
          {!SUPABASE_ENABLED && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-base text-amber-900">
              사진 게시판은 곧 열립니다. (관리자: Supabase 환경변수가 아직
              설정되지 않았습니다.)
            </div>
          )}

          {SUPABASE_ENABLED && loading && (
            <div className="flex items-center gap-3 text-base text-ink-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              사진을 불러오는 중…
            </div>
          )}

          {SUPABASE_ENABLED && !loading && photos.length === 0 && (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/40 p-12 text-center text-base text-ink-500">
              아직 올라온 사진이 없습니다. 첫 사진의 주인공이 되어 주세요.
            </div>
          )}

          {photos.length > 0 && (
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.04 } },
              }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              {photos.map((p) => (
                <motion.li
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="group overflow-hidden rounded-2xl bg-ink-50"
                >
                  <a
                    href={p.public_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={p.public_url}
                      alt={p.caption ?? `${p.author_name}님 사진`}
                      loading="lazy"
                      className="aspect-square h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </a>
                  <div className="space-y-1 px-4 py-3">
                    <p className="line-clamp-2 text-sm leading-relaxed font-bold text-ink-900">
                      {p.caption}
                    </p>
                    <p className="flex items-baseline justify-between gap-2 text-xs text-ink-400">
                      <span>— {p.author_name}</span>
                      <span>
                        {new Date(p.created_at).toLocaleDateString("ko-KR", {
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </span>
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </section>

      {open && (
        <UploadDialog
          onClose={() => setOpen(false)}
          onUploaded={() => {
            setOpen(false);
            void refetch();
          }}
        />
      )}
    </>
  );
}

/* ============================================================== */
/* 업로드 다이얼로그                                                */
/* ============================================================== */

function UploadDialog({
  onClose,
  onUploaded,
}: {
  onClose: () => void;
  onUploaded: () => void;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixelCrop, setPixelCrop] = useState<Area | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [caption, setCaption] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onPick = (f: File | null) => {
    setError(null);
    if (!f) {
      setSrc(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      setError("이미지 파일만 올릴 수 있습니다.");
      return;
    }
    if (f.size > MAX_INPUT_BYTES) {
      setError("최대 12MB까지 올릴 수 있습니다.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result as string);
    reader.readAsDataURL(f);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const submit = async () => {
    if (!supabase) return;
    if (!src || !pixelCrop) {
      setError("사진을 선택해 주세요.");
      return;
    }
    if (!authorName.trim()) {
      setError("이름을 적어 주세요.");
      return;
    }
    if (!caption.trim()) {
      setError("사진 제목을 적어 주세요.");
      return;
    }
    if (TURNSTILE_ENABLED && !turnstileToken) {
      setError("아래 인간 확인을 마쳐 주세요.");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const blob = await makeSquareWebp(src, pixelCrop);
      const ext = blob.type.includes("webp") ? "webp" : "jpg";
      const name = `${crypto.randomUUID()}.${ext}`;
      const path = `${new Date().getFullYear()}/${name}`;

      const { error: upErr } = await supabase.storage
        .from(FAIR_BUCKET)
        .upload(path, blob, {
          cacheControl: "31536000",
          contentType: blob.type,
          upsert: false,
        });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage
        .from(FAIR_BUCKET)
        .getPublicUrl(path);

      const { error: insErr } = await supabase.from(FAIR_TABLE).insert({
        storage_path: path,
        public_url: pub.publicUrl,
        caption: caption.trim(),
        author_name: authorName.trim(),
        approved: false,
      });
      if (insErr) throw insErr;

      setDone(true);
      window.setTimeout(onUploaded, 1500);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "업로드에 실패했습니다.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="사진 올리기"
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-900/60 backdrop-blur-sm sm:items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 rounded-full p-2 text-ink-500 hover:bg-ink-50"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="py-12 text-center">
            <p className="text-2xl font-bold text-ink-900">
              사진을 올려 주셔서 감사합니다.
            </p>
            <p className="mt-3 text-base text-ink-500">
              운영자 검토 후 게시판에 공개됩니다.
            </p>
          </div>
        ) : (
          <>
            <p className="text-base font-bold text-magenta">사진 올리기</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.025em] text-ink-900 sm:text-3xl">
              함께한 한 장면을 보내 주세요.
            </h2>

            {/* 파일 + 크롭 영역 */}
            <div className="mt-6">
              {src ? (
                <div>
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ink-900">
                    <Cropper
                      image={src}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={(_, area) => setPixelCrop(area)}
                      cropShape="rect"
                      showGrid
                      objectFit="contain"
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <RotateCcw className="h-4 w-4 shrink-0 text-ink-400" />
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.01}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="h-1 flex-1 accent-ink-900"
                      aria-label="확대"
                    />
                    <button
                      type="button"
                      onClick={() => onPick(null)}
                      className="rounded-full bg-ink-100 px-3 py-1.5 text-xs font-bold text-ink-700 hover:bg-ink-200"
                    >
                      다른 사진
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-ink-400">
                    드래그로 위치 조정, 슬라이더로 확대/축소. 정사각형으로
                    잘려 올라갑니다.
                  </p>
                </div>
              ) : (
                <label
                  htmlFor="fair-file"
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/50 text-ink-500 transition-colors hover:border-ink-300 hover:bg-ink-50"
                >
                  <ImagePlus className="h-8 w-8" />
                  <span className="text-base font-bold">
                    탭하여 사진 선택
                  </span>
                  <span className="text-sm">
                    최대 12MB · 자동으로 정사각으로 잘려요
                  </span>
                </label>
              )}
              <input
                id="fair-file"
                ref={inputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => onPick(e.target.files?.[0] ?? null)}
              />
            </div>

            {/* 이름 (필수) */}
            <label className="mt-6 block">
              <span className="text-sm font-bold text-ink-700">
                이름 <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value.slice(0, 24))}
                required
                placeholder="공개될 이름을 적어 주세요"
                className="mt-2 w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 placeholder-ink-300 focus:border-ink-400 focus:outline-none"
              />
            </label>

            {/* 사진 제목 (필수) */}
            <label className="mt-4 block">
              <span className="text-sm font-bold text-ink-700">
                사진 제목 <span className="text-red-500">*</span>
              </span>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value.slice(0, 120))}
                maxLength={120}
                rows={2}
                required
                placeholder="사진에 어울리는 한 줄을 적어 주세요."
                className="mt-2 w-full resize-none rounded-2xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 placeholder-ink-300 focus:border-ink-400 focus:outline-none"
              />
              <span className="mt-1 block text-right text-xs text-ink-400">
                {caption.length} / 120
              </span>
            </label>

            {/* Turnstile */}
            {TURNSTILE_ENABLED ? (
              <div className="mt-5">
                <Turnstile
                  siteKey={TURNSTILE_SITE_KEY}
                  options={{ theme: "light", size: "flexible" }}
                  onSuccess={setTurnstileToken}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                />
              </div>
            ) : (
              <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-800">
                관리자: 인간 확인이 비활성 상태입니다.
                (`VITE_TURNSTILE_SITE_KEY` 미설정)
              </p>
            )}

            {error && (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border-2 border-ink-200 px-6 py-3 text-base font-bold text-ink-700 hover:border-ink-400"
              >
                취소
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={
                  !src ||
                  !authorName.trim() ||
                  !caption.trim() ||
                  (TURNSTILE_ENABLED && !turnstileToken) ||
                  busy
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Upload className="h-5 w-5" />
                )}
                보내기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
