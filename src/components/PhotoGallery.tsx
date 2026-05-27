import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import {
  FAIR_TABLE,
  SUPABASE_ENABLED,
  supabase,
  type FairPhoto,
} from "../lib/supabase";

type Props = {
  limit?: number;
  tone?: "light" | "dark";
  emptyMessage?: string;
};

export default function PhotoGallery({
  limit = 120,
  tone = "light",
  emptyMessage = "아직 올라온 인증샷이 없습니다. 첫 번째 한 사람이 되어 주세요.",
}: Props) {
  const [photos, setPhotos] = useState<FairPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from(FAIR_TABLE)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (data) setPhotos(data as FairPhoto[]);
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const isDark = tone === "dark";
  const cardBg = isDark ? "bg-ink-800" : "bg-white shadow-sm";
  const titleColor = isDark ? "text-ink-50" : "text-ink-900";
  const metaColor = isDark ? "text-ink-400" : "text-ink-400";
  const emptyBox = isDark
    ? "border-ink-700 bg-ink-800/40 text-ink-300"
    : "border-ink-300 bg-white text-ink-500";

  if (!SUPABASE_ENABLED) {
    return (
      <div
        className={`rounded-2xl border ${
          isDark
            ? "border-amber-500/30 bg-amber-500/10 text-amber-100"
            : "border-amber-200 bg-amber-50 text-amber-900"
        } p-6 text-base`}
      >
        업로드 기능은 곧 열립니다. (관리자: Supabase 환경변수가 아직 설정되지
        않았습니다.)
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`flex items-center gap-3 text-base ${
          isDark ? "text-ink-300" : "text-ink-500"
        }`}
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        인증샷을 불러오는 중…
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div
        className={`rounded-3xl border border-dashed p-12 text-center text-base ${emptyBox}`}
      >
        <p className={`font-bold ${isDark ? "text-ink-100" : "text-ink-700"}`}>
          {emptyMessage}
        </p>
        <p className="mt-2">5분이면 충분합니다.</p>
      </div>
    );
  }

  return (
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
          className={`group overflow-hidden rounded-2xl ${cardBg}`}
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
            <p
              className={`line-clamp-2 text-sm leading-relaxed font-bold ${titleColor}`}
            >
              {p.caption}
            </p>
            <p
              className={`flex items-baseline justify-between gap-2 text-xs ${metaColor}`}
            >
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
  );
}
