import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

interface RouteSEO {
  title: string;
  description: string;
  canonical: string;
}

const DEFAULT_SEO: RouteSEO = {
  title: "Buildyn | Digital Products, SaaS Platforms & Custom Software Systems",
  description:
    "Buildyn designs and engineers complete digital products — from marketing websites and landing pages to full web applications, SaaS platforms, admin dashboards, internal tools, and backend systems.",
  canonical: "https://buildyn.in/",
};

const ROUTE_SEO: Record<string, RouteSEO> = {
  "/": DEFAULT_SEO,
  "/work": {
    title: "Selected Work & Engineering Flagships | Buildyn",
    description:
      "Explore curated digital products, full-stack web applications, SaaS architectures, and internal tools engineered by Buildyn and founder Pushkar Mhatre.",
    canonical: "https://buildyn.in/work",
  },
  "/studio": {
    title: "Studio & Engineering Philosophy | Buildyn",
    description:
      "Inside Buildyn: Zero templates, sub-second performance, bespoke architecture, and direct founder-to-engineer delivery led by Pushkar Mhatre.",
    canonical: "https://buildyn.in/studio",
  },
  "/services": {
    title: "Capabilities & Architectural Services | Buildyn",
    description:
      "Full-stack web apps, SaaS platforms, high-performance marketing flagships, admin dashboards, design systems, and custom backend systems built from scratch.",
    canonical: "https://buildyn.in/services",
  },
  "/process": {
    title: "Engineering Process & Delivery Protocol | Buildyn",
    description:
      "From architectural blueprint and UI ergonomics to production deployment and monitoring. How Buildyn delivers software with speed and precision.",
    canonical: "https://buildyn.in/process",
  },
  "/contact": {
    title: "Start a Project | Buildyn",
    description:
      "Initiate an engineering sprint with Buildyn. Direct access to founder Pushkar Mhatre with a 48-hour response guarantee.",
    canonical: "https://buildyn.in/contact",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Buildyn",
    description:
      "Privacy policy and data governance practices of Buildyn Studio and buildyn.in.",
    canonical: "https://buildyn.in/privacy-policy",
  },
};

function updateMetaTag(selector: string, attr: "content" | "href", value: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute(attr, value);
  }
}

export function SEOTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const seo = ROUTE_SEO[pathname] || {
      title: `${pathname.replace(/^\//, "").charAt(0).toUpperCase() + pathname.slice(2)} | Buildyn`,
      description: DEFAULT_SEO.description,
      canonical: `https://buildyn.in${pathname}`,
    };

    // Update document title
    document.title = seo.title;

    // Update standard meta tags
    updateMetaTag('meta[name="description"]', "content", seo.description);
    updateMetaTag('meta[name="title"]', "content", seo.title);

    // Update OpenGraph
    updateMetaTag('meta[property="og:title"]', "content", seo.title);
    updateMetaTag('meta[property="og:description"]', "content", seo.description);
    updateMetaTag('meta[property="og:url"]', "content", seo.canonical);

    // Update Twitter Card
    updateMetaTag('meta[name="twitter:title"]', "content", seo.title);
    updateMetaTag('meta[name="twitter:description"]', "content", seo.description);
    updateMetaTag('meta[name="twitter:url"]', "content", seo.canonical);

    // Update Canonical link
    updateMetaTag('link[rel="canonical"]', "href", seo.canonical);

    // Track SPA route change in GA4
    try {
      ReactGA.send({
        hitType: "pageview",
        page: pathname + search,
        title: seo.title,
      });
    } catch {
      // Ignore if adblocker or offline
    }
  }, [pathname, search]);

  return null;
}

