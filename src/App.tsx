import { useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { Loader } from "./components/Loader";
import { Nav } from "./components/Nav";
import { Hero } from "./sections/Hero";
import { Marquee } from "./components/Marquee";
import { Work } from "./sections/Work";
import { Philosophy } from "./sections/Philosophy";
import { Services } from "./sections/Services";
import { Process } from "./sections/Process";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { CinematicScene } from "./components/CinematicScene";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <CinematicScene />

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
          <Hero />
          <Marquee />
          <Work />
          <Philosophy />
          <Services />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

