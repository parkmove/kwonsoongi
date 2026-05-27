import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  ExternalLink,
  FileText,
  GraduationCap,
  Lightbulb,
  Mail,
  Megaphone,
  Quote,
  School,
  ShieldAlert,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import Seo from "../components/Seo";

/* ============================================================== */
/* 데이터                                                          */
/* ============================================================== */

type Person = {
  name: string;
  role: string;
  detail: string;
};

const PEOPLE: Person[] = [
  {
    name: "권순기",
    role: "경상국립대 전 총장",
    detail: "2026년 경남교육감 선거 보수·중도 단일후보.",
  },
  {
    name: "김윤희",
    role: "권순기의 아내 · 경상국립대 화학과 교수",
    detail:
      "국가 연구비 8억 9천만 원을 받아 유기 태양전지 신소재를 6년간 연구.",
  },
  {
    name: "권OO",
    role: "두 사람의 아들",
    detail:
      "경남과학고 재학 중 어머니 연구실에서 R&E(고교생 연구 참여 프로그램) 수행.",
  },
];

type TimelineItem = {
  date: string;
  title: string;
  body: string;
  Icon: typeof Lightbulb;
  highlight?: boolean;
};

const TIMELINE: TimelineItem[] = [
  {
    date: "2009",
    title: "어머니, 국가 연구과제 수행 시작",
    body: "교육과학기술부로부터 태양전지 신소재 연구과제를 받아 시작. 같은 해, 아들 권OO이 경남과학고 1학년 입학과 동시에 어머니와 동일 주제로 R&E를 시작합니다.",
    Icon: Lightbulb,
  },
  {
    date: "2010.04",
    title: "특허 출원",
    body: "「알콕시 나프탈렌기를 포함하는 새로운 유기태양전지 재료」. 특허권자는 경상대학교산학협력단. 발명자에 어머니 김윤희, 과학고 교사, 아들 권OO(고2)이 포함됩니다.",
    Icon: FileText,
  },
  {
    date: "2010.09",
    title: "전국과학전람회 특상",
    body: "지도논문연구대회에 동일 주제로 출품해 특상을 수상합니다.",
    Icon: Trophy,
  },
  {
    date: "2011.01",
    title: "국제청소년 과학창의대전 최우수상",
    body: "동일 주제로 최우수상을 수상합니다.",
    Icon: Award,
  },
  {
    date: "2011.01–02",
    title: "SCI급 논문 2편 게재",
    body: "국내·해외 저널에 SCI급 논문 2편 게재. 제1저자 권OO, 교신저자(지도교수) 김윤희(어머니).",
    Icon: FileText,
    highlight: true,
  },
  {
    date: "2012",
    title: "서울대학교 합격",
    body: "권OO, 서울대학교에 합격합니다.",
    Icon: GraduationCap,
    highlight: true,
  },
];

const STATEMENTS: { said: string; truth: string; source?: string }[] = [
  {
    said: "이미 청와대, 교육부, 경남교육청에서 철저히 검증해 아무 문제없습니다.",
    truth:
      "교육부의 미성년 공저자 조사는 각 대학이 스스로 자료를 제출한 ‘셀프조사’였습니다. 조사를 반복할 때마다 숫자는 549건 → 794건 → 1,033건으로 불어났습니다. 그 시절 경상대 총장이 바로 권순기였습니다.",
    source: "MBC경남 TV 토론회, 2026.05.22",
  },
  {
    said: "교육부 조사에서 문제없음 판정을 받았습니다.",
    truth:
      "교육부 조사는 ‘대입 활용 여부’ 중심이었습니다. 국가 연구비의 적정 집행 여부와 발명자 허위 기재 여부는 한국연구재단과 감사원이 별도로 검토해야 할 사안으로, 이 부분은 보지 않았습니다.",
  },
  {
    said: "법적으로도 도덕적으로도 문제없습니다.",
    truth:
      "한국연구재단 연구윤리 규정은 ‘실질적 기여 없는 저자 등재’를 연구부정행위로 명시합니다. 경남과학고는 기숙학교입니다. 국가 예산 9억짜리 연구의 핵심 실험을 기숙학교 학생이 주도했다 — 어떻게 생각하십니까?",
  },
];

const SOURCES = [
  {
    label: "시사저널 (2020.03.26)",
    url: "https://www.sisajournal.com/news/articleView.html?idxno=197394",
  },
  {
    label: "SCI 논문 1 — Macromolecular Research",
    url: "https://doi.org/10.1007/s13233-011-0211-7",
  },
  {
    label: "SCI 논문 2 — J. Polymer Science",
    url: "https://doi.org/10.1002/pola.24526",
  },
  {
    label: "알콕시 특허 원문 (KR101043047B1)",
    url: "https://patents.google.com/patent/KR101043047B1/ko",
  },
  {
    label: "국가과제 NTIS",
    url: "https://www.ntis.go.kr/ThSearchProjectList.do?searchWord=%EC%9A%A9%EC%95%A1+%EA%B3%B5%EC%A0%95%EC%97%90+%EA%B8%B0%EB%B0%98%ED%95%9C+%EA%B3%A0%ED%9A%A8%EC%9C%A8%EC%9D%98+%EC%9C%A0%EA%B8%B0+%EC%A0%81%EC%B8%B5+%ED%83%9C%EC%96%91%EC%A0%84%EC%A7%80%EC%9D%98+%EA%B0%9C%EB%B0%9C",
  },
  {
    label: "오마이뉴스 (2005.02.01)",
    url: "https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0000235397",
  },
  {
    label: "노컷뉴스 — 경상대 적발 (2019)",
    url: "https://www.nocutnews.co.kr/news/5230030",
  },
  {
    label: "교육부 미성년 공저자 검증결과",
    url: "https://eiec.kdi.re.kr/policy/materialView.do?num=225592",
  },
];

/* ============================================================== */
/* 컴포넌트                                                        */
/* ============================================================== */

export default function HomePage() {
  return (
    <>
      <Seo
        title=""
        description="부모찬스로 서울대 의혹, 권순기 경남교육감 후보를 검증합니다."
        path="/"
      />

      {/* ────────────────────────────────────────────── */}
      {/* HERO                                            */}
      {/* ────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-ink-900">
        {/* SNU 정문 배경 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/assets/photo/snu-gate.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-ink-900/85 via-ink-900/90 to-ink-900"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 right-[-20vw] z-0 h-[80vw] w-[80vw] max-h-[900px] max-w-[900px] rounded-full opacity-25 blur-[140px]"
          style={{
            background: "radial-gradient(circle, #ff2d92 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-screen-xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-magenta/40 bg-magenta/10 px-4 py-1.5 text-xs font-bold tracking-[0.08em] text-magenta uppercase sm:text-sm"
          >
            <ShieldAlert className="h-4 w-4" />
            2026 경남교육감 검증
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-[clamp(40px,8vw,108px)] leading-[0.98] font-bold tracking-[-0.035em] text-ink-50"
          >
            부모찬스로
            <br />
            <span className="text-magenta">서울대 의혹,</span>
            <br />
            <span className="text-ink-50">
              권순기 경남교육감
              <br />
              후보를 소개합니다.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-pretty text-ink-100 sm:text-xl"
          >
            <strong className="text-ink-50">
              엄마 연구실에서, 국가 예산 9억을 쓴 프로젝트에 참여해 논문과
              스펙을 쌓고, 서울대 최종합격.
            </strong>
            <br />
            경남교육감 후보 권순기 아들에게 일어난 일입니다.
          </motion.p>

          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-10 max-w-2xl border-l-4 border-magenta pl-5"
          >
            <blockquote className="text-xl leading-snug font-bold text-ink-50 sm:text-2xl">
              “법적으로도 도덕적으로도 문제없습니다.”
            </blockquote>
            <figcaption className="mt-2 text-sm text-ink-300">
              — 권순기
            </figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-12 flex flex-wrap gap-3"
          >
            <a
              href="#evidence"
              className="inline-flex items-center gap-2 rounded-full bg-magenta px-7 py-4 text-base font-bold tracking-[-0.01em] text-ink-900 transition-transform hover:-translate-y-0.5"
            >
              직접 확인하세요
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              to="/fair"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink-200/40 px-7 py-4 text-base font-bold tracking-[-0.01em] text-ink-100 transition-colors hover:border-ink-200 hover:bg-ink-200 hover:text-ink-900"
            >
              <Megaphone className="h-5 w-5" />
              릴레이 1인시위
            </Link>
          </motion.div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-ink-400 uppercase"
        >
          ▼ Scroll
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* SECTION 1 — PEOPLE                              */}
      {/* ────────────────────────────────────────────── */}
      <section id="people" className="bg-ink-900 scroll-mt-24">
        <div className="mx-auto max-w-screen-xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <SectionHeader
            num="01"
            kicker="People"
            title="평범한 사람들은 알 수 없는 세계"
          />

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {PEOPLE.map((p, i) => (
              <article
                key={p.name}
                className="rounded-3xl border border-ink-700 bg-ink-800/40 p-7 sm:p-8"
              >
                <p className="text-xs font-bold tracking-[0.12em] text-magenta uppercase">
                  Person 0{i + 1}
                </p>
                <h3 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-ink-50">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm font-bold text-ink-300">{p.role}</p>
                <p className="mt-4 text-base leading-relaxed text-ink-200">
                  {p.detail}
                </p>
              </article>
            ))}
          </div>

          {/* 알아두면 이해가 쉽습니다 */}
          <div className="mt-16 grid gap-6 rounded-3xl border border-ink-700 bg-ink-800/20 p-7 md:grid-cols-2 sm:p-10">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.1em] text-magenta uppercase">
                <School className="h-4 w-4" />
                알아두면 이해가 쉽습니다
              </p>
              <h4 className="mt-4 text-xl font-bold tracking-[-0.02em] text-ink-50">
                R&E란?
              </h4>
              <p className="mt-3 text-base leading-relaxed text-ink-300">
                정부가 과학고 학생에게 대학교수 연구실에서 배울 기회를 주는
                교육 프로그램입니다. <strong className="text-ink-100">
                  “학생이 주도하는 연구”
                </strong>
                를 표방합니다.
              </p>
            </div>
            <div>
              <p className="invisible inline-flex items-center gap-2 text-xs font-bold tracking-[0.1em] uppercase md:visible">
                <School className="h-4 w-4" />
                &nbsp;
              </p>
              <h4 className="mt-4 text-xl font-bold tracking-[-0.02em] text-ink-50 md:mt-4">
                SCI 논문 제1저자란?
              </h4>
              <p className="mt-3 text-base leading-relaxed text-ink-300">
                SCI는 과학기술 분야에서 세계적 권위를 인정받는 학술지
                데이터베이스입니다. 제1저자는 핵심 아이디어를 도출하고, 실험과
                분석을 주도하며, 원고를 직접 작성한 사람을 말합니다.{" "}
                <strong className="text-ink-100">
                  이공계 대학원생들이 길게는 몇 년씩 매달려야 겨우 한 편을
                  써내는 자리입니다.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* SECTION 2 — TIMELINE                            */}
      {/* ────────────────────────────────────────────── */}
      <section className="border-t border-ink-800 bg-ink-900">
        <div className="mx-auto max-w-screen-xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <SectionHeader
            num="02"
            kicker="Timeline"
            title="2009~2011, 3년간 있었던 일"
          />

          <ol className="relative mt-14 border-l-2 border-ink-700 pl-8 sm:pl-12">
            {TIMELINE.map((t) => (
              <li key={t.date + t.title} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full border-2 sm:-left-[58px] sm:h-10 sm:w-10 ${
                    t.highlight
                      ? "border-magenta bg-magenta text-ink-900"
                      : "border-ink-600 bg-ink-900 text-magenta"
                  }`}
                >
                  <t.Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <p
                  className={`text-sm font-bold tracking-[0.06em] uppercase ${
                    t.highlight ? "text-magenta" : "text-ink-400"
                  }`}
                >
                  {t.date}
                </p>
                <h3
                  className={`mt-2 text-2xl leading-tight font-bold tracking-[-0.02em] sm:text-3xl ${
                    t.highlight ? "text-ink-50" : "text-ink-100"
                  }`}
                >
                  {t.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-300">
                  {t.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-16 rounded-3xl border border-magenta/30 bg-magenta/[0.06] p-7 sm:p-10">
            <p className="text-base leading-relaxed text-ink-100 sm:text-lg">
              특허 1건 · 논문 2편 · 전국대회 특상 · 국제대회 최우수상.
            </p>
            <p className="mt-2 text-2xl leading-tight font-bold tracking-[-0.02em] text-ink-50 sm:text-3xl">
              전부 같은 주제, 같은 연구, 어머니 연구실에서 나왔습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* SECTION 3 — PROBLEMS                            */}
      {/* ────────────────────────────────────────────── */}
      <section id="evidence" className="border-t border-ink-800 bg-ink-900 scroll-mt-24">
        <div className="mx-auto max-w-screen-xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <SectionHeader
            num="03"
            kicker="Issues"
            title="이게 왜 문제입니까"
          />

          {/* 문제 1 */}
          <ProblemBlock
            no="문제 1"
            heading="이건 그냥 엄마 찬스가 아닙니다 — 국가 예산 찬스입니다"
          >
            <Quoted
              text={
                <>
                  <strong>
                    “석·박사들도 SCI급 제1저자가 되는 건 힘들다.
                  </strong>
                  <br />
                  <strong>
                    연구하는 사람이라면 말이 안 되는 소리라고 할 것이다.”
                  </strong>
                </>
              }
              cite="경상대 교수 · 시사저널 2020.03.26"
            />

            <p className="mt-8 text-base leading-relaxed text-ink-200">
              그런데 아들 논문 원문의 감사의 말에는 이렇게 적혀 있습니다.
            </p>

            <pre className="mt-4 overflow-x-auto rounded-2xl border border-ink-700 bg-ink-950 p-5 font-mono text-sm leading-relaxed text-ink-100">
              {`"This work was supported by KOFAC (R&E 2009),
KOSEF (2010-0027732) and the Ministry
of Knowledge Economy..."`}
            </pre>

            <p className="mt-6 text-base leading-relaxed text-ink-200">
              <strong className="text-ink-50">
                KOSEF 과제번호 2010-0027732
              </strong>{" "}
              — 이것이 바로 어머니 김윤희 교수의 국가 연구과제입니다.
              <br />
              <strong className="text-magenta">6년, 총 8억 9천만 원.</strong>
            </p>

            <p className="mt-4 text-base leading-relaxed text-ink-300">
              논문에 국가 과제번호가 적혀 있다는 건 이 논문이 그 국가 연구의{" "}
              <strong className="text-ink-50">공식 성과물</strong>이라는 뜻입니다.
              그리고 김윤희 교수가 정부에 제출한{" "}
              <strong className="text-ink-50">국가 연구 결과보고서</strong>에는
              2011년 한 해 성과로 이렇게 기재돼 있습니다.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <ResultCard
                label="SCI 논문 3편"
                detail="이 중 2편의 제1저자: 아들 권OO"
              />
              <ResultCard
                label="특허 1건"
                detail="발명자에 아들 권OO 포함"
              />
            </div>

            <p className="mt-8 text-xl leading-snug font-bold tracking-[-0.02em] text-ink-50 sm:text-2xl">
              국민 세금 9억짜리 연구의 그해 핵심 성과 대부분이 고등학생 아들
              이름으로 나라에 보고됐습니다.
            </p>
          </ProblemBlock>

          {/* 문제 2 */}
          <ProblemBlock
            no="문제 2"
            heading="어머니가 교신저자, 아들이 제1저자"
          >
            <p className="text-base leading-relaxed text-ink-200">
              교신저자는 일반적으로 지도교수의 이름이 올라갑니다. 어머니의
              연구실에서, 국비로 진행한 어머니의 연구과제로, 어머니의 지도를
              받아 진행한 연구라는 뜻입니다.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-200">
              같은 시기 R&E 프로그램에 함께 참여한 다른 과학고 학생들도
              있었습니다. 그런데 특허권자에는{" "}
              <strong className="text-magenta">
                아들 권OO이 유일하게
              </strong>{" "}
              등재되었습니다. 과학고 지도교수였던 B도 특허권자로 등록되었습니다.
            </p>
          </ProblemBlock>

          {/* 문제 3 */}
          <ProblemBlock
            no="문제 3"
            heading="‘논문은 입시에 안 썼다’고요?"
          >
            <Quoted
              text={
                <>
                  서울대에서 논문이 입시에 쓰이지 않았음을 공식 확인했다.
                  원서에는 논문 대신 R&E 프로젝트 결과 보고서를 기재했다.
                </>
              }
              cite="권순기"
            />

            <p className="mt-8 text-base leading-relaxed text-ink-200">
              논문·특허·전국대회 특상·국제대회 최우수상이{" "}
              <strong className="text-ink-50">
                전부 같은 R&E 프로젝트 내용
              </strong>
              입니다.
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink-300">
              ‘논문’을 입시 자료로 직접 제출하지 않았을 수 있습니다. 하지만 이
              다양한 스펙을 자기소개서와 생활기록부에 과연 쓰지 않았을까요?
              당시 서울대 이공계 특기자 전형에서{" "}
              <strong className="text-ink-100">
                R&E 실적과 수상 이력은 핵심 스펙
              </strong>
              이 될 수 있었습니다.
            </p>

            <div className="mt-8 rounded-2xl border-l-4 border-magenta bg-ink-800/40 px-6 py-5">
              <p className="text-base leading-relaxed text-ink-100">
                경남교육연대는 요구합니다.
              </p>
              <p className="mt-3 text-lg leading-snug font-bold text-ink-50 sm:text-xl">
                “검증이 완료됐다면 서울대 입학 서류 일체와 검증 결과 문서를
                도민 앞에 즉각 공개하라.”
              </p>
            </div>

            <p className="mt-6 text-base font-bold text-magenta">
              권순기는 아직 이 문서를 공개하지 않았습니다.
            </p>
          </ProblemBlock>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* SECTION 4 — STATEMENTS                          */}
      {/* ────────────────────────────────────────────── */}
      <section className="border-t border-ink-800 bg-ink-900">
        <div className="mx-auto max-w-screen-xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <SectionHeader
            num="04"
            kicker="Said vs Fact"
            title="권순기의 말, 그리고 사실"
          />

          <div className="mt-14 space-y-6">
            {STATEMENTS.map((s, i) => (
              <article
                key={i}
                className="overflow-hidden rounded-3xl border border-ink-700 bg-ink-800/40"
              >
                <div className="grid md:grid-cols-2">
                  {/* 말 */}
                  <div className="border-b border-ink-700 p-7 sm:p-10 md:border-r md:border-b-0">
                    <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-ink-400 uppercase">
                      <Quote className="h-4 w-4" />
                      권순기는 말합니다
                    </p>
                    <blockquote className="mt-4 text-xl leading-snug font-bold text-ink-100 sm:text-2xl">
                      “{s.said}”
                    </blockquote>
                    {s.source && (
                      <p className="mt-3 text-xs text-ink-500">— {s.source}</p>
                    )}
                  </div>

                  {/* 사실 */}
                  <div className="bg-magenta/[0.06] p-7 sm:p-10">
                    <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-magenta uppercase">
                      <ShieldAlert className="h-4 w-4" />
                      사실은 어떻습니까
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-ink-100 sm:text-lg">
                      {s.truth}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* SECTION 5 — REPETITION                          */}
      {/* ────────────────────────────────────────────── */}
      <section className="border-t border-ink-800 bg-ink-900">
        <div className="mx-auto max-w-screen-xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <SectionHeader
            num="05"
            kicker="Repeated"
            title="이게 처음이 아닙니다"
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            {/* 2005 */}
            <article className="rounded-3xl border border-ink-700 bg-ink-800/40 p-7 sm:p-8">
              <p className="text-sm font-bold tracking-[0.1em] text-ink-400 uppercase">
                2005
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink-50">
                경남과학고 학생 김○○
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-300">
                ‘국내 고교생 최초 SCI 논문’으로 대서특필.
                그 논문에도 김윤희(권순기의 아내)가 공저자였습니다. 김○○은
                서울대 화학과에 입학했습니다.
              </p>
              <blockquote className="mt-5 rounded-2xl border-l-4 border-magenta bg-ink-900/50 px-5 py-4 text-sm leading-relaxed text-ink-100">
                “경상대학교 과학교육과 교수인 김○○ 군의 아버지를 통해 권 교수의
                지도를 받을 수 있게 됐다.”
                <span className="mt-2 block text-xs text-ink-500">
                  — 오마이뉴스, 2005.02.01
                </span>
              </blockquote>
            </article>

            {/* arrow */}
            <div
              aria-hidden
              className="flex flex-col items-center justify-center text-magenta lg:flex-col"
            >
              <ArrowRight className="hidden h-12 w-12 lg:block" />
              <ArrowRight className="block h-10 w-10 rotate-90 lg:hidden" />
              <p className="mt-3 text-center text-xs font-bold tracking-[0.1em] text-magenta uppercase">
                6년 후 반복
              </p>
            </div>

            {/* 2011 */}
            <article className="rounded-3xl border border-magenta/40 bg-magenta/[0.06] p-7 sm:p-8">
              <p className="text-sm font-bold tracking-[0.1em] text-magenta uppercase">
                2011
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink-50">
                권OO — 권순기·김윤희의 아들
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-200">
                SCI 논문 2편 · 특허 1건 · 전국대회 특상 · 국제대회 최우수상.
                전부 같은 주제. 어머니 연구실. 이듬해 서울대 합격.
              </p>
            </article>
          </div>

          <p className="mt-12 max-w-3xl text-lg leading-relaxed text-ink-200">
            권순기는 최근 토론회에서 “아들 전에도 고교생 SCI 논문의 선례가
            있다”며 이 사례를 들었습니다.{" "}
            <strong className="text-ink-50">
              그 선례도 경상대 교수의 자녀였고, 지도는 권순기와 아내 김윤희가
              했습니다.
            </strong>{" "}
            스스로 든 변호 근거가 오히려 같은 패턴의 반복임을 보여줍니다.
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* SECTION 6 — RELAY CTA                           */}
      {/* ────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-t border-ink-800 bg-ink-900">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center top, #ff2d92 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-screen-xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <SectionHeader
            num="06"
            kicker="Action"
            title="권순기는 도민들의 질문에 똑바로 대답해야 합니다"
          />

          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-ink-100 sm:text-2xl">
            혼자여도 됩니다. 5분이어도 됩니다. A4 한 장이면 충분합니다.
            권순기 후보가 대답할 수 있도록,{" "}
            <strong className="text-magenta">
              지금 릴레이 1인시위에 참여하세요.
            </strong>
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/fair"
              className="inline-flex items-center gap-2 rounded-full bg-magenta px-7 py-4 text-base font-bold text-ink-900 transition-transform hover:-translate-y-0.5"
            >
              <Megaphone className="h-5 w-5" />
              릴레이 1인시위 참여하기
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  void navigator.share({
                    title: "부모찬스로 서울대 의혹, 권순기를 검증합니다",
                    url: typeof window !== "undefined" ? window.location.href : "",
                  });
                } else if (typeof navigator !== "undefined" && navigator.clipboard) {
                  void navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink-200/40 px-7 py-4 text-base font-bold text-ink-100 transition-colors hover:border-ink-200 hover:bg-ink-200 hover:text-ink-900"
            >
              <ArrowUpRight className="h-5 w-5" />이 페이지 공유하기
            </button>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* SECTION 7 — CLOSING                             */}
      {/* ────────────────────────────────────────────── */}
      <section className="border-t border-ink-800 bg-ink-900">
        <div className="mx-auto max-w-screen-xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <SectionHeader num="07" kicker="Closing" title="마지막으로" />

          <p className="mt-10 text-lg leading-relaxed text-ink-200 sm:text-xl">
            권순기는 경남 아이들의 교육을 맡겠다고 합니다.
          </p>
          <ul className="mt-6 space-y-2 text-base leading-relaxed text-ink-300 sm:text-lg">
            <li>새벽까지 혼자 독서실에서 공부하는 아이가 있습니다.</li>
            <li>
              부모가 국가 예산 9억을 받는 교수가 아닌, 평범한 집 아이들이
              있습니다.
            </li>
            <li>스스로의 노력으로 끈질기게 성취하는 학생들이 있습니다.</li>
          </ul>

          <p className="mt-12 text-base text-ink-400">학부모님들이 묻습니다.</p>

          <h3 className="mt-4 text-[clamp(36px,7vw,84px)] leading-[1] font-bold tracking-[-0.035em] text-ink-50">
            당신 아들의 기회,
            <br />
            <span className="text-magenta">우리 아이도</span>
            <br />
            <span className="text-magenta">받을 수 있을까요?</span>
          </h3>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* TIP — 제보                                      */}
      {/* ────────────────────────────────────────────── */}
      <section
        id="tip"
        className="border-t border-ink-800 bg-ink-900 scroll-mt-24"
      >
        <div className="mx-auto max-w-screen-xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid items-start gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold tracking-[0.08em] text-magenta uppercase">
                Tip-off
              </p>
              <h2 className="mt-2 text-3xl leading-tight font-bold tracking-[-0.025em] text-ink-50 sm:text-5xl">
                알고 계신 것이 있습니까.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-300">
                이 페이지에 담기지 않은 사실을 알고 계신다면 제보해 주십시오.
                제보자의 신원은 철저히 보호됩니다.
              </p>
            </div>

            <Link
              to="/report"
              className="inline-flex items-center gap-2 self-end rounded-full border-2 border-magenta bg-magenta px-7 py-4 text-base font-bold text-ink-900 transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-5 w-5" />
              제보 안내 보기
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────── */}
      {/* SOURCES                                         */}
      {/* ────────────────────────────────────────────── */}
      <section className="border-t border-ink-800 bg-ink-950">
        <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="flex items-baseline gap-3">
            <Users className="h-5 w-5 text-magenta" aria-hidden />
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink-50 sm:text-3xl">
              근거 자료
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-400">
            이 페이지의 모든 주장은 공개된 1차 자료와 보도에 근거합니다. 각
            링크에서 직접 확인하실 수 있습니다.
          </p>

          <ul className="mt-8 divide-y divide-ink-800 overflow-hidden rounded-3xl border border-ink-800">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 bg-ink-900/40 px-5 py-4 text-base text-ink-100 transition-colors hover:bg-magenta/10 hover:text-magenta sm:px-7 sm:py-5"
                >
                  <span className="font-bold">{s.label}</span>
                  <ExternalLink
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-ink-500"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/* ============================================================== */
/* sub components                                                  */
/* ============================================================== */

function SectionHeader({
  num,
  kicker,
  title,
}: {
  num: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
      <div>
        <p className="text-sm font-bold tracking-[0.12em] text-magenta uppercase">
          {kicker}
        </p>
        <h2 className="mt-2 text-3xl leading-tight font-bold tracking-[-0.025em] text-ink-50 sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      <p
        aria-hidden
        className="text-7xl leading-none font-black tracking-[-0.04em] text-ink-800 sm:text-8xl"
      >
        {num}
      </p>
    </div>
  );
}

function ProblemBlock({
  no,
  heading,
  children,
}: {
  no: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mt-14 border-t border-ink-800 pt-10 first:mt-14">
      <p className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.1em] text-magenta uppercase">
        <Building2 className="h-4 w-4" />
        {no}
      </p>
      <h3 className="mt-3 text-2xl leading-tight font-bold tracking-[-0.02em] text-ink-50 sm:text-4xl">
        {heading}
      </h3>
      <div className="mt-8 max-w-3xl">{children}</div>
    </article>
  );
}

function Quoted({
  text,
  cite,
}: {
  text: React.ReactNode;
  cite: string;
}) {
  return (
    <figure className="rounded-2xl border-l-4 border-magenta bg-ink-800/40 px-6 py-6 sm:px-8 sm:py-8">
      <Quote
        aria-hidden
        className="h-6 w-6 text-magenta/60"
      />
      <blockquote className="mt-3 text-lg leading-relaxed text-ink-50 sm:text-xl">
        {text}
      </blockquote>
      <figcaption className="mt-4 text-xs text-ink-400 sm:text-sm">
        — {cite}
      </figcaption>
    </figure>
  );
}

function ResultCard({
  label,
  detail,
}: {
  label: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-ink-700 bg-ink-800/40 p-5">
      <p className="text-sm font-bold tracking-[0.06em] text-magenta uppercase">
        {label}
      </p>
      <p className="mt-2 text-base text-ink-100">{detail}</p>
    </div>
  );
}
