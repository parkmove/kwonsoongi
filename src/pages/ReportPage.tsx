import { useState } from "react";
import { Check, Copy, Mail, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import Seo from "../components/Seo";

const REPORT_EMAIL = "aboutkwon@proton.me";

const SCOPE = [
  "권OO의 중학교·고교 시절 학교 내부 사정",
  "경상대 연구실 내부 사정 (논문·특허 작성 과정)",
  "권순기·김윤희 관련 미공개 문서 또는 자료",
  "경상대 미성년 공저자 논문 관련 제보",
  "그 외 공익을 위해 알려야 할 내용",
];

export default function ReportPage() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(REPORT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <Seo
        title="제보하기"
        description="암호화 이메일로 제보를 받습니다. 제보자의 신원은 철저히 보호됩니다."
        path="/report"
      />

      <section className="relative isolate overflow-hidden bg-ink-900">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-[-30vw] z-0 h-[80vw] w-[80vw] max-h-[800px] max-w-[800px] -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #ff2d92 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-screen-md px-5 pt-24 pb-32 sm:px-6 sm:pt-32 lg:px-8">
          <p className="text-base font-bold text-magenta">제보하기</p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-ink-50 sm:text-6xl"
          >
            알고 계신 것이
            <br />
            있습니까.
          </motion.h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
            이 페이지에 담기지 않은 사실을 알고 계신다면 제보해 주십시오.
            제보자의 신원은 철저히 보호됩니다.
          </p>

          {/* 이메일 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-12 overflow-hidden rounded-3xl border border-magenta/30 bg-ink-800/60 backdrop-blur"
          >
            <div className="border-b border-ink-700 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-2 text-sm font-bold text-magenta">
                <Mail className="h-4 w-4" />
                암호화 이메일
              </div>
            </div>

            <div className="px-6 py-8 sm:px-8 sm:py-10">
              <p className="text-2xl leading-tight font-bold tracking-[-0.02em] text-ink-50 sm:text-3xl break-all">
                {REPORT_EMAIL}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`mailto:${REPORT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-magenta px-6 py-3.5 text-base font-bold text-ink-900 transition-transform hover:-translate-y-0.5"
                >
                  <Mail className="h-5 w-5" />
                  메일 보내기
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-600 px-6 py-3.5 text-base font-bold text-ink-100 transition-colors hover:border-ink-300 hover:text-ink-50"
                >
                  {copied ? (
                    <>
                      <Check className="h-5 w-5 text-magenta" />
                      복사되었습니다
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      주소 복사
                    </>
                  )}
                </button>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-ink-400">
                프로톤메일(Proton Mail)은 종단간 암호화 이메일 서비스입니다.
                익명 제보가 가능합니다.
              </p>
            </div>
          </motion.div>

          {/* 이런 내용이라면 */}
          <div className="mt-16">
            <h2 className="text-sm font-bold tracking-[0.08em] text-magenta uppercase">
              이런 내용이라면 더욱 소중합니다
            </h2>
            <ul className="mt-5 space-y-3">
              {SCOPE.map((s) => (
                <li
                  key={s}
                  className="flex gap-3 rounded-2xl border border-ink-700 bg-ink-800/40 px-5 py-4 text-base text-ink-100"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-magenta"
                  />
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 보호 안내 */}
          <div className="mt-12 flex items-start gap-4 rounded-2xl border border-ink-700 bg-ink-800/40 px-5 py-5">
            <ShieldCheck
              aria-hidden
              className="h-6 w-6 shrink-0 text-magenta"
            />
            <p className="text-sm leading-relaxed text-ink-300">
              제보 내용은 사실 확인 후 활용되며, 제보자 동의 없이는 어떠한
              내용도 공개되지 않습니다. 신원 정보는 외부에 노출되지 않습니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
