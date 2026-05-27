import type { ReactNode } from "react";
import { motion } from "motion/react";
import { riseProps } from "../lib/motion";

type Tone = "light" | "dark";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
  /** H1 으로 렌더링. 기본은 H2. */
  asH1?: boolean;
};

/**
 * 페이지 안의 큰 섹션 헤더 (eyebrow + 제목 + 부제).
 * - 토큰화: tracking은 한국어 헤드라인 -0.025em
 * - 모션: viewport stagger 없이, 묶음으로 한 번 라이즈
 */
export default function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  className,
  asH1 = false,
}: Props) {
  const Title = asH1 ? motion.h1 : motion.h2;
  const eyebrowColor =
    tone === "dark" ? "text-magenta" : "text-magenta";
  const titleColor = tone === "dark" ? "text-white" : "text-ink-900";
  const leadColor = tone === "dark" ? "text-white/70" : "text-ink-500";
  const alignClass = align === "center" ? "items-center text-center" : "";

  return (
    <div className={`flex flex-col ${alignClass} ${className ?? ""}`}>
      {eyebrow && (
        <motion.p
          {...riseProps}
          className={`text-base font-bold ${eyebrowColor}`}
        >
          {eyebrow}
        </motion.p>
      )}
      <Title
        {...riseProps}
        transition={{ ...riseProps.transition, delay: 0.05 }}
        className={`mt-3 text-3xl leading-[1.12] font-bold tracking-[-0.025em] sm:text-5xl ${titleColor}`}
      >
        {title}
      </Title>
      {lead && (
        <motion.p
          {...riseProps}
          transition={{ ...riseProps.transition, delay: 0.1 }}
          className={`mt-5 max-w-2xl text-lg leading-relaxed text-pretty ${leadColor}`}
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}
