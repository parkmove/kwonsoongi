import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { trackPageView } from "../lib/analytics";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = window.setTimeout(() => trackPageView(pathname), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <div className="flex min-h-dvh flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
