// Google Analytics 4 — 환경변수 VITE_GA_ID 로 측정 ID 받음.
//   · 미설정 시 no-op (개발 환경 등에서 GA 호출 X)
//   · GA 스크립트도 첫 호출 시 동적으로 head 에 주입 (없으면 네트워크 요청 자체가 없음)

const GA_ID = import.meta.env.VITE_GA_ID ?? "";
export const GA_ENABLED = GA_ID.length > 0;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

let bootstrapped = false;

function bootstrap() {
  if (bootstrapped || typeof window === "undefined" || !GA_ENABLED) return;
  bootstrapped = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  const gtag: Gtag = (...args) => {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, { send_page_view: false });
}

export function trackPageView(path: string, title?: string) {
  if (!GA_ENABLED) return;
  bootstrap();
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
    send_to: GA_ID,
  });
}
