"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Counter from "@/components/counter";
import { figures, specialties } from "@/lib/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Palette multi-couleurs pour chacune des 22 spécialités (style Casino marquee). */
const SPECIALTY_COLORS = [
  { color: "#f43f5e", bg: "rgba(244,63,94,0.10)", border: "rgba(244,63,94,0.28)" },   // 0: Cathétérisme cardiaque
  { color: "#f97316", bg: "rgba(249,115,22,0.10)", border: "rgba(249,115,22,0.28)" },  // 1: Électroporation
  { color: "#0ea5e9", bg: "rgba(14,165,233,0.10)", border: "rgba(14,165,233,0.28)" },  // 2: Oxygénothérapie hyperbare
  { color: "#10b981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.28)" },  // 3: Réanimation polyvalente
  { color: "#eab308", bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.32)" },    // 4: Hépato-gastro-entérologie
  { color: "#8b5cf6", bg: "rgba(139,92,246,0.10)", border: "rgba(139,92,246,0.28)" },  // 5: Neurologie
  { color: "#ec4899", bg: "rgba(236,72,153,0.10)", border: "rgba(236,72,153,0.28)" },  // 6: Maladies infectieuses
  { color: "#06b6d4", bg: "rgba(6,182,212,0.10)", border: "rgba(6,182,212,0.28)" },    // 7: Pédiatrie
  { color: "#f59e0b", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.28)" },  // 8: Carcinologie – Oncologie
  { color: "#3b82f6", bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.28)" },  // 9: Maladies respiratoires
  { color: "#ef4444", bg: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.28)" },    // 10: Chirurgie cardiaque
  { color: "#e11d48", bg: "rgba(225,29,72,0.10)", border: "rgba(225,29,72,0.28)" },    // 11: Chirurgie vasculaire
  { color: "#0284c7", bg: "rgba(2,132,199,0.10)", border: "rgba(2,132,199,0.28)" },    // 12: Chirurgie thoracique
  { color: "#7c3aed", bg: "rgba(124,58,237,0.10)", border: "rgba(124,58,237,0.28)" },  // 13: Chirurgie neurologique
  { color: "#14b8a6", bg: "rgba(20,184,166,0.10)", border: "rgba(20,184,166,0.28)" },  // 14: Chirurgie orthopédique
  { color: "#d97706", bg: "rgba(217,119,6,0.10)", border: "rgba(217,119,6,0.28)" },    // 15: Chirurgie urologique
  { color: "#10b981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.28)" },  // 16: Chirurgie digestive
  { color: "#ec4899", bg: "rgba(236,72,153,0.10)", border: "rgba(236,72,153,0.28)" },  // 17: Chirurgie esthétique
  { color: "#6366f1", bg: "rgba(99,102,241,0.10)", border: "rgba(99,102,241,0.28)" },  // 18: Chirurgie maxillo-faciale
  { color: "#84cc16", bg: "rgba(132,204,22,0.12)", border: "rgba(132,204,22,0.30)" },  // 19: Chirurgie bariatrique
  { color: "#f43f5e", bg: "rgba(244,63,94,0.10)", border: "rgba(244,63,94,0.28)" },    // 20: Gynécologie
  { color: "#a855f7", bg: "rgba(168,85,247,0.10)", border: "rgba(168,85,247,0.28)" },  // 21: Obstétrique
];

/** Icônes médicales SVG vectorielles intégrées (garanties 100% affichées pour les 22 spécialités). */
function SpecialtyGlyph({ index, color }: { index: number; color: string }) {
  const idx = index % 22;
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (idx) {
    case 0:
    case 10:
      return (
        <svg {...props}>
          <path d="M19.5 12.572 12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
          <path d="M8 12h2l1.5-3 2 6 1.5-3h2" />
        </svg>
      );
    case 1:
      return (
        <svg {...props}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case 2:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
          <path d="M9 3h6" />
        </svg>
      );
    case 3:
      return (
        <svg {...props}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M6 10h2l2-4 3 8 2-4h3" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      );
    case 4:
    case 16:
      return (
        <svg {...props}>
          <path d="M10 3v4c0 2-3 3-3 6a5 5 0 0 0 10 0c0-4-3-6-3-10" />
          <path d="M14 17v4" />
        </svg>
      );
    case 5:
    case 13:
      return (
        <svg {...props}>
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z" />
        </svg>
      );
    case 6:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="5" />
          <path d="M12 2v5" />
          <path d="M12 17v5" />
          <path d="m4.93 4.93 3.54 3.54" />
          <path d="m15.54 15.54 3.54 3.54" />
          <path d="M2 12h5" />
          <path d="M17 12h5" />
          <path d="m4.93 19.07 3.54-3.54" />
          <path d="m15.54 8.46 3.54-3.54" />
        </svg>
      );
    case 7:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 10h.01" />
          <path d="M15 10h.01" />
          <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
          <path d="M12 3a2 2 0 0 1 2 2c0 1.1-.9 2-2 2" />
        </svg>
      );
    case 8:
      return (
        <svg {...props}>
          <path d="M2 15c6.667-6 13.333 0 20-6" />
          <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
          <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
          <path d="m17 6-2.5-2.5" />
          <path d="m7 18 2.5 2.5" />
        </svg>
      );
    case 9:
    case 12:
      return (
        <svg {...props}>
          <path d="M12 3v9" />
          <path d="M12 8c-3.5 0-7 2.5-7 8a3 3 0 0 0 3 3c2 0 3-1.5 3-3.5V8" />
          <path d="M12 8c3.5 0 7 2.5 7 8a3 3 0 0 1-3 3c-2 0-3-1.5-3-3.5V8" />
        </svg>
      );
    case 11:
      return (
        <svg {...props}>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    case 14:
      return (
        <svg {...props}>
          <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
        </svg>
      );
    case 15:
      return (
        <svg {...props}>
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
          <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
          <circle cx="20" cy="10" r="2" />
        </svg>
      );
    case 17:
      return (
        <svg {...props}>
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
        </svg>
      );
    case 18:
      return (
        <svg {...props}>
          <path d="M7 3C4.5 3 3 5.5 3 8.5c0 2.5 1.5 4.5 2 7 .4 2 1 5.5 2.5 5.5s2-3.5 4.5-3.5 3 3.5 4.5 3.5S18.6 17.5 19 15.5c.5-2.5 2-4.5 2-7C21 5.5 19.5 3 17 3c-2 0-3.5 1.5-5 1.5S9 3 7 3Z" />
        </svg>
      );
    case 19:
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M8 8a5.5 5.5 0 0 1 8 0" />
          <path d="m12 11 2-2" />
        </svg>
      );
    case 20:
      return (
        <svg {...props}>
          <circle cx="12" cy="9" r="6" />
          <path d="M12 15v7" />
          <path d="M9 19h6" />
        </svg>
      );
    case 21:
    default:
      return (
        <svg {...props}>
          <path d="M19.5 12.572 12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
  }
}

export default function Clinic() {
  const t = useTranslations("clinic");
  const tf = useTranslations("figures");
  const locale = useLocale() as "fr" | "ar" | "en";
  const names = specialties[locale];

  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrubTextRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDListElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Curtain Clip-Path Reveal on Photo
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.35,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      // Photo zoom-out + vertical parallax scrub
      gsap.fromTo(
        imageInnerRef.current,
        { scale: 1.24, yPercent: -8 },
        {
          scale: 1.05,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 2. Heading Reveal
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        }
      );

      // 3. Word-by-word Text Scrub Illumination
      if (scrubTextRef.current) {
        const words = scrubTextRef.current.querySelectorAll(".scrub-word");
        gsap.fromTo(
          words,
          { opacity: 0.22 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: scrubTextRef.current,
              start: "top 82%",
              end: "bottom 52%",
              scrub: 0.4,
            },
          }
        );
      }

      // 4. Architectural Stat Cells Staggered Reveal
      if (statsGridRef.current) {
        const cells = statsGridRef.current.querySelectorAll(".stat-cell");
        gsap.fromTo(
          cells,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsGridRef.current,
              start: "top 82%",
            },
          }
        );
      }

      // 5. CTA Buttons Reveal
      gsap.fromTo(
        actionsRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: actionsRef.current,
            start: "top 90%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const introWords = t("intro").split(" ");
  const qualityWords = t("quality").split(" ");

  return (
    <>
      {/* Bandeau défilant simple (Fond blanc + Logos colorés dans badge carré arrondi + Séparateur ✦) */}
      <div
        dir="ltr"
        className="group overflow-hidden border-y border-black/8 bg-white py-4 sm:py-5 select-none"
      >
        <div className="rail-track flex w-max items-center gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...names, ...names].map((name, i) => {
            const item = SPECIALTY_COLORS[i % SPECIALTY_COLORS.length];

            return (
              <span key={`${name}-${i}`} className="inline-flex items-center gap-8">
                <span
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className="inline-flex items-center gap-3.5"
                >
                  <span
                    style={{
                      backgroundColor: item.bg,
                      borderColor: item.border,
                    }}
                    className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 hover:scale-110"
                  >
                    <SpecialtyGlyph index={i} color={item.color} />
                  </span>

                  <span className="font-tanker text-base tracking-wider text-ink uppercase sm:text-lg">
                    {name}
                  </span>
                </span>

                <span
                  className="text-xs text-black/25"
                  aria-hidden="true"
                >
                  ✦
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <section
        ref={sectionRef}
        id="clinique"
        className="px-5 py-(--spacing-section) sm:px-10 md:px-14"
      >
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,0.82fr)_1fr] lg:gap-20">
          {/* Left: Sharp Architectural Photo with GSAP Curtain Reveal & Parallax */}
          <div className="relative">
            <div
              ref={imageWrapRef}
              className="relative min-h-[380px] h-full overflow-hidden rounded-none border border-line bg-ink-soft lg:min-h-[640px]"
            >
              <div
                ref={imageInnerRef}
                className="absolute inset-0 h-full w-full will-change-transform"
              >
                <Image
                  src="/images/hall-accueil.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

              {/* Sharp Architectural Corner Badge */}
              <div className="absolute bottom-0 start-0 border-t border-e border-white/20 bg-ink/85 px-5 py-3 text-paper backdrop-blur-md">
                <span className="block font-mono text-[0.68rem] tracking-[0.22em] text-leaf uppercase">
                  SOUSSE — TUNISIE
                </span>
                <span className="font-display text-lg tracking-wider uppercase">
                  CLINIQUE ESSALEM
                </span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Content + Word-by-Word Scroll Illumination + Sharp Stats Grid */}
          <div className="flex flex-col justify-center gap-8">
            <h2
              ref={headingRef}
              className="max-w-[16ch] text-[clamp(2.2rem,4.6vw,3.6rem)]"
            >
              {t("heading")}
            </h2>

            <div ref={scrubTextRef} className="space-y-5">
              <p className="max-w-[58ch] text-[1.04rem] leading-relaxed text-ink">
                {introWords.map((word, idx) => (
                  <span key={`i-${idx}`} className="scrub-word me-[0.28em] inline-block">
                    {word}
                  </span>
                ))}
              </p>

              <p className="max-w-[54ch] border-s-2 border-leaf ps-4 text-[1.04rem] font-medium leading-relaxed text-ink">
                {qualityWords.map((word, idx) => (
                  <span key={`q-${idx}`} className="scrub-word me-[0.28em] inline-block">
                    {word}
                  </span>
                ))}
              </p>
            </div>

            {/* Sharp Architectural 2x2 Figures Grid */}
            <dl
              ref={statsGridRef}
              className="grid grid-cols-2 gap-3.5 pt-2 sm:gap-4"
            >
              {figures.map((figure, i) => (
                <div
                  key={figure.key}
                  className="stat-cell group relative overflow-hidden rounded-none border border-line bg-white/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-leaf hover:bg-white hover:shadow-lg hover:shadow-ink/5 sm:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-leaf transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right"
                  />
                  <span className="mb-2 block font-mono text-[0.68rem] font-bold tracking-[0.2em] text-stone/60">
                    0{i + 1}
                  </span>
                  <dt className="sr-only">{tf(figure.key)}</dt>
                  <dd className="flex flex-col gap-1">
                    <div className="text-ink transition-colors duration-300 group-hover:text-leaf">
                      <Counter to={figure.value} suffix={figure.suffix} />
                    </div>
                    <span className="text-[0.9rem] font-medium text-stone">
                      {tf(figure.key)}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Sharp Architectural CTA Buttons */}
            <div ref={actionsRef} className="flex flex-wrap gap-3.5 pt-2">
              <Link
                href="/presentation"
                className="group inline-flex min-h-12 items-center gap-3 rounded-none bg-ink px-7 font-medium text-paper transition-colors hover:bg-leaf"
              >
                <span>{t("discover")}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>
              <Link
                href="/demarche-qualite"
                className="inline-flex min-h-12 items-center rounded-none border border-ink/25 bg-transparent px-7 font-medium text-ink transition-colors hover:border-leaf hover:bg-leaf/10 hover:text-leaf"
              >
                {t("qualityLink")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
