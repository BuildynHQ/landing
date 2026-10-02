export type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  tone: string;
  liveDemo: string;
  tags?: string[];
  role?: string;
  highlight?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "WispEcho",
    category: "Full-Stack Web App · Platform",
    year: "2026",
    tone: "A high-performance real-time messaging application engineered with end-to-end security. Features ephemeral View-Once media pipelines, instant websocket state synchronization, custom authentication, and a responsive glassmorphic UI.",
    liveDemo: "https://wisp-echo.vercel.app/",
    tags: ["Full-Stack Web App", "WebSockets & APIs", "Real-Time State", "Next.js & Cloud"],
    role: "System Architecture, UI/UX Design & Full-Stack Engineering",
    highlight: "Encrypted, ephemeral real-time messaging with instant websocket state synchronization and media handling.",
  },
  {
    index: "02",
    title: "Sonder Cafe",
    category: "Digital Flagship · Web Platform",
    year: "2025",
    tone: "A bespoke spatial design portfolio and interactive architecture platform. Engineered with tactile page transitions, dynamic typographic rhythm, custom CMS content architecture, and sub-second performance.",
    liveDemo: "https://sonder-cafe.vercel.app/",
    tags: ["Interactive Flagship", "Design System", "CMS Architecture", "Performance"],
    role: "Brand Identity, Interactive Architecture & Front-End Engineering",
    highlight: "Tactile spatial design showcase, seamless transitions, and elegant typographic balance.",
  },
  {
    index: "03",
    title: "Sienvera",
    category: "E-Commerce System · Platform",
    year: "2025",
    tone: "An editorial digital commerce platform engineered for an avant-garde fashion house. Features fluid cart state synchronization, high-fidelity visual pacing, payment integration, and responsive micro-interactions.",
    liveDemo: "https://sienvera.vercel.app/",
    tags: ["E-Commerce Platform", "State Management", "UI/UX System", "Custom Front-End"],
    role: "Brand Architecture, UI/UX System & Platform Development",
    highlight: "Avant-garde visual pacing, editorial typography, and high-fashion digital presence.",
  },
];
