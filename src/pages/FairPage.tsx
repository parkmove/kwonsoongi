import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Camera,
  Check,
  Download,
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

const PICKETS = [
  {
    n: "01",
    title: "엄마찬스 해명하라",
    phrase: "권순기는 자녀 서울대 진학 의혹에 대해 도민 앞에 제대로 해명하라",
    thumb: "/assets/photo/picket-01-thumb.png",
    href: "/downloads/picket-01-mom-chance.png",
    bg: "bg-magenta",
  },
  {
    n: "02",
    title: "입시부정 해명하라",
    phrase: "권순기는 자녀 서울대 진학 의혹에 대해 도민 앞에 제대로 해명하라",
    thumb: "/assets/photo/picket-02-thumb.png",
    href: "/downloads/picket-02-admission-fraud.png",
    bg: "bg-yellow-400",
  },
] as const;

const GOOD_EXAMPLES = [
  "손에 피켓을 들고 정면을 보고 찍은 사진",
  "피켓을 가슴 앞에 붙이고 찍은 사진",
  "얼굴은 가리고 피켓과 손만 보이게 찍은 사진",
];

const BAD_EXAMPLES = [
  "피켓만 따로 찍은 사진",
  "피켓을 바닥·벽에 세워둔 사진",
  "여러 사람이 줄지어 행진하는 사진",
  "욕설·허위사실·인신공격 문구가 들어간 사진",
];

async function makeSquareWebp(src: string, crop: Area): Promise<Blob> {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_EDGE;
  canvas.height = OUTPUT_EDGE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas context 없음");
  ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, OUTPUT_EDGE, OUTPUT_EDGE);
  const supportsWebp = canvas.toDataURL("image/webp").startsWith("data:image/webp");
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
        description="권순기 후보에게 검증자료 공개를 요구하는 시민 행동. 누구나, 어디서든."
        path="/fair"
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-900 text-ink-50">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-[-25vw] z-0 h-[80vw] w-[80vw] max-h-[800px] max-w-[800px] -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
          style={{ background: "radial-gradient(circle, #ff2d92 0%, transparent 60%)" }}
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
            이 릴레이는{" "}
            <strong className="text-ink-50">
              권순기 후보에게 검증자료 공개를 요구하는 시민 행동
            </strong>
            입니다. 혼자여도 됩니다. 5분이어도 됩니다. A4 한 장이면 충분합니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#step1"
              className="inline-flex items-center gap-2 rounded-full bg-magenta px-7 py-4 text-base font-bold tracking-[-0.01em] text-ink-900 transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-5 w-5" />
              피켓 다운로드
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              disabled={!SUPABASE_ENABLED}
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink-200/40 px-7 py-4 text-base font-bold tracking-[-0.01em] text-ink-100 transition-colors hover:border-ink-200 hover:bg-ink-200 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Camera className="h-5 w-5" />
              인증샷 올리기
            </button>
          </div>
        </div>
      </section>

      {/* 참여 원칙 — 공직선거법 */}
      <section className="bg-ink-900">
        <div className="mx-auto max-w-screen-xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/[0.06] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-amber-300" />
              <div>
                <p className="text-base font-bold text-amber-200 sm:text-lg">
                  공직선거법 안내
                </p>
                <p className="mt-2 text-sm leading-relaxed text-amber-100/90 sm:text-base">
                  공직선거법상 선거운동기간 중에는 누구든지{" "}
                  <strong className="text-amber-100">3면 25cm 이내</strong>의
                  소형 소품을 본인 부담으로 만들어 몸에 붙이거나 지니고
                  선거운동할 수 있습니다.{" "}
                  <strong className="text-amber-100">
                    피켓은 반드시 손에 들거나 몸에 붙인 상태로 참여해 주십시오.
                  </strong>{" "}
                  바닥·벽·책상에 따로 놓인 피켓만 찍은 사진은 릴레이 인증으로
                  받지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 1 — Download */}
      <section id="step1" className="bg-ink-900 scroll-mt-24">
        <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
          <StepHeader n="01" kicker="Download" title="피켓 다운로드하기" />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">
            A4 출력용 피켓을 내려받아 인쇄하여,{" "}
            <strong className="text-ink-100">
              긴 면이 25cm 안으로 들어오도록
            </strong>{" "}
            잘라 사용하세요.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PICKETS.map((p) => (
              <a
                key={p.n}
                href={p.href}
                download
                className="group overflow-hidden rounded-3xl border border-ink-700 bg-ink-800/40 transition-all hover:-translate-y-0.5 hover:border-magenta/40"
              >
                <div className={`relative aspect-[4/3] overflow-hidden ${p.bg}`}>
                  <img
                    src={p.thumb}
                    alt={`피켓 ${p.n} 미리보기 — ${p.title}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-6 py-5 sm:px-7 sm:py-6">
                  <div className="min-w-0">
                    <p className="text-xs font-bold tracking-[0.12em] text-magenta uppercase">
                      Picket {p.n}
                    </p>
                    <p className="mt-1 text-xl leading-tight font-bold tracking-[-0.02em] text-ink-50 sm:text-2xl">
                      {p.title}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-magenta px-5 py-2.5 text-sm font-bold text-ink-900 transition-transform group-hover:-translate-y-0.5">
                    <Download className="h-4 w-4" />
                    PNG
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STEP 2 — Photo */}
      <section className="bg-ink-950">
        <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
          <StepHeader n="02" kicker="Photo" title="피켓 들고 찍기" />

          <p className="mt-6 max-w-2xl text-xl leading-relaxed font-bold tracking-[-0.015em] text-ink-50 sm:text-2xl">
            피켓을 들고 사진을 찍어주세요!
            <br />
            얼굴은 나오지 않아도 괜찮습니다.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">
            중요한 것은 하나입니다 —{" "}
            <strong className="text-ink-100">
              피켓이 반드시 보이고, 참여자가 그 피켓을 손에 들고 있거나 몸에
              붙이고 있어야 합니다.
            </strong>
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <DoDontCard tone="good" title="좋은 예" items={GOOD_EXAMPLES} />
            <DoDontCard tone="bad" title="게시하지 않는 예" items={BAD_EXAMPLES} />
          </div>
        </div>
      </section>

      {/* STEP 3 — Upload */}
      <section id="upload" className="bg-ink-900 scroll-mt-24">
        <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
          <StepHeader n="03" kicker="Upload" title="인증샷 올리기" />

          <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-magenta/30 bg-magenta/[0.07]">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-magenta/30 blur-[100px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-magenta/20 blur-[100px]"
            />

            <div className="relative grid gap-10 px-7 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h3 className="text-[clamp(28px,5vw,52px)] leading-[1.05] font-bold tracking-[-0.025em] text-ink-50">
                  인증샷을 올려주세요!
                </h3>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-100 sm:text-xl">
                  우리의 행동이 모여{" "}
                  <strong className="text-magenta">공정한 경남교육</strong>을
                  만듭니다.
                </p>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-300 sm:text-base">
                  운영자 확인 후 이 페이지에 게시됩니다. 사진 아래에는 지역과
                  한 줄 메시지만 표시되며, 이름·연락처는 공개되지 않습니다.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  disabled={!SUPABASE_ENABLED}
                  className="group inline-flex items-center justify-between gap-3 rounded-2xl bg-magenta px-7 py-6 text-lg font-bold text-ink-900 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:text-xl"
                >
                  <span className="inline-flex items-center gap-3">
                    <Camera className="h-6 w-6" />
                    인증샷 올리기
                  </span>
                  <Upload className="h-6 w-6 transition-transform group-hover:-translate-y-0.5" />
                </button>
                <p className="px-2 text-xs text-ink-400">
                  최대 12MB · 자동으로 정사각형으로 잘려요
                </p>
              </div>
            </div>
          </div>
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

/* ============================================================== */
/* HELPERS                                                         */
/* ============================================================== */

function StepHeader({
  n,
  kicker,
  title,
}: {
  n: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="flex items-end gap-5 sm:gap-7">
      <span className="text-6xl font-black tracking-[-0.04em] text-magenta sm:text-7xl">
        {n}
      </span>
      <div className="pb-2 sm:pb-3">
        <p className="text-xs font-bold tracking-[0.14em] text-magenta uppercase sm:text-sm">
          {kicker}
        </p>
        <h2 className="mt-1 text-2xl leading-tight font-bold tracking-[-0.025em] text-ink-50 sm:text-4xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

function DoDontCard({
  tone,
  title,
  items,
}: {
  tone: "good" | "bad";
  title: string;
  items: readonly string[];
}) {
  const isGood = tone === "good";
  return (
    <article
      className={`rounded-3xl border p-7 sm:p-8 ${
        isGood
          ? "border-magenta/30 bg-magenta/[0.06]"
          : "border-ink-700 bg-ink-800/40"
      }`}
    >
      <p
        className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase ${
          isGood ? "text-magenta" : "text-ink-400"
        }`}
      >
        {isGood ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
        {title}
      </p>
      <h3
        className={`mt-3 text-xl font-bold tracking-[-0.02em] sm:text-2xl ${
          isGood ? "text-ink-50" : "text-ink-100"
        }`}
      >
        {isGood ? "이렇게 찍어 주세요" : "이런 사진은 받지 않습니다"}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {items.map((it) => (
          <li
            key={it}
            className="flex gap-3 text-base leading-relaxed text-ink-200"
          >
            <span
              aria-hidden
              className={`mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                isGood ? "bg-magenta" : "bg-ink-500"
              }`}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ============================================================== */
/* UPLOAD DIALOG                                                   */
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

      const { data: pub } = supabase.storage.from(FAIR_BUCKET).getPublicUrl(path);

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
                    피켓이 사람과 붙어 있어야 게시됩니다. 정사각형으로 잘려
                    올라갑니다.
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
