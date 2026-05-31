import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import { Loader } from "./components/Loader";
import { Nav } from "./components/Nav";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const CinematicScene = lazy(() =>
  import("./components/CinematicScene").then((module) => ({
    default: module.CinematicScene,
  })),
);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      {loaded ? (
        <Suspense fallback={null}>
          <CinematicScene />
        </Suspense>
      ) : null}

      {/* atmospheric overlays */}
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />

      <div
        className={`relative transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
