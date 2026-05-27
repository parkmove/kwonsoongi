import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Camera,
  ImagePlus,
  Loader2,
  Megaphone,
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

const MAX_INPUT_BYTES = 12 * 1024 * 1024;
const OUTPUT_EDGE = 1600;
const OUTPUT_QUALITY = 0.85;

const PICKET_PHRASES = [
  "내 아이는 안 됩니다. 그 집 아이는 됩니까?",
  "엄마 찬스로 서울대, 교육감은 안 됩니다",
  "국가 예산 9억으로 만든 스펙, 공정합니까?",
  "권순기는 검증 자료를 공개하라",
];

async function makeSquareWebp(src: string, crop: Area): Promise<Blob> {
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
        title="릴레이 1인시위"
        description="내가 경남 교육을 걱정합니다. 누구나, 어디서든."
        path="/fair"
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-900 text-ink-50">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-[-25vw] z-0 h-[80vw] w-[80vw] max-h-[800px] max-w-[800px] -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #ff2d92 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-screen-xl px-5 pt-24 pb-12 sm:px-6 sm:pt-32 sm:pb-16 lg:px-8">
          <p className="inline-flex items-center gap-2 text-base font-bold text-magenta">
            <Megaphone className="h-4 w-4" />
            릴레이 1인시위
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-6xl"
          >
            내가 경남 교육을
            <br />
            걱정합니다.
          </motion.h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">
            혼자여도 됩니다. 5분이어도 됩니다. A4 한 장이면 충분합니다.
            권순기 후보가 도민의 질문에 대답할 수 있도록, 지금 함께해 주세요.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              disabled={!SUPABASE_ENABLED}
              className="inline-flex items-center gap-2 rounded-full bg-magenta px-7 py-4 text-base font-bold tracking-[-0.01em] text-ink-900 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Camera className="h-5 w-5" />
              인증샷 올리기
            </button>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink-200/40 px-7 py-4 text-base font-bold tracking-[-0.01em] text-ink-100 transition-colors hover:border-ink-200 hover:bg-ink-200 hover:text-ink-900"
            >
              참여 방법 보기
            </a>
          </div>
        </div>
      </section>

      {/* 공직선거법 안내 */}
      <section className="bg-ink-900">
        <div className="mx-auto max-w-screen-xl px-5 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 rounded-3xl border border-amber-500/30 bg-amber-500/[0.06] px-6 py-5 sm:px-8 sm:py-6">
            <AlertTriangle
              aria-hidden
              className="mt-0.5 h-6 w-6 shrink-0 text-amber-300"
            />
            <div className="text-sm leading-relaxed text-amber-100/90 sm:text-base">
              <p className="font-bold text-amber-200">공직선거법 안내</p>
              <p className="mt-1">
                공직선거법 제68조에 따라 <strong>선거기간 개시일 이후</strong>
                , 누구든지 피켓·표지물을 들고 선거운동을 할 수 있습니다. 참여
                전 관할 선거관리위원회에 사전 문의하시길 권장합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3단계 */}
      <section id="how" className="bg-ink-900 scroll-mt-24">
        <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-sm font-bold tracking-[0.08em] text-magenta uppercase">
            How to
          </p>
          <h2 className="mt-2 text-3xl leading-tight font-bold tracking-[-0.025em] text-ink-50 sm:text-5xl">
            세 단계면 충분합니다.
          </h2>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            <li className="rounded-3xl border border-ink-700 bg-ink-800/40 p-7 sm:p-8">
              <p className="text-sm font-bold text-magenta">STEP 01</p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink-50">
                피켓 만들기
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-300">
                A4 용지에 아래 문구 중 하나를 적습니다.
                <span className="mt-1 block text-xs text-ink-500">
                  각 면 25cm 이내 권장
                </span>
              </p>
              <ul className="mt-5 space-y-2.5">
                {PICKET_PHRASES.map((p) => (
                  <li
                    key={p}
                    className="rounded-xl border border-magenta/20 bg-magenta/[0.06] px-4 py-3 text-sm leading-snug font-bold text-ink-50"
                  >
                    “{p}”
                  </li>
                ))}
              </ul>
            </li>

            <li className="rounded-3xl border border-ink-700 bg-ink-800/40 p-7 sm:p-8">
              <p className="text-sm font-bold text-magenta">STEP 02</p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink-50">
                사진 찍기
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-300">
                혼자 서 있는 모습을 찍습니다. 얼굴 공개는 선택입니다. 장소는
                어디든 괜찮습니다.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-400">
                <li>· 등 뒤에서 찍어도 됩니다.</li>
                <li>· 마스크·모자도 좋습니다.</li>
                <li>· 5분이면 충분합니다.</li>
              </ul>
            </li>

            <li className="rounded-3xl border border-magenta/30 bg-magenta/[0.08] p-7 sm:p-8">
              <p className="text-sm font-bold text-magenta">STEP 03</p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink-50">
                올리기
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-200">
                아래 버튼으로 업로드하면 운영자 검토 후 이 페이지에 게시됩니다.
              </p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={!SUPABASE_ENABLED}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-magenta px-6 py-3.5 text-base font-bold text-ink-900 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Camera className="h-5 w-5" />
                인증샷 올리기
              </button>
            </li>
          </ol>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="bg-ink-50">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold tracking-[0.08em] text-magenta uppercase">
                Wall of Voices
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.025em] text-ink-900 sm:text-5xl">
                참여자 인증샷
              </h2>
            </div>
            <p className="text-base text-ink-500">
              {SUPABASE_ENABLED && !loading
                ? `지금까지 ${photos.length}명이 참여했습니다.`
                : "함께해 주신 분들의 기록"}
            </p>
          </div>

          <div className="mt-10">
            {!SUPABASE_ENABLED && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-base text-amber-900">
                업로드 기능은 곧 열립니다. (관리자: Supabase 환경변수가 아직
                설정되지 않았습니다.)
              </div>
            )}

            {SUPABASE_ENABLED && loading && (
              <div className="flex items-center gap-3 text-base text-ink-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                인증샷을 불러오는 중…
              </div>
            )}

            {SUPABASE_ENABLED && !loading && photos.length === 0 && (
              <div className="rounded-3xl border border-dashed border-ink-300 bg-white p-12 text-center text-base text-ink-500">
                <p className="font-bold text-ink-700">
                  아직 올라온 인증샷이 없습니다.
                </p>
                <p className="mt-2">
                  첫 번째 한 사람이 되어 주세요. 5분이면 충분합니다.
                </p>
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
                    className="group overflow-hidden rounded-2xl bg-white shadow-sm"
                  >
                    <a
                      href={p.public_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={p.public_url}
                        alt={p.caption ?? `${p.author_name}님 인증샷`}
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
      setError("지역·소개를 적어 주세요. (예: 창원 / 아이 둘 키우는 엄마)");
      return;
    }
    if (!caption.trim()) {
      setError("한 줄 메시지를 적어 주세요.");
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
      aria-label="인증샷 올리기"
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-900/70 backdrop-blur-sm sm:items-center"
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
              참여해 주셔서 감사합니다.
            </p>
            <p className="mt-3 text-base text-ink-500">
              운영자 검토 후 게시됩니다.
            </p>
          </div>
        ) : (
          <>
            <p className="text-base font-bold text-magenta">인증샷 올리기</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.025em] text-ink-900 sm:text-3xl">
              한 사람의 5분이 모입니다.
            </h2>

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
                  <span className="text-base font-bold">탭하여 사진 선택</span>
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

            <label className="mt-6 block">
              <span className="text-sm font-bold text-ink-700">
                지역 · 소개 <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value.slice(0, 36))}
                required
                placeholder="예) 창원 / 아이 둘 키우는 엄마"
                className="mt-2 w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 placeholder-ink-300 focus:border-ink-400 focus:outline-none"
              />
            </label>

            <label className="mt-4 block">
              <span className="text-sm font-bold text-ink-700">
                한 줄 메시지 <span className="text-red-500">*</span>
              </span>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value.slice(0, 120))}
                maxLength={120}
                rows={2}
                required
                placeholder="피켓에 적은 문장 또는 한 줄 다짐을 적어 주세요."
                className="mt-2 w-full resize-none rounded-2xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-900 placeholder-ink-300 focus:border-ink-400 focus:outline-none"
              />
              <span className="mt-1 block text-right text-xs text-ink-400">
                {caption.length} / 120
              </span>
            </label>

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
