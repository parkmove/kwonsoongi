import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-900">
      <div className="mx-auto max-w-screen-xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="text-2xl font-black tracking-[-0.03em] text-ink-50">
              권순기
            </p>
            <p className="mt-3 text-base text-ink-400">
              경남교육감 후보 권순기를 검증합니다.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end md:text-right">
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-base font-bold md:justify-end">
              <Link to="/terms" className="text-ink-200 hover:text-ink-50">
                이용약관
              </Link>
              <Link to="/privacy" className="text-ink-200 hover:text-ink-50">
                개인정보처리방침
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-800 pt-6 text-sm text-ink-500">
          © {new Date().getFullYear()} 권순기.
        </div>
      </div>
    </footer>
  );
}
