import Seo from "../components/Seo";

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. 개인정보의 수집 항목과 방법",
    body: [
      "권순기(이하 “운영자”)가 운영하는 웹사이트 권순기.kr(이하 “사이트”)은 별도의 회원가입 절차를 두고 있지 않습니다.",
      "사진 게시판에서는 사용자가 직접 입력한 이름과 사진 제목, 그리고 사용자가 첨부한 이미지 파일이 수집됩니다. 제보 입력 폼에서는 사용자가 입력한 텍스트와 선택적으로 첨부한 파일이 수집됩니다.",
      "사이트 접속 시 일반적인 웹 운영을 위해 IP 주소, 브라우저 종류, 접속 시간 등 비식별 접속 로그가 호스팅 서비스(Cloudflare Pages)에 의해 자동으로 기록될 수 있습니다.",
    ],
  },
  {
    title: "2. 개인정보의 이용 목적",
    body: [
      "운영자는 수집한 정보를 다음의 목적으로만 이용합니다.",
      "  ① 사진 게시판 운영 및 부적절한 게시물의 검수·관리",
      "  ② 제보 내용의 확인 및 후속 조치",
      "  ③ 관련 법령에 따른 의무 이행",
    ],
  },
  {
    title: "3. 개인정보의 보유 및 파기",
    body: [
      "수집된 정보는 수집 목적이 달성되거나 관련 법령이 정한 기간이 경과한 시점에 지체 없이 파기합니다. 전자적 파일 형태의 정보는 복구할 수 없는 방법으로 영구 삭제합니다.",
    ],
  },
  {
    title: "4. 개인정보의 제3자 제공",
    body: [
      "운영자는 이용자의 개인정보를 본 방침에 명시한 목적 범위 외에 제3자에게 제공하지 않습니다. 다만, 법령의 규정에 의하거나 수사 목적으로 법령에 정한 절차와 방법에 따라 수사기관의 요구가 있는 경우는 예외로 합니다.",
    ],
  },
  {
    title: "5. 이용자의 권리",
    body: [
      "이용자는 본인의 개인정보 또는 게시물에 대한 열람·정정·삭제를 운영자에게 요청할 수 있습니다. 요청은 아래 연락처로 보내 주십시오.",
    ],
  },
  {
    title: "6. 쿠키와 분석 도구",
    body: [
      "사이트는 별도의 광고용 추적 쿠키를 사용하지 않습니다. 향후 방문자 통계를 위해 분석 도구를 도입하는 경우 본 방침을 갱신하여 사전에 공지합니다.",
    ],
  },
  {
    title: "7. 개인정보 보호책임자",
    body: [
      "  · 운영주체: 권순기",
      "  · 개인정보 보호책임자: (담당자 이름)",
      "  · 연락처: (전화번호)",
      "  · 이메일: (이메일 주소)",
    ],
  },
  {
    title: "8. 방침의 변경",
    body: [
      "본 개인정보처리방침은 법령 및 운영 정책의 변경에 따라 개정될 수 있으며, 변경 시 변경일자와 변경 내용을 사이트에 사전 공지합니다.",
    ],
  },
  {
    title: "부칙",
    body: ["이 방침은 2026년 5월 27일부터 시행합니다."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="개인정보처리방침"
        description="권순기.kr 개인정보처리방침"
        path="/privacy"
      />
      <section className="mx-auto max-w-screen-md px-5 pt-24 pb-32 sm:px-6 sm:pt-32 lg:px-8">
        <p className="text-base font-bold text-magenta">
          개인정보처리방침
        </p>
        <h1 className="mt-3 text-3xl leading-tight font-bold tracking-[-0.025em] text-ink-50 sm:text-5xl">
          개인정보처리방침
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
