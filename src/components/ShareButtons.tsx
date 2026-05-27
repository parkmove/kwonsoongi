import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";

type Props = {
  title: string;
  text?: string;
  /** Optional full URL; defaults to current location. */
  url?: string;
  className?: string;
};

/**
 * 공유 버튼 — Web Share API + 링크 복사.
 * 카카오 SDK 미사용. 모바일에서는 OS 공유시트가 카카오톡을 포함한 앱 목록을 띄운다.
 */
export default function ShareButtons({ title, text, url, className }: Props) {
  const [copied, setCopied] = useState(false);

  const targetUrl = () =>
    url ??
    (typeof window !== "undefined" ? window.location.href : "https://songssam.one/");

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const handleShare = async () => {
    const u = targetUrl();
    if (canNativeShare) {
      try {
        await navigator.share({ title, text, url: u });
        return;
      } catch {
        // user cancelled or share failed — fall through to copy
      }
    }
    await handleCopy();
  };

  const handleCopy = async () => {
    const u = targetUrl();
    try {
      await navigator.clipboard.writeText(u);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = u;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className={
        "inline-flex flex-wrap items-center gap-2 " + (className ?? "")
      }
    >
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-base font-bold tracking-[-0.01em] text-white transition-all hover:-translate-y-0.5 hover:bg-ink-700"
      >
        <Share2 className="h-4 w-4" />
        공유하기
      </button>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-base font-bold tracking-[-0.01em] text-ink-700 transition-all hover:-translate-y-0.5 hover:border-ink-400 hover:text-ink-900"
        aria-live="polite"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-magenta" />
            복사됨
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4" />
            링크 복사
          </>
        )}
      </button>
    </div>
  );
}
