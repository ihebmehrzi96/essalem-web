"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { services } from "@/lib/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Grille asymétrique architecturale : première et dernière cartes plus larges. */
const SPANS = [
  "md:col-span-4",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-6",
];

export default function Services() {
  const t = useTranslations("services");
  const tc = useTranslations("common");

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );

      // Architectural line draw
      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      // Cards staggered architectural reveal
      const cards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        {
          y: 55,
          opacity: 0,
          clipPath: "inset(10% 0% 0% 0%)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="px-5 py-(--spacing-section) sm:px-10 md:px-14"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Architectural Header */}
        <div
          ref={headerRef}
          className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-10"
        >
          <h2 className="max-w-[18ch] text-[clamp(2.2rem,4.6vw,3.6rem)]">
            {t("heading")}
          </h2>

          <Link
            href="/services"
            className="group relative inline-flex min-h-11 items-center gap-3 border-b-2 border-ink pb-1.5 text-sm font-semibold tracking-wider uppercase transition-colors hover:border-leaf hover:text-leaf"
          >
            <span>{tc("allServices")}</span>
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
        </div>

        {/* Horizontal Architectural Divider */}
        <div
          ref={ruleRef}
          className="mb-10 h-px w-full origin-left bg-line rtl:origin-right sm:mb-12"
        />

        {/* Sharp Architectural Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6">
          {services.map((service, i) => {
            const indexLabel = String(i + 1).padStart(2, "0");

            return (
              <Link
                key={service.slug}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                href={`/services/${service.slug}`}
                className={`group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-none border border-line/60 bg-ink-soft p-6 sm:min-h-[410px] sm:p-8 ${
                  SPANS[i] ?? "md:col-span-2"
                }`}
              >
                {service.image ? (
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-white/35">
                    {t(`${service.key}.title`)}
                  </span>
                )}

                {/* Cinematic Dark Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-ink/20 transition-opacity duration-500 group-hover:from-ink" />

                {/* Top Bar inside Card: 01–05 Index + Sharp Corner Action Box */}
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <span className="inline-flex items-center gap-2 border border-white/20 bg-ink/40 px-3 py-1 font-mono text-xs font-bold tracking-[0.2em] text-paper backdrop-blur-md transition-colors duration-300 group-hover:border-leaf group-hover:bg-leaf">
                    {indexLabel}
                  </span>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:border-leaf group-hover:bg-leaf">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-paper transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </span>
                </div>

                {/* Bottom Content: Title + Sliding Blurb */}
                <div className="relative z-10 mt-auto pt-8">
                  <h3 className="text-[clamp(1.45rem,2.3vw,2rem)] text-paper transition-transform duration-300 group-hover:-translate-y-1">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="mt-2.5 max-w-[38ch] text-[0.94rem] leading-relaxed text-paper/70 transition-all duration-300 group-hover:text-paper">
                    {t(`${service.key}.blurb`)}
                  </p>
                </div>

                {/* Bottom Green Sweep Line on Hover */}
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-leaf transition-transform duration-500 ease-out group-hover:scale-x-100 rtl:origin-right
                  "
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
