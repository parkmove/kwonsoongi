import Seo from "../components/Seo";

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "제1조 (목적)",
    body: [
      "이 약관은 권순기(이하 “운영자”)가 운영하는 웹사이트 권순기.kr(이하 “사이트”)의 이용과 관련하여 운영자와 이용자의 권리·의무 및 책임사항, 그 밖의 필요한 사항을 규정하는 것을 목적으로 합니다.",
    ],
  },
  {
    title: "제2조 (용어의 정의)",
    body: [
      "1. “사이트”란 운영자가 제공하는 https://권순기.kr 도메인의 웹사이트를 말합니다.",
      "2. “이용자”란 사이트에 접속하여 이 약관에 따라 사이트가 제공하는 정보를 이용하는 모든 자를 말합니다.",
      "3. “게시물”이란 이용자가 사이트의 사진 게시판 또는 제보 입력 폼을 통해 제출한 글, 사진, 영상 등 일체의 정보를 말합니다.",
    ],
  },
  {
    title: "제3조 (약관의 효력 및 변경)",
    body: [
      "1. 이 약관은 사이트 화면에 게시함으로써 효력이 발생합니다.",
      "2. 운영자는 관련 법령을 위반하지 않는 범위에서 이 약관을 개정할 수 있으며, 약관을 개정할 경우에는 적용일자와 개정사유를 명시하여 사이트에 공지합니다.",
    ],
  },
  {
    title: "제4조 (서비스의 제공)",
    body: [
      "1. 사이트는 다음 각 호의 서비스를 제공합니다.",
      "  ① 사이트 운영자의 소개",
      "  ② 사진 게시판 — 이용자가 사진과 한 줄 제목을 올릴 수 있는 공간",
      "  ③ 제보 입력 — 이용자가 제보를 비공개로 전달할 수 있는 폼",
      "2. 운영자는 사이트의 기획·운영상 필요에 따라 서비스의 내용을 변경할 수 있으며, 변경 사항은 사이트에 공지합니다.",
    ],
  },
  {
    title: "제5조 (이용자의 의무)",
    body: [
      "이용자는 다음 행위를 하여서는 안 됩니다.",
      "  ① 타인의 정보를 도용하는 행위",
      "  ② 사이트에 게시된 정보를 무단으로 변경하거나 사이트의 정상적인 운영을 방해하는 행위",
      "  ③ 운영자 또는 제3자의 명예를 훼손하거나 권리를 침해하는 행위",
      "  ④ 관련 법령에 위반되는 행위",
    ],
  },
  {
    title: "제6조 (게시물의 관리)",
    body: [
      "1. 사진 게시판에 올라온 게시물은 운영자의 검토를 거쳐 공개됩니다.",
      "2. 다음에 해당하는 게시물은 사전 통지 없이 비공개·삭제될 수 있습니다.",
      "  ① 음란·폭력·차별 등 공서양속에 반하는 내용",
      "  ② 타인의 초상권·저작권·명예를 침해하는 내용",
      "  ③ 광고·홍보·스팸성 내용",
      "  ④ 관련 법령에 위반되는 내용",
    ],
  },
  {
    title: "제7조 (책임의 한계)",
    body: [
      "1. 운영자는 천재지변·통신장애·외부 서비스 장애 등 불가항력 사유로 사이트를 제공할 수 없는 경우 책임이 면제됩니다.",
      "2. 사이트가 연결한 외부 사이트에서 발생한 사항에 대하여 운영자는 별도의 책임을 지지 않습니다.",
      "3. 이용자가 사이트에 게시한 정보의 신뢰도·정확성에 대한 책임은 해당 이용자에게 있습니다.",
    ],
  },
  {
    title: "제8조 (준거법 및 관할)",
    body: [
      "이 약관과 관련된 분쟁은 대한민국 법을 준거법으로 하며, 분쟁이 발생할 경우 민사소송법상의 관할 법원에서 해결합니다.",
    ],
  },
  {
    title: "부칙",
    body: ["이 약관은 2026년 5월 27일부터 시행합니다."],
  },
];

export default function TermsPage() {
  return (
    <>
      <Seo
        title="이용약관"
        description="권순기.kr 이용약관"
        path="/terms"
      />
      <section className="mx-auto max-w-screen-md px-5 pt-24 pb-32 sm:px-6 sm:pt-32 lg:px-8">
        <p className="text-base font-bold text-magenta">이용약관</p>
        <h1 className="mt-3 text-3xl leading-tight font-bold tracking-[-0.025em] text-ink-50 sm:text-5xl">
          이용약관
        </h1>
        <p className="mt-6 text-base text-ink-400">시행일: 2026년 5월 27일</p>

        <div className="mt-12 space-y-12">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl leading-snug font-bold tracking-[-0.02em] text-ink-50 sm:text-2xl">
                {s.title}
              </h2>
              <div className="mt-4 space-y-3 text-base leading-[1.85] text-ink-200 sm:text-lg">
                {s.body.map((p, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
