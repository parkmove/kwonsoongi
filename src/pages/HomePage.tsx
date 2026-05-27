import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  ExternalLink,
  FileCheck,
  FileText,
  FlaskConical,
  GraduationCap,
  Image as ImageIcon,
  Lightbulb,
  Mail,
  Megaphone,
  Quote,
  ScrollText,
  ShieldAlert,
  Trophy,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";
import Seo from "../components/Seo";
import PhotoGallery from "../components/PhotoGallery";

/* ============================================================== */
/* DATA                                                            */
/* ============================================================== */

const PEOPLE = [
  {
    name: "권순기",
    role: "경상국립대 전 총장",
    detail: "2026년 경남교육감 선거 보수·중도 단일후보.",
    avatar: "/assets/photo/kwon-profile.webp",
    accent: "from-magenta/30 to-transparent",
  },
  {
    name: "김윤희",
    role: "권순기의 아내 · 경상국립대 화학과 교수",
    detail: "유기 태양전지 소재 분야의 국가 연구과제를 수행한 연구자.",
    monogram: "金",
    Icon: FlaskConical,
    accent: "from-ink-700 to-transparent",
  },
  {
    name: "권OO",
    role: "두 사람의 아들",
    detail:
      "경남과학고 재학 시절 어머니 연구실에서 R&E에 참여. 이듬해 서울대 합격.",
    monogram: "權",
    Icon: GraduationCap,
    accent: "from-ink-700 to-transparent",
  },
] as const;

type TimelineGroup = {
  year: string;
  items: { date: string; title: string; body: string; Icon: typeof Lightbulb; highlight?: boolean }[];
};

const TIMELINE: TimelineGroup[] = [
  {
    year: "2009",
    items: [
      {
        date: "연구과제 착수",
        title: "어머니, 국가 연구과제 수행 시작",
        body: "어머니 김윤희 교수가 교육과학기술부·한국연구재단이 관리한 유기 태양전지 소재 연구과제를 수행합니다. 같은 해 아들 권OO이 경남과학고 1학년으로 입학, 어머니 연구실에서 같은 분야의 R&E를 시작합니다. 한쪽은 국가 연구과제, 한쪽은 고교생 연구프로그램. 주제도 연구실도 지도체계도 겹쳤습니다.",
        Icon: Lightbulb,
      },
    ],
  },
  {
    year: "2010",
    items: [
      {
        date: "04월",
        title: "특허 발명자 등재",
        body: "「알콕시 나프탈렌기를 포함하는 새로운 유기태양전지 재료」. 특허권자: 경상대학교산학협력단. 발명자에 김윤희·교사·아들 권OO(고2)이 포함됩니다. 어머니의 연구 분야, 국가 연구과제와 이어진 주제였습니다.",
        Icon: FileText,
      },
      {
        date: "09월",
        title: "전국과학전람회 특상",
        body: "권OO이 같은 주제로 지도논문연구대회에 출품해 특상을 수상.",
        Icon: Trophy,
      },
    ],
  },
  {
    year: "2011",
    items: [
      {
        date: "01월",
        title: "국제청소년 과학창의대전 최우수상",
        body: "같은 주제로 최우수상 수상.",
        Icon: Award,
      },
      {
        date: "01–02월",
        title: "SCI급 논문 2편 게재",
        body: "국내·해외 학술지에 SCI급 논문 2편 게재. 제1저자: 권OO / 교신저자: 김윤희(어머니) / 소속: 경남과학고.",
        Icon: ScrollText,
        highlight: true,
      },
    ],
  },
  {
    year: "2012",
    items: [
      {
        date: "결과",
        title: "서울대학교 합격",
        body: "권OO, 서울대학교에 합격합니다.",
        Icon: GraduationCap,
        highlight: true,
      },
    ],
  },
];

const STATEMENTS: {
  said: string;
  source?: string;
  factTitle: string;
  factBody: React.ReactNode;
}[] = [
  {
    said: "이미 청와대, 교육부, 경남교육청에서 철저히 검증해 아무 문제없습니다.",
    source: "MBC경남 TV 토론회, 2026.05.22",
    factTitle: "핵심은 ‘검증 완료’가 아닙니다 — ‘셀프 감사’입니다",
    factBody: (
      <>
        <p>
          교육부의 미성년 공저자 논문 조사는 대학이{" "}
          <strong className="text-ink-50">자체조사하고 자료를 제출하는 방식</strong>에
          크게 기대고 있었습니다. 겉은 교육부 검증이지만, 속을 들여다보면
          문제의 자료를 가진 대학이 스스로 조사해 내놓은 결과가 검증의 출발점이었습니다.
        </p>
        <p>
          교육부 최종 검증결과가 발표된 2022년,{" "}
          <strong className="text-magenta">권순기는 경상국립대 총장이었습니다.</strong>
        </p>
        <p>
          권순기 후보 가족 의혹의 핵심 자료를 권순기 총장 체제의 대학이 쥐고,
          그 대학의 자체검증 결과가 ‘교육부 검증’이라는 이름으로 포장될 수 있는
          구조 — 이것이 셀프 감사입니다.
        </p>
        <p className="font-bold text-ink-50">
          검증이 진짜였다면, 공개하지 못할 이유가 없습니다.
        </p>
      </>
    ),
  },
  {
    said: "교육부 조사에서 문제없음 판정을 받았습니다.",
    factTitle: "‘문제없음’이 끝낸 척하는 단어가 되어서는 안 됩니다",
    factBody: (
      <>
        <p>
          도민이 묻는 것은 단어가 아니라{" "}
          <strong className="text-ink-50">범위</strong>입니다. 교육부 조사는
          무엇을 봤습니까.
        </p>
        <ul className="mt-2 space-y-2 border-l-2 border-magenta/40 pl-5 text-base text-ink-100">
          <li>· 논문 파일을 서울대에 제출했는지만 봤습니까?</li>
          <li>· 권OO의 제1저자 실질 기여를 확인했습니까?</li>
          <li>· 국가 연구과제 성과가 가족 입시 스펙으로 이어졌는지 봤습니까?</li>
          <li>· 특허 발명자 등재의 적정성을 봤습니까?</li>
          <li>· 어머니 교신저자 / 아들 제1저자 구조에서 이해충돌을 검토했습니까?</li>
        </ul>
        <p>
          하나를 확인했다고 전부 확인한 것이 아닙니다. 이 자료 없이 ‘문제없음’만
          반복하는 것은 검증이 아니라 도민에게 눈을 감으라는 요구입니다.
        </p>
      </>
    ),
  },
  {
    said: "법적으로도 도덕적으로도 문제없습니다.",
    factTitle: "법적으로 — 그러면 문서로 보여주십시오",
    factBody: (
      <>
        <p>
          연구윤리는 이름만 올린 저자를 문제로 봅니다. 핵심은 간단합니다 —
          그 사람이 실제로 연구 아이디어·실험·분석·원고 작성에 충분히
          기여했느냐.
        </p>
        <p>
          그러면 권OO의 기여를 보여주면 됩니다.{" "}
          <strong className="text-ink-50">
            실험일지, 연구노트, 원고 작성 기록, 공동저자 기여도 자료
          </strong>
          를 공개하면 됩니다. 정말 제1저자가 맞다면 문서는 가장 강한 방어수단입니다.
        </p>
        <p>그런데 왜 아직 도민은 그 문서를 보지 못합니까.</p>
        <p className="font-bold text-ink-50">
          교육감의 기준은 법원 문턱이 아니라, 아이들이 납득할 수 있는가입니다.
        </p>
      </>
    ),
  },
];

const DEMANDS = [
  "서울대 입학 서류 중 R&E·수상·특허·논문 관련 기재 부분",
  "서울대 또는 검증기관의 확인 문서",
  "경상대(경상국립대)가 교육부에 제출한 자체조사 자료",
  "권OO 논문 2편의 연구윤리 검증 자료",
  "제1저자 기여도 판단 자료와 연구노트 존재 여부",
  "특허 발명자 등재 근거 자료",
  "총장 가족 사안에 대한 이해충돌 회피 조치 여부",
];

const SOURCES = [
  { label: "시사저널 (2020.03.26)", url: "https://www.sisajournal.com/news/articleView.html?idxno=197394" },
  { label: "SCI 논문 1 — Macromolecular Research", url: "https://doi.org/10.1007/s13233-011-0211-7" },
  { label: "SCI 논문 2 — J. Polymer Science", url: "https://doi.org/10.1002/pola.24526" },
  { label: "알콕시 특허 원문 (KR101043047B1)", url: "https://patents.google.com/patent/KR101043047B1/ko" },
  { label: "국가과제 ScienceON", url: "https://scienceon.kisti.re.kr/srch/selectPORSrchReport.do?cn=TRKO201300012034" },
  { label: "오마이뉴스 (2005.02.01)", url: "https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0000235397" },
  { label: "노컷뉴스 — 경상대 적발 (2019)", url: "https://www.nocutnews.co.kr/news/5230030" },
  { label: "교육부 미성년 공저자 검증결과 — 정부 보도자료", url: "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156504811" },
  { label: "교육부 검증결과 관련 보도 (교수신문)", url: "https://www.kyosu.net/news/articleView.html?idxno=87963" },
  { label: "권순기 총장 재임 관련 보도 (전자신문)", url: "https://www.etnews.com/20240605000120" },
  { label: "공직선거법 제68조 소품 선거운동 안내", url: "https://www.easylaw.go.kr/CSP/CnpClsMainBtr.laf?ccfNo=3&cciNo=1&cnpClsNo=2&csmSeq=250&popMenu=ov" },
];

/* ============================================================== */
/* PAGE                                                            */
/* ============================================================== */

export default function HomePage() {
  return (
    <>
      <Seo
        title=""
        description="엄마 연구실에서 만든 스펙, 그 끝은 서울대였습니다. 권순기 후보는 답해야 합니다."
        path="/"
      />

      <Hero />
      <VoiceWallSection />
      <SectionDivider
        label="평범한 사람들은 알 수 없는 세계"
        num="01"
        image="/assets/photo/lab.jpg"
        imagePosition="center 35%"
      />
      <PeopleSection />
      <PrimerSection />
      <SectionDivider
        label="2009~2011, 3년간 있었던 일"
        num="02"
        tone="alt"
        image="/assets/photo/clock.jpg"
      />
      <TimelineSection />
      <SummaryBanner />
      <SectionDivider
        label="이게 왜 문제입니까"
        num="03"
        image="/assets/photo/scales.jpg"
        imagePosition="center 40%"
      />
      <ProblemSection />
      <SectionDivider label="권순기의 말, 그리고 사실" num="04" tone="alt" />
      <StatementSection />
      <DemandSection />
      <SectionDivider label="이게 처음이 아닙니다" num="05" />
      <RepetitionSection />
      <CtaSection />
      <ClosingSection />
      <TipSection />
      <SourcesSection />
    </>
  );
}

/* ============================================================== */
/* HERO                                                            */
/* ============================================================== */

function Hero() {
  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-ink-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/assets/photo/snu-gate-night.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-ink-950/70 via-ink-950/88 to-ink-950"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-[-20vw] z-0 h-[80vw] w-[80vw] max-h-[900px] max-w-[900px] rounded-full opacity-25 blur-[140px]"
        style={{ background: "radial-gradient(circle, #ff2d92 0%, transparent 60%)" }}
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
          className="mt-7 text-[clamp(36px,7.5vw,96px)] leading-[1.02] font-bold tracking-[-0.035em] text-ink-50"
        >
          엄마 연구실에서 만든
          <br />
          <span className="text-magenta">스펙, 그 끝은</span>
          <br />
          <span className="text-magenta">서울대였습니다.</span>
          <br />
          <span className="text-ink-50">권순기 후보는 답해야 합니다.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 max-w-2xl space-y-4 text-lg leading-relaxed text-pretty text-ink-100 sm:text-xl"
        >
          <p>
            경남과학고 학생 권OO. 어머니는 경상국립대 화학과 교수.
            아들은 어머니 연구실에서, 어머니의 국가 연구과제와 같은 분야의 R&E를
            했습니다.
          </p>
          <p>
            <strong className="text-ink-50">
              그 결과는 특허 1건, 전국대회 수상, 국제대회 수상, SCI 논문 2편
              제1저자. 그리고 서울대 합격.
            </strong>
          </p>
          <p>
            이것은 한 학생의 순수한 성취입니까. 아니면 평범한 아이들에게는
            처음부터 열리지 않는 문이었습니까.
          </p>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-10 max-w-2xl border-l-4 border-magenta pl-5"
        >
          <blockquote className="text-xl leading-snug font-bold text-ink-50 sm:text-2xl">
            “법적으로도 도덕적으로도 문제없습니다.”
          </blockquote>
          <figcaption className="mt-2 text-sm text-ink-300">— 권순기</figcaption>
          <p className="mt-5 text-base leading-relaxed text-ink-200 sm:text-lg">
            그러면 더 쉽습니다.{" "}
            <strong className="text-ink-50">
              문제를 제기한 시민을 탓하지 말고, 자료를 공개하면 됩니다.
            </strong>
          </p>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          <a
            href="#people"
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

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-ink-400 uppercase"
      >
        ▼ Scroll
      </div>
    </section>
  );
}

/* ============================================================== */
/* VOICE WALL — 인증샷 그리드 (Section 2)                          */
/* ============================================================== */

function VoiceWallSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-magenta/15 blur-[120px]"
      />
      <div className="relative mx-auto max-w-screen-2xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-end gap-6 sm:grid-cols-[1fr_auto] sm:gap-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-magenta/40 bg-magenta/10 px-4 py-1.5 text-xs font-bold tracking-[0.1em] text-magenta uppercase">
              <Megaphone className="h-4 w-4" />
              Wall of Voices · 릴레이 1인시위
            </p>
            <h2 className="mt-5 text-[clamp(28px,5vw,52px)] leading-[1.05] font-bold tracking-[-0.025em] text-ink-50">
              도민들이 요구하고 있습니다.
              <br />
              <span className="text-magenta">언제까지 침묵하실 겁니까.</span>
            </h2>
          </div>
          <Link
            to="/fair"
            className="inline-flex items-center gap-2 self-end rounded-full border-2 border-ink-200/40 px-6 py-3 text-sm font-bold text-ink-100 transition-colors hover:border-ink-200 hover:bg-ink-200 hover:text-ink-900"
          >
            나도 참여하기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12">
          <PhotoGallery limit={20} tone="dark" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================== */
/* SECTION DIVIDER                                                 */
/* ============================================================== */

function SectionDivider({
  label,
  num,
  tone = "main",
  image,
  imagePosition = "center",
}: {
  label: string;
  num: string;
  tone?: "main" | "alt";
  image?: string;
  imagePosition?: string;
}) {
  const bg = tone === "alt" ? "bg-ink-950" : "bg-ink-900";

  if (image) {
    return (
      <div className="relative isolate overflow-hidden border-y border-magenta/20">
        <div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: imagePosition,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-gradient-to-r from-ink-950/95 via-ink-950/80 to-ink-950/40"
        />
        <div className="relative z-10 mx-auto flex max-w-screen-xl items-center justify-between gap-6 px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex items-center gap-5">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-magenta text-base font-black tracking-[-0.02em] text-ink-900 sm:h-12 sm:w-12 sm:text-lg">
              {num}
            </span>
            <p className="text-xl leading-tight font-bold tracking-[-0.02em] text-ink-50 sm:text-3xl">
              {label}
            </p>
          </div>
          <span
            aria-hidden
            className="hidden text-xs tracking-[0.16em] text-ink-300 uppercase sm:inline-block"
          >
            / Section
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${bg} border-y border-magenta/15`}>
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-6 px-5 py-6 sm:px-6 sm:py-7 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-magenta text-sm font-black tracking-[-0.02em] text-ink-900">
            {num}
          </span>
          <p className="text-base font-bold tracking-[-0.015em] text-ink-100 sm:text-lg">
            {label}
          </p>
        </div>
        <span aria-hidden className="hidden text-xs tracking-[0.16em] text-ink-500 uppercase sm:inline-block">
          / Section
        </span>
      </div>
    </div>
  );
}

/* ============================================================== */
/* SECTION 1 — PEOPLE                                              */
/* ============================================================== */

function PeopleSection() {
  return (
    <section id="people" className="relative bg-ink-900 scroll-mt-24">
      <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {PEOPLE.map((p, i) => (
            <article
              key={p.name}
              className="group relative overflow-hidden rounded-3xl border border-ink-700 bg-ink-800/60"
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b ${p.accent}`}
              />

              <div className="relative z-10 flex items-center justify-center pt-10">
                {"avatar" in p && p.avatar ? (
                  <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-magenta/40 ring-offset-4 ring-offset-ink-800">
                    <img
                      src={p.avatar}
                      alt={`${p.name} 프로필`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-ink-900 ring-4 ring-ink-700 ring-offset-4 ring-offset-ink-800">
                    <span className="text-5xl font-black tracking-[-0.04em] text-ink-100 [font-family:var(--font-serif)]">
                      {"monogram" in p ? p.monogram : p.name[0]}
                    </span>
                    {"Icon" in p && p.Icon && (
                      <span className="absolute -right-1 -bottom-1 flex h-9 w-9 items-center justify-center rounded-full bg-magenta text-ink-900">
                        <p.Icon className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="relative z-10 px-7 pt-7 pb-9 text-center sm:px-8 sm:pb-10">
                <p className="text-xs font-bold tracking-[0.12em] text-magenta uppercase">
                  Person 0{i + 1}
                </p>
                <h3 className="mt-2 text-3xl font-bold tracking-[-0.025em] text-ink-50">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm font-bold text-ink-300">{p.role}</p>
                <p className="mt-5 text-base leading-relaxed text-ink-200">
                  {p.detail}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-magenta/20 bg-magenta/[0.04] px-7 py-6 sm:px-10">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center text-base font-bold tracking-[-0.01em] text-ink-100 sm:text-lg">
            <span>아버지 권순기</span>
            <span aria-hidden className="text-magenta">×</span>
            <span>어머니 김윤희</span>
            <span aria-hidden className="text-magenta">→</span>
            <span className="text-magenta">아들 권OO</span>
            <span aria-hidden className="text-ink-500">|</span>
            <span className="text-ink-300">같은 연구실, 같은 주제</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== */
/* SECTION 1.5 — PRIMER (알아두면 이해가 쉽습니다)                  */
/* ============================================================== */

function PrimerSection() {
  return (
    <section className="bg-ink-950">
      <div className="mx-auto max-w-screen-xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-ink-700 px-4 py-1.5 text-xs font-bold tracking-[0.1em] text-ink-300 uppercase">
          <BookOpen className="h-4 w-4" />
          알아두면 이해가 쉽습니다
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <PrimerCard
            Icon={FlaskConical}
            term="R&E"
            full="Research & Education"
            body={
              <>
                <p>
                  과학고 학생이 대학교수 연구실에서 연구를 경험하도록 만든 교육
                  프로그램입니다. 취지는 좋습니다 — 학생에게 더 큰 배움의 기회를
                  주자는 제도입니다.
                </p>
                <p className="mt-3">
                  <strong className="text-ink-50">문제는 제도 자체가 아닙니다.</strong>{" "}
                  그 기회가 누구에게, 어떤 경로로, 얼마나 특별하게 열렸느냐입니다.
                </p>
              </>
            }
          />
          <PrimerCard
            Icon={ScrollText}
            term="SCI 논문 제1저자"
            full="First Author of SCI Paper"
            body={
              <>
                <p>
                  석사·박사 과정 연구자도 한 편을 쓰기 위해 몇 년을 버팁니다.
                  제1저자는 단순히 옆에서 구경한 사람이 아니라{" "}
                  <strong className="text-ink-50">
                    그 연구의 핵심 아이디어·실험·분석·원고 작성에 가장 크게
                    기여했다
                  </strong>
                  는 표시입니다.
                </p>
                <p className="mt-3">
                  그런데 고등학생 권OO은 SCI 논문 2편에서 제1저자였습니다.
                  교신저자는 어머니 김윤희 교수였습니다.
                </p>
              </>
            }
          />
        </div>

        <div className="mt-10 rounded-3xl border-l-4 border-magenta bg-ink-900/60 px-7 py-7 sm:px-10 sm:py-8">
          <p className="text-base leading-relaxed text-ink-100 sm:text-lg">
            이제 질문은 하나입니다.
          </p>
          <ul className="mt-3 space-y-1.5 text-lg leading-snug font-bold tracking-[-0.01em] text-ink-50 sm:text-xl">
            <li>그 기여는 무엇이었습니까.</li>
            <li>누가 확인했습니까.</li>
            <li>그 자료는 왜 아직 도민 앞에 공개되지 않았습니까.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function PrimerCard({
  Icon,
  term,
  full,
  body,
}: {
  Icon: typeof FlaskConical;
  term: string;
  full: string;
  body: React.ReactNode;
}) {
  return (
    <article className="flex gap-5 rounded-3xl border border-ink-700 bg-ink-900 p-6 sm:p-8">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-magenta/15 text-magenta">
        <Icon className="h-7 w-7" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold tracking-[0.1em] text-ink-400 uppercase">
          {full}
        </p>
        <h4 className="mt-1 text-xl font-bold tracking-[-0.02em] text-ink-50">
          {term}
        </h4>
        <div className="mt-3 text-base leading-relaxed text-ink-300">{body}</div>
      </div>
    </article>
  );
}

/* ============================================================== */
/* SECTION 2 — TIMELINE                                            */
/* ============================================================== */

function TimelineSection() {
  return (
    <section className="bg-ink-900">
      <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="space-y-12 sm:space-y-16">
          {TIMELINE.map((group, gi) => (
            <div
              key={group.year}
              className="grid gap-6 sm:grid-cols-[180px_1fr] sm:gap-10"
            >
              <div className="flex items-start sm:sticky sm:top-24 sm:self-start">
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-magenta uppercase">
                    Year {gi + 1}
                  </p>
                  <p className="mt-1 text-5xl leading-none font-black tracking-[-0.04em] text-ink-50 sm:text-6xl">
                    {group.year}
                  </p>
                </div>
              </div>

              <ol className="relative space-y-5 border-l-2 border-ink-700 pl-7 sm:pl-9">
                {group.items.map((t) => (
                  <li key={t.title} className="relative">
                    <span
                      aria-hidden
                      className={`absolute top-1.5 -left-[35px] flex h-7 w-7 items-center justify-center rounded-full border-2 sm:-left-[44px] ${
                        t.highlight
                          ? "border-magenta bg-magenta text-ink-900"
                          : "border-ink-600 bg-ink-900 text-magenta"
                      }`}
                    >
                      <t.Icon className="h-3.5 w-3.5" />
                    </span>
                    <div
                      className={`rounded-2xl border p-5 sm:p-6 ${
                        t.highlight
                          ? "border-magenta/40 bg-magenta/[0.08]"
                          : "border-ink-700 bg-ink-800/40"
                      }`}
                    >
                      <p
                        className={`text-xs font-bold tracking-[0.08em] uppercase ${
                          t.highlight ? "text-magenta" : "text-ink-400"
                        }`}
                      >
                        {t.date}
                      </p>
                      <h3 className="mt-1 text-xl leading-tight font-bold tracking-[-0.02em] text-ink-50 sm:text-2xl">
                        {t.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-ink-300">
                        {t.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SummaryBanner() {
  return (
    <section className="bg-ink-900">
      <div className="mx-auto max-w-screen-xl px-5 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-magenta px-7 py-10 sm:px-12 sm:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-ink-900/10 blur-2xl"
          />
          <div className="relative grid gap-6 sm:grid-cols-5 sm:items-center">
            <Tally label="특허" value="1건" />
            <Tally label="SCI 논문" value="2편" />
            <Tally label="전국대회" value="특상" />
            <Tally label="국제대회" value="최우수" />
            <Tally label="서울대" value="합격" />
          </div>
          <p className="relative mt-8 text-xl leading-snug font-bold tracking-[-0.02em] text-ink-900 sm:text-2xl">
            따로 떨어진 사건들이 아닙니다. 같은 주제, 같은 연구실, 같은
            지도체계에서 이어진 하나의 흐름입니다.
          </p>
        </div>
      </div>
    </section>
  );
}

function Tally({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-bold tracking-[0.08em] text-ink-900/70 uppercase">
        {label}
      </p>
      <p className="mt-1 text-3xl font-black tracking-[-0.03em] text-ink-900 sm:text-4xl">
        {value}
      </p>
    </div>
  );
}

/* ============================================================== */
/* SECTION 3 — PROBLEMS                                            */
/* ============================================================== */

function ProblemSection() {
  return (
    <section className="bg-ink-900">
      <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <ProblemBlock
          no="01"
          heading="이것은 그냥 엄마 찬스가 아닙니다 — 국가 연구 찬스 의혹입니다"
        >
          <Quoted
            text={
              <>
                <strong>“석·박사들도 SCI급 제1저자가 되는 건 힘들다.</strong>
                <br />
                <strong>연구하는 사람이라면 말이 안 되는 소리라고 할 것이다.”</strong>
              </>
            }
            cite="경상대 교수 · 시사저널 2020.03.26"
          />

          <p className="mt-8 text-base leading-relaxed text-ink-200">
            권OO 논문의 감사의 말에는 국가 연구과제 번호가 등장합니다 — 어머니
            김윤희 교수가 수행한 연구과제와 연결되는 번호입니다.
          </p>

          <DocumentMock
            title="Acknowledgement"
            sub="SCI paper (2011) — 국가 연구과제 번호 강조"
            body={
              <>
                This work was supported by KOFAC (R&E 2009),{" "}
                <mark className="rounded bg-magenta px-1.5 py-0.5 font-bold text-ink-900">
                  KOSEF (2010-0027732)
                </mark>{" "}
                and the Ministry of Knowledge Economy...
              </>
            }
          />

          <p className="mt-6 text-base leading-relaxed text-ink-200">
            논문에 국가 과제번호가 적혀 있다는 것은 가볍지 않습니다. 이 논문이
            개인 취미나 방과후 체험이 아니라,{" "}
            <strong className="text-ink-50">
              국가 연구의 성과 체계 안에 놓여 있었다
            </strong>
            는 뜻입니다.
          </p>

          <p className="mt-4 text-base leading-relaxed text-ink-100">
            국가 연구비는 가족의 입시 사다리가 아닙니다.
            <br />
            대학 연구실은 특정 집 아이의 스펙 제작소가 아닙니다.
          </p>

          <div className="mt-8 rounded-2xl border border-ink-700 bg-ink-800/40 p-6 sm:p-7">
            <p className="text-sm font-bold tracking-[0.08em] text-magenta uppercase">
              그래서 묻습니다
            </p>
            <ul className="mt-4 space-y-2 text-base leading-relaxed text-ink-100">
              <li>· 권OO은 실제로 어떤 실험을 했습니까.</li>
              <li>· 언제, 어디서, 얼마나 했습니까.</li>
              <li>· 연구노트는 있습니까. 기여도 판단 자료는 있습니까.</li>
              <li>· 국가 연구성과로 보고된 항목과 권OO의 이름은 어떻게 연결됩니까.</li>
            </ul>
            <p className="mt-5 text-base font-bold text-ink-50">
              자료가 있다면 공개하십시오. 말이 아니라 문서로 보여주십시오.
            </p>
          </div>
        </ProblemBlock>

        <ProblemBlock no="02" heading="어머니가 교신저자, 아들이 제1저자">
          <p className="text-base leading-relaxed text-ink-200">
            교신저자는 보통 연구를 책임지고 논문을 이끄는 사람입니다 — 어머니
            김윤희 교수. 제1저자는 보통 연구의 핵심 기여자로 표시되는 사람입니다
            — 아들 권OO.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <AuthorChip
              role="제1저자 (First Author)"
              who="권OO"
              meta="고등학생 · 경남과학고"
              tone="magenta"
            />
            <AuthorChip
              role="교신저자 (Corresponding)"
              who="김윤희"
              meta="어머니 · 지도교수"
              tone="ink"
            />
          </div>

          <p className="mt-6 text-base leading-relaxed text-ink-200">
            어머니의 연구실. 어머니의 연구 분야. 어머니가 교신저자인 논문. 그
            논문의 맨 앞에는 고등학생 아들의 이름.
          </p>

          <div className="mt-7 rounded-2xl border border-ink-700 bg-ink-800/40 p-6 sm:p-7">
            <p className="text-sm font-bold tracking-[0.08em] text-magenta uppercase">
              도민은 물을 권리가 있습니다
            </p>
            <ul className="mt-4 space-y-2 text-base leading-relaxed text-ink-100">
              <li>· 정말 권OO이 연구를 주도했습니까.</li>
              <li>· 대학원생·연구원보다 더 큰 기여를 했습니까.</li>
              <li>· 그 판단은 누가 했습니까.</li>
              <li>· 그 판단 자료는 남아 있습니까.</li>
            </ul>
            <p className="mt-5 text-base font-bold text-ink-50">
              ‘문제없다’는 말은 답이 아닙니다. 공개된 검증자료만 답입니다.
            </p>
          </div>
        </ProblemBlock>

        <ProblemBlock no="03" heading="‘논문은 입시에 안 썼다’고 끝낼 수 있습니까">
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
            논문 파일을 냈느냐만 문제가 아닙니다. 그 논문과 같은 주제에서 나온{" "}
            <strong className="text-ink-50">
              R&E 보고서·특허·전국대회·국제대회 수상이 입시에 어떻게 쓰였는지
            </strong>
            가 핵심입니다.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <SmallNote text="논문은 안 냈지만 R&E 보고서는 냈다." />
            <SmallNote text="논문은 안 냈지만 수상 실적은 있었다." />
            <SmallNote text="논문은 안 냈지만 생활기록부·자소서에는 연구 경험이 들어갔다." />
          </div>

          <div className="mt-8 rounded-2xl border-l-4 border-magenta bg-ink-800/40 px-6 py-5">
            <p className="text-base leading-relaxed text-ink-100">
              경남교육연대는 요구합니다.
            </p>
            <p className="mt-3 text-lg leading-snug font-bold text-ink-50 sm:text-xl">
              “검증이 완료됐다면 서울대 입학 서류 일체와 검증 결과 문서를 도민
              앞에 즉각 공개하라.”
            </p>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-magenta/15 px-4 py-2 text-sm font-bold text-magenta">
            <ShieldAlert className="h-4 w-4" />
            권순기는 아직 이 문서를 도민 앞에 공개하지 않았습니다.
          </p>
        </ProblemBlock>
      </div>
    </section>
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
    <article className="grid gap-8 border-t border-ink-800 pt-12 first:border-t-0 first:pt-0 sm:grid-cols-[140px_1fr] sm:gap-12 sm:pt-16">
      <div className="sm:sticky sm:top-24 sm:self-start">
        <p className="text-xs font-bold tracking-[0.12em] text-magenta uppercase">
          Issue
        </p>
        <p className="mt-1 text-7xl leading-none font-black tracking-[-0.04em] text-magenta sm:text-8xl">
          {no}
        </p>
      </div>
      <div className="min-w-0">
        <h3 className="text-2xl leading-tight font-bold tracking-[-0.02em] text-ink-50 sm:text-4xl">
          {heading}
        </h3>
        <div className="mt-8">{children}</div>
      </div>
    </article>
  );
}

function DocumentMock({
  title,
  sub,
  body,
}: {
  title: string;
  sub: string;
  body: React.ReactNode;
}) {
  return (
    <figure className="mt-5 overflow-hidden rounded-2xl border border-ink-700 bg-ink-950 shadow-2xl">
      <div className="flex items-center justify-between border-b border-ink-700 px-5 py-3">
        <p className="text-xs font-bold tracking-[0.08em] text-ink-400 uppercase">
          {title}
        </p>
        <p className="text-xs text-ink-500">{sub}</p>
      </div>
      <div className="p-6 sm:p-8 font-mono text-sm leading-relaxed text-ink-100 sm:text-base">
        {body}
      </div>
    </figure>
  );
}

function SmallNote({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-ink-700 bg-ink-800/40 p-4 text-sm leading-relaxed text-ink-200">
      {text}
    </div>
  );
}

function AuthorChip({
  role,
  who,
  meta,
  tone,
}: {
  role: string;
  who: string;
  meta: string;
  tone: "magenta" | "ink";
}) {
  const isM = tone === "magenta";
  return (
    <div
      className={`rounded-2xl border p-5 ${
        isM ? "border-magenta/40 bg-magenta/[0.1]" : "border-ink-700 bg-ink-800/40"
      }`}
    >
      <p className={`text-xs font-bold tracking-[0.08em] uppercase ${isM ? "text-magenta" : "text-ink-400"}`}>
        {role}
      </p>
      <p className="mt-2 flex items-baseline gap-2 text-2xl font-bold tracking-[-0.025em] text-ink-50">
        <UserRound className="h-5 w-5 self-center text-ink-400" />
        {who}
      </p>
      <p className="mt-1 text-sm text-ink-300">{meta}</p>
    </div>
  );
}

function Quoted({ text, cite }: { text: React.ReactNode; cite: string }) {
  return (
    <figure className="rounded-2xl border-l-4 border-magenta bg-ink-800/40 px-6 py-6 sm:px-8 sm:py-8">
      <Quote aria-hidden className="h-6 w-6 text-magenta/60" />
      <blockquote className="mt-3 text-lg leading-relaxed text-ink-50 sm:text-xl">
        {text}
      </blockquote>
      <figcaption className="mt-4 text-xs text-ink-400 sm:text-sm">— {cite}</figcaption>
    </figure>
  );
}

/* ============================================================== */
/* SECTION 4 — STATEMENTS                                          */
/* ============================================================== */

function StatementSection() {
  return (
    <section className="bg-ink-950">
      <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-center gap-8 rounded-3xl border border-ink-700 bg-ink-900/60 p-7 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-10">
          <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-magenta/30 ring-offset-4 ring-offset-ink-900 sm:mx-0 sm:h-32 sm:w-32">
            <img
              src="/assets/photo/kwon-profile.webp"
              alt="권순기 프로필"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-magenta uppercase">
              Statements
            </p>
            <h3 className="mt-2 text-2xl leading-tight font-bold tracking-[-0.02em] text-ink-50 sm:text-3xl">
              권순기는 토론회·인터뷰에서 이렇게 말했습니다.
              <br />
              하나씩 사실과 비교해 보겠습니다.
            </h3>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {STATEMENTS.map((s, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-3xl border border-ink-700 bg-ink-900"
            >
              <div className="grid md:grid-cols-[5fr_7fr]">
                <div className="border-b border-ink-700 p-7 sm:p-10 md:border-r md:border-b-0">
                  <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-ink-400 uppercase">
                    <Quote className="h-4 w-4" />
                    Said · {String(i + 1).padStart(2, "0")}
                  </p>
                  <blockquote className="mt-4 text-xl leading-snug font-bold text-ink-100 sm:text-2xl">
                    “{s.said}”
                  </blockquote>
                  {s.source && (
                    <p className="mt-3 text-xs text-ink-500">— {s.source}</p>
                  )}
                </div>
                <div className="bg-magenta/[0.06] p-7 sm:p-10">
                  <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-magenta uppercase">
                    <ShieldAlert className="h-4 w-4" />
                    Fact · {String(i + 1).padStart(2, "0")}
                  </p>
                  <h4 className="mt-3 text-xl leading-tight font-bold tracking-[-0.02em] text-ink-50 sm:text-2xl">
                    {s.factTitle}
                  </h4>
                  <div className="mt-4 space-y-3 text-base leading-relaxed text-ink-100">
                    {s.factBody}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================== */
/* DEMAND — 시민의 요구 (v7 신설)                                   */
/* ============================================================== */

function DemandSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-magenta/20 blur-[120px]"
      />
      <div className="relative mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-magenta/40 bg-magenta/10 px-4 py-1.5 text-xs font-bold tracking-[0.1em] text-magenta uppercase">
              <FileCheck className="h-4 w-4" />
              시민의 요구
            </p>
            <h2 className="mt-5 text-3xl leading-tight font-bold tracking-[-0.025em] text-ink-50 sm:text-5xl">
              권순기 후보는
              <br />
              아래 자료를
              <br />
              <span className="text-magenta">공개하십시오.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-300">
              없으면 없다고 하십시오. 있으면 공개하십시오.{" "}
              <strong className="text-ink-50">
                검증이 끝났다면 공개가 두려울 이유가 없습니다.
              </strong>
            </p>
          </div>

          <ol className="space-y-3">
            {DEMANDS.map((d, i) => (
              <li
                key={d}
                className="flex gap-5 rounded-2xl border border-ink-700 bg-ink-800/40 p-5 sm:p-6"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-magenta text-sm font-black tracking-[-0.02em] text-ink-900 sm:h-10 sm:w-10 sm:text-base">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-relaxed text-ink-100 sm:text-lg">
                  {d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== */
/* SECTION 5 — REPETITION                                          */
/* ============================================================== */

function RepetitionSection() {
  return (
    <section className="bg-ink-900">
      <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <article className="rounded-3xl border border-ink-700 bg-ink-800/40 p-7 sm:p-8">
            <p className="text-sm font-bold tracking-[0.1em] text-ink-400 uppercase">
              2005
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink-50">
              경남과학고 학생들의 SCI 논문 사례
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-300">
              당시 보도에는 권순기·김윤희가 학생들을 지도한 것으로 등장합니다.
              일부 학생들은 이후 서울대·KAIST 등에 합격했습니다.
            </p>
            <blockquote className="mt-5 rounded-2xl border-l-4 border-magenta bg-ink-900/50 px-5 py-4 text-sm leading-relaxed text-ink-100">
              “경상대학교 과학교육과 교수인 김○○ 군의 아버지를 통해 권 교수의
              지도를 받을 수 있게 됐다.”
              <span className="mt-2 block text-xs text-ink-500">
                — 오마이뉴스, 2005.02.01
              </span>
            </blockquote>
          </article>

          <div
            aria-hidden
            className="flex flex-col items-center justify-center gap-3 self-center text-magenta lg:py-12"
          >
            <ArrowRight className="hidden h-12 w-12 lg:block" />
            <ArrowRight className="block h-10 w-10 rotate-90 lg:hidden" />
            <p className="text-center text-xs font-bold tracking-[0.12em] text-magenta uppercase">
              6년 후 반복
            </p>
          </div>

          <article className="rounded-3xl border border-magenta/40 bg-magenta/[0.08] p-7 sm:p-8">
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

        <div className="mt-12 rounded-3xl border border-ink-700 bg-ink-800/40 p-7 sm:p-10">
          <p className="text-sm font-bold tracking-[0.1em] text-magenta uppercase">
            그 말은 변명이 아니라 더 큰 질문을 만듭니다
          </p>
          <ul className="mt-5 space-y-2.5 text-base leading-relaxed text-ink-100 sm:text-lg">
            <li>· 그 선례는 누구에게 열렸습니까.</li>
            <li>· 그 연구실 문은 평범한 학생들에게도 같은 방식으로 열렸습니까.</li>
            <li>· 그 과정의 기준과 기록은 남아 있습니까.</li>
            <li>· 그리고 6년 뒤, 왜 비슷한 구조가 권순기의 아들에게서 다시 나타났습니까.</li>
          </ul>
          <p className="mt-7 text-lg leading-snug font-bold tracking-[-0.01em] text-ink-50 sm:text-xl">
            반복되는 일은 우연이라고 부르기 어렵습니다. 특히 그 반복이 늘 힘
            있는 사람들의 자녀에게 유리하게 작동할 때는 더 그렇습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== */
/* CTA — RELAY                                                     */
/* ============================================================== */

function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden border-y border-ink-800 bg-ink-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/assets/photo/protest.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-magenta/80 mix-blend-multiply"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-tr from-magenta/95 via-magenta/85 to-magenta/60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.12] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 24px, rgba(0,0,0,0.18) 24px 25px)",
        }}
      />
      <div className="relative mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink-900 px-4 py-1.5 text-xs font-bold tracking-[0.1em] text-ink-900 uppercase">
              <Megaphone className="h-4 w-4" />
              Action — 릴레이 1인시위
            </p>
            <h2 className="mt-6 text-[clamp(32px,5.5vw,68px)] leading-[1.02] font-bold tracking-[-0.03em] text-ink-900">
              권순기는 도민의
              <br />
              질문에 똑바로
              <br />
              대답해야 합니다.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-900/90 sm:text-xl">
              우리가 요구하는 것은 간단합니다.{" "}
              <strong>셀프 감사가 아니었다면, 문서를 공개하십시오.</strong>{" "}
              자료를 내놓지 않는 침묵은 답변이 아닙니다. ‘문제없다’는 말만
              반복하는 것은 검증이 아닙니다.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-900/85">
              혼자여도 됩니다. 5분이어도 됩니다. A4 한 장에 인쇄하고 규격에 맞게
              잘라 쓰면 충분합니다.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/fair"
              className="group inline-flex items-center justify-between gap-3 rounded-2xl bg-ink-900 px-7 py-5 text-base font-bold text-ink-50 transition-transform hover:-translate-y-0.5 sm:text-lg"
            >
              <span className="inline-flex items-center gap-3">
                <Megaphone className="h-5 w-5 text-magenta" />
                릴레이 1인시위 참여하기
              </span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.share) {
                  void navigator.share({
                    title: "엄마 연구실에서 만든 스펙, 권순기 후보는 답해야 합니다",
                    url: window.location.href,
                  });
                } else if (typeof navigator !== "undefined" && navigator.clipboard) {
                  void navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="inline-flex items-center justify-between gap-3 rounded-2xl border-2 border-ink-900 px-7 py-5 text-base font-bold text-ink-900 transition-colors hover:bg-ink-900 hover:text-ink-50 sm:text-lg"
            >
              <span className="inline-flex items-center gap-3">
                <ArrowUpRight className="h-5 w-5" />이 페이지 공유하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== */
/* SECTION 7 — CLOSING                                             */
/* ============================================================== */

function ClosingSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/assets/photo/study.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-ink-950/95 via-ink-950/92 to-ink-950/80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #ff2d92 0%, transparent 40%), radial-gradient(circle at 80% 70%, #ff2d92 0%, transparent 35%)",
        }}
      />
      <div className="relative mx-auto max-w-screen-xl px-5 py-24 sm:px-6 sm:py-36 lg:px-8">
        <p className="text-sm font-bold tracking-[0.14em] text-magenta uppercase">
          Closing
        </p>

        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-ink-200 sm:text-xl">
          <p>
            경남에는 오늘도{" "}
            <strong className="text-ink-50">
              새벽까지 책상 앞에 앉아 있는 아이들
            </strong>
            이 있습니다.
          </p>
          <p>
            부모 연구실도, 국가과제도, 교수 인맥도 없이 자기 힘으로 버티는
            아이들이 있습니다.
          </p>
        </div>

        <p className="mt-10 max-w-3xl text-base leading-relaxed text-ink-300 sm:text-lg">
          그 아이들에게 우리는 매일 말합니다. 공정하게 노력하면 된다고. 실력으로
          평가받을 수 있다고. 부모가 누구인지보다 네가 무엇을 했는지가
          중요하다고.
        </p>

        <p className="mt-10 max-w-3xl text-lg leading-snug font-bold tracking-[-0.01em] text-ink-100 sm:text-xl">
          그렇다면 교육감 후보에게도 같은 말을 해야 합니다.
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          <ClosingPoint
            n="01"
            text="당신 아들의 연구기회는 어떻게 열렸습니까."
          />
          <ClosingPoint
            n="02"
            text="그 기회는 다른 아이들에게도 열려 있었습니까."
          />
          <ClosingPoint
            n="03"
            text="서울대 입시에 그 성과는 어떻게 설명됐습니까."
          />
          <ClosingPoint
            n="04"
            text="검증이 끝났다면 왜 문서를 공개하지 않습니까."
          />
        </ul>

        <p className="mt-16 text-base text-ink-400">학부모님들이 묻습니다.</p>

        <h3 className="mt-4 text-[clamp(36px,7vw,84px)] leading-[1] font-bold tracking-[-0.035em] text-ink-50">
          당신 아들의 기회,
          <br />
          <span className="text-magenta">우리 아이도</span>
          <br />
          <span className="text-magenta">받을 수 있습니까?</span>
        </h3>
      </div>
    </section>
  );
}

function ClosingPoint({ n, text }: { n: string; text: string }) {
  return (
    <li className="rounded-3xl border border-ink-700 bg-ink-900/60 p-6 sm:p-7">
      <p className="text-3xl font-black tracking-[-0.04em] text-magenta">{n}</p>
      <p className="mt-3 text-base leading-relaxed text-ink-100 sm:text-lg">
        {text}
      </p>
    </li>
  );
}

/* ============================================================== */
/* TIP                                                             */
/* ============================================================== */

function TipSection() {
  return (
    <section id="tip" className="bg-ink-900 scroll-mt-24">
      <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-ink-700 bg-ink-800/40">
          <div className="grid items-stretch md:grid-cols-[1fr_auto]">
            <div className="p-7 sm:p-10">
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-magenta uppercase">
                <Mail className="h-4 w-4" />
                Tip-off
              </p>
              <h2 className="mt-3 text-2xl leading-tight font-bold tracking-[-0.02em] text-ink-50 sm:text-4xl">
                알고 계신 것이 있습니까.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-300">
                이 페이지에 담기지 않은 사실을 알고 계신다면 제보해 주십시오.
                <br />
                제보자의 신원은 보호됩니다. 확인되지 않은 소문은 쓰지 않겠습니다.
                문서·사진·당시 기록·관계자 증언처럼 검증 가능한 자료를 기다립니다.
              </p>
            </div>
            <div className="flex items-center justify-end border-t border-ink-700 bg-ink-900 p-7 sm:p-10 md:border-t-0 md:border-l">
              <Link
                to="/report"
                className="inline-flex items-center gap-2 rounded-full bg-magenta px-7 py-4 text-base font-bold text-ink-900 transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-5 w-5" />
                제보 안내 보기
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== */
/* SOURCES                                                         */
/* ============================================================== */

function SourcesSection() {
  return (
    <section className="bg-ink-950">
      <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex items-baseline gap-3">
          <ImageIcon aria-hidden className="hidden h-5 w-5 text-magenta" />
          <p className="text-xs font-bold tracking-[0.14em] text-magenta uppercase">
            Sources
          </p>
        </div>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink-50 sm:text-3xl">
          근거 자료
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-400">
          이 페이지의 모든 주장은 공개된 1차 자료와 보도에 근거합니다. 각
          링크에서 직접 확인하실 수 있습니다.
        </p>

        <ul className="mt-8 grid gap-2 sm:grid-cols-2">
          {SOURCES.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-2xl border border-ink-800 bg-ink-900/60 px-5 py-4 text-base text-ink-100 transition-colors hover:border-magenta/40 hover:bg-magenta/[0.06] hover:text-ink-50"
              >
                <span className="font-bold">{s.label}</span>
                <ExternalLink aria-hidden className="h-4 w-4 shrink-0 text-ink-500" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
