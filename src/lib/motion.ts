import type { Variants } from "motion/react";

/** 공통 ease — out-expo (자연스러운 가속 감속) */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** 단일 fade-up (viewport once) */
export const riseProps = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE_OUT },
  viewport: { once: true, amount: 0.35 },
} as const;

/** 단일 fade (viewport once) */
export const fadeProps = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.9, ease: EASE_OUT },
  viewport: { once: true, amount: 0.25 },
} as const;

/** 그룹 stagger 컨테이너 */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/** stagger 아이템 (fade-up) */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** 약간 더 큰 폭의 stagger 아이템 (히어로용) */
export const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};
