import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ImagePlus, Send } from "lucide-react";
import { motion } from "motion/react";
import Seo from "../components/Seo";

const NAV_CTA = [
  {
    to: "/fair",
    num: "01",
    title: "사진 게시판",
    desc: "현장의 한 장면을 사진과 한 줄 제목으로 남겨 주세요.",
    Icon: ImagePlus,
  },
  {
    to: "/report",
    num: "02",
    title: "제보하기",
    desc: "비공개로 전달할 이야기를 입력 폼으로 보내 주세요.",
    Icon: Send,
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Seo title="" path="/" />

      {/* Hero — 풀스크린 */}
      <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-ink-900">
        {/* 배경 거대 워드마크 */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-[10vh] -left-[4vw] z-0 text-[36vw] leading-[0.88] font-black tracking-[-0.045em] text-ink-800 select-none sm:text-[28vw]"
        >
          권순기
        </span>

        {/* 마젠타 글로우 */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-[-20vw] z-0 h-[80vw] w-[80vw] max-h-[900px] max-w-[900px] -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #ff2d92 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-screen-xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-base font-bold text-magenta sm:text-lg"
          >
            권순기
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 text-[clamp(48px,11vw,160px)] leading-[0.95] font-black tracking-[-0.035em] text-ink-50"
          >
            한 줄의 메시지가
            <br />
            <span className="text-magenta">바꿉니다.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-ink-200"
          >
            여기에 권순기 소개 카피가 들어갑니다. 원고가 도착하면 그대로
            반영합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              to="/fair"
              className="inline-flex items-center gap-2 rounded-full bg-magenta px-7 py-4 text-base font-bold tracking-[-0.01em] text-ink-900 transition-transform hover:-translate-y-0.5"
            >
              사진 게시판
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/report"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink-200/40 px-7 py-4 text-base font-bold tracking-[-0.01em] text-ink-100 transition-colors hover:border-ink-200 hover:bg-ink-200 hover:text-ink-900"
            >
              제보하기
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 메뉴 안내 — 풀폭 split 2행 */}
      <section className="bg-ink-900">
        <ul>
          {NAV_CTA.map((c) => (
            <li key={c.to} className="border-t border-ink-800">
              <Link
                to={c.to}
                className="group block w-full transition-colors hover:bg-magenta/10"
              >
                <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-baseline gap-y-6 px-5 py-10 sm:grid-cols-[7rem_1fr_auto] sm:gap-x-10 sm:px-8 sm:py-14 lg:px-12">
                  <span className="text-5xl leading-none font-black tracking-[-0.04em] text-ink-700 transition-colors group-hover:text-magenta sm:text-7xl">
                    {c.num}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-3 text-3xl leading-tight font-bold tracking-[-0.025em] text-ink-50 sm:text-5xl">
                      <c.Icon className="hidden h-8 w-8 text-magenta sm:inline-block" />
                      {c.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-300">
                      {c.desc}
                    </p>
                  </div>
                  <ArrowUpRight className="h-10 w-10 self-center justify-self-start text-ink-600 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-magenta sm:h-14 sm:w-14 sm:justify-self-end" />
                </div>
              </Link>
            </li>
          ))}
          <li className="border-t border-ink-800" aria-hidden />
        </ul>
      </section>
    </>
  );
}
