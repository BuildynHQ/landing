import { lazy, Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import { Loader } from "./components/Loader";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";

const Work = lazy(() => import("./pages/Work"));
const Studio = lazy(() => import("./pages/Studio"));
const Services = lazy(() => import("./pages/Services"));
const Process = lazy(() => import("./pages/Process"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

const CinematicScene = lazy(() =>
  import("./components/CinematicScene").then((module) => ({
    default: module.CinematicScene,
  })),
);

function PageFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 animate-ping rounded-full bg-crimson" />
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-ink-soft">
          Loading Buildyn…
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <ScrollToTop />
      <Loader onComplete={() => setLoaded(true)} />
      {loaded ? (
        <Suspense fallback={null}>
          <CinematicScene />
        </Suspense>
      ) : null}

      {/* Atmospheric overlays */}
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />

      <div
        className={`relative flex min-h-screen flex-col transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/work"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Work />
                </Suspense>
              }
            />
            <Route
              path="/studio"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Studio />
                </Suspense>
              }
            />
            <Route path="/philosophy" element={<Navigate to="/studio" replace />} />
            <Route
              path="/services"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Services />
                </Suspense>
              }
            />
            <Route
              path="/process"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Process />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <Suspense fallback={<PageFallback />}>
                  <PrivacyPolicy />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
