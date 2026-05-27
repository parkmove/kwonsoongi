import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import Nav from "./Nav";
import Footer from "./Footer";
import { trackPageView } from "../lib/analytics";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // GA4: SPA 라우트 변경 시 page_view 전송 (document.title이 갱신될 틈을 주기 위해 한 틱 뒤)
    const id = window.setTimeout(() => trackPageView(pathname), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.2,
  });

  return (
    <div className="flex min-h-dvh flex-col">
      <motion.div
        aria-hidden
        className="fixed top-0 right-0 left-0 z-50 h-[3px] origin-left bg-magenta"
        style={{ scaleX: progress }}
      />
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
