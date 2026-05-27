import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** seconds per loop */
  duration?: number;
  reverse?: boolean;
  className?: string;
  /** 항목 사이 간격 (rem) */
  gap?: number;
};

/**
 * 가로로 끝없이 흐르는 텍스트/요소 띠.
 * children을 두 번 렌더해 자연스러운 루프를 만든다.
 */
export default function Marquee({
  children,
  duration = 30,
  reverse = false,
  className,
  gap = 4,
}: Props) {
  return (
    <div
      className={
        "group relative flex w-full overflow-hidden " + (className ?? "")
      }
      style={{ ["--gap" as never]: `${gap}rem` }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 items-center gap-[var(--gap)] pr-[var(--gap)]"
          style={{
            animation: `marquee-x ${duration}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
      <style>{`
        @keyframes marquee-x {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .group > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
