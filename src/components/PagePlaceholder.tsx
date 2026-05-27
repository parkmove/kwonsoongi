import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Seo from "./Seo";

type Props = {
  title: string;
  description?: string;
  path?: string;
  children?: ReactNode;
  noindex?: boolean;
};

export default function PagePlaceholder({
  title,
  description,
  path,
  children,
  noindex,
}: Props) {
  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        noindex={noindex}
      />
      <section className="mx-auto max-w-screen-xl px-5 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8">
        <p className="text-base font-bold text-magenta">
          {title}
        </p>
        <h1 className="mt-3 text-4xl leading-tight font-bold text-ink-900 sm:text-6xl">
          {description ?? "준비 중입니다."}
        </h1>

        <div className="mt-12 max-w-2xl text-lg leading-relaxed text-ink-500">
          {children ?? (
            <p>
              곧 안내드리겠습니다. 그 사이 정책공약을 먼저 살펴봐 주십시오.
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/manifesto"
            className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-base font-bold text-white hover:bg-ink-700"
          >
            정책공약 보기
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink-900 px-6 py-3 text-base font-bold text-ink-900 hover:bg-ink-900 hover:text-white"
          >
            처음으로
          </Link>
        </div>
      </section>
    </>
  );
}
