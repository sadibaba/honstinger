import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, Suspense, lazy } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

/* ── Lazy loaded pages ─────────────────────────────────── */
const AdminLogin = lazy(() => import("./components/AdminLogin"));
const Home = lazy(() => import("./components/Home"));
const AllPosts = lazy(() => import("./components/AllPosts"));
const BlogDetail = lazy(() => import("./components/BlogDetail"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Details = lazy(() => import("./components/Details"));

const Terms = lazy(() => import("./components/legal/Terms"));
const Privacy = lazy(() => import("./components/legal/Privacy"));
const Cookies = lazy(() => import("./components/legal/Cookies"));
const Disclaimer = lazy(() => import("./components/legal/Disclaimer"));
const AcceptableUse = lazy(() => import("./components/legal/AcceptableUse"));
const DMCA = lazy(() => import("./components/legal/DMCA"));
const RefundPolicy = lazy(() => import("./components/legal/RefundPolicy"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-primary">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/admin-login";

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            <Route path="/about" element={<About />} />
            <Route path="/details" element={<Details />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/acceptable-use" element={<AcceptableUse />} />
            <Route path="/dmca" element={<DMCA />} />
            <Route path="/refund" element={<RefundPolicy />} />

            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Suspense>
      </AnimatePresence>

      {!isAuthPage && <Footer />}
      {!isAuthPage && <CookieBanner />}
    </>
  );
};

function App() {
  useEffect(() => {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    if (!cursorDot || !cursorOutline) return;

    const moveCursor = (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorOutline.animate(
        { left: `${e.clientX}px`, top: `${e.clientY}px` },
        { duration: 500, fill: "forwards" }
      );
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorOutline.style.backgroundColor = "rgba(212, 161, 93, 0.2)";
        cursorOutline.style.borderColor = "var(--color-accent)";
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.backgroundColor = "transparent";
        cursorOutline.style.borderColor = "var(--color-text-secondary)";
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Cursor />
        <div className="App bg-primary text-text-primary min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;