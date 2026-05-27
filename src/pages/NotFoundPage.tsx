import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFoundPage() {
  return (
    <>
      <Seo title="페이지를 찾을 수 없습니다" path="/404" noindex />
      <section className="mx-auto max-w-screen-xl px-5 pt-24 pb-32 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-bold text-magenta">404</p>
        <h1 className="mt-3 text-4xl leading-tight font-bold tracking-[-0.025em] text-ink-50 sm:text-6xl">
          찾으시는 페이지가 없습니다.
        </h1>
        <p className="mt-5 text-lg text-ink-300">
          주소를 다시 확인해 주십시오.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-magenta px-7 py-4 text-base font-bold text-ink-900 hover:-translate-y-0.5"
        >
          처음으로
        </Link>
      </section>
    </>
  );
}
