"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { clinic } from "@/lib/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  return null;
}

export default function SiteFooter() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const pathname = usePathname();

  const footerRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const outerCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const circle = circleRef.current;
    const card = outerCardRef.current;
    if (!footer || !circle || !card) return;

    const ctx = gsap.context(() => {
      // 1. Expanding #5DC39B circle dome
      gsap.fromTo(
        circle,
        {
          scale: 0.85,
        },
        {
          scale: 6.2,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top 95%",
            end: "bottom bottom",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        }
      );

      // 2. Inner rounded card scales from 0.85 to 1
      gsap.fromTo(
        card,
        {
          scale: 0.85,
        },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top 95%",
            end: "bottom bottom",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        }
      );
    }, footer);

    // Refresh ScrollTrigger after route change & layout settle
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    const timerId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const ro = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      ro.disconnect();
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div className="relative z-10 w-full">
      <footer
        ref={footerRef}
        id="footer"
        className="relative flex w-full flex-col items-center justify-center overflow-visible p-0"
      >
        {/* BG Circle Expand — 600x600 #5DC39B circle that expands on scroll */}
        <div
          ref={circleRef}
          data-footer-circle
          aria-hidden="true"
          style={{
            width: "600px",
            height: "600px",
            top: "calc(50% - 300px)",
            left: "calc(50% - 300px)",
            transform: "scale(0.75)",
          }}
          className="pointer-events-none absolute rounded-full bg-[#5DC39B] will-change-transform"
        />

        {/* Outer Frame (20px green margin around the card) */}
        <div className="relative z-10 flex w-full max-w-[1920px] flex-col items-center justify-center p-3 sm:p-6">
          {/* Spacious Rounded Card (#f7f7ed) with the 4-column content */}
          <div
            ref={outerCardRef}
            style={{ transform: "scale(0.85)" }}
            className="flex min-h-[400px] w-full flex-col justify-between overflow-clip rounded-[36px] bg-[#f7f7ed] px-8 py-12 text-[#292929] will-change-transform sm:min-h-[460px] sm:rounded-[40px] sm:px-12 sm:py-16 md:px-16 md:py-20"
          >
            <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between gap-12">
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14">
                {/* Column 1: Clinic Name, Address, Phone */}
                <div>
                  <span className="font-display block text-2xl font-bold text-[#292929] sm:text-3xl">
                    {clinic.name}
                  </span>
                  <p className="mt-5 text-base leading-relaxed text-[#616161] sm:text-[1.05rem]">
                    Place du Maghreb Arabe
                    <br />
                    4000, Sousse — Tunisie
                  </p>
                  <a
                    href={clinic.phoneHref}
                    dir="ltr"
                    className="mt-6 inline-flex items-center gap-3 text-base font-semibold text-[#292929] transition-colors hover:text-[#5DC39B] sm:text-[1.05rem]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5DC39B] text-white">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                      </svg>
                    </span>
                    {clinic.phone}
                  </a>
                </div>

                {/* Column 2: Services */}
                <nav className="flex flex-col gap-3.5 text-base text-[#616161] sm:text-[1.05rem]">
                  <span className="mb-2 text-lg font-semibold text-[#292929]">
                    {t("services")}
                  </span>
                  <Link
                    href="/services/specialites-chirurgicales"
                    className="transition-colors hover:text-[#5DC39B]"
                  >
                    {tn("surgical")}
                  </Link>
                  <Link
                    href="/services/specialites-medicales"
                    className="transition-colors hover:text-[#5DC39B]"
                  >
                    {tn("medical")}
                  </Link>
                  <Link
                    href="/services/gynecologie-obstetrique"
                    className="transition-colors hover:text-[#5DC39B]"
                  >
                    {tn("gyneco")}
                  </Link>
                  <Link
                    href="/services/plateau-technique"
                    className="transition-colors hover:text-[#5DC39B]"
                  >
                    {tn("technical")}
                  </Link>
                  <Link
                    href="/services/urgences"
                    className="transition-colors hover:text-[#5DC39B]"
                  >
                    {tn("emergency")}
                  </Link>
                </nav>

                {/* Column 3: Keep in touch */}
                <nav className="flex flex-col gap-3.5 text-base text-[#616161] sm:text-[1.05rem]">
                  <span className="mb-2 text-lg font-semibold text-[#292929]">
                    {t("keepInTouch")}
                  </span>
                  <Link
                    href="/enquete-satisfaction"
                    className="underline decoration-[#5DC39B]/50 underline-offset-4 transition-colors hover:text-[#5DC39B]"
                  >
                    {t("review")}
                  </Link>
                  <Link
                    href="/recrutement"
                    className="underline decoration-[#5DC39B]/50 underline-offset-4 transition-colors hover:text-[#5DC39B]"
                  >
                    {t("recruitment")}
                  </Link>
                  <Link
                    href="/contact"
                    className="underline decoration-[#5DC39B]/50 underline-offset-4 transition-colors hover:text-[#5DC39B]"
                  >
                    {t("contact")}
                  </Link>
                </nav>

                {/* Column 4: Socials */}
                <div>
                  <span className="mb-5 block text-lg font-semibold text-[#292929]">
                    {t("follow")}
                  </span>
                  <div className="flex gap-3.5">
                    <a
                      href={clinic.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="flex h-13 w-13 items-center justify-center rounded-full bg-white text-[#292929] shadow-2xs transition-colors hover:bg-[#5DC39B] hover:text-white"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3h-3v-2c0-.6.4-1 1-1Z" />
                      </svg>
                    </a>
                    <a
                      href={clinic.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-13 w-13 items-center justify-center rounded-full bg-white text-[#292929] shadow-2xs transition-colors hover:bg-[#5DC39B] hover:text-white"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M6.5 8H4v12h2.5V8ZM5.2 3.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20 13.3c0-3-1.6-4.5-3.8-4.5-1.5 0-2.3.8-2.7 1.4V8H11v12h2.5v-6.6c0-1.3.7-2.1 1.8-2.1s1.7.8 1.7 2.1V20H20v-6.7Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Copyright Bar */}
              <div className="flex flex-wrap justify-between gap-4 border-t border-black/10 pt-8 text-[0.92rem] text-[#616161]">
                <span>
                  © 2026 {clinic.name}. {t("rights")}
                </span>
                <span>Sousse, Tunisie</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
