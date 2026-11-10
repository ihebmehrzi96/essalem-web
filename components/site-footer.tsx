"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { clinic } from "@/lib/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.3916896023056!2d10.618824216098437!3d35.83939798015767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13027580bf92c027%3A0xcdb5761297fc24b0!2sClinique%20Essalem%20Sousse!5e0!3m2!1sfr!2stn!4v1600960303372!5m2!1sfr!2stn";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Clinique+Essalem+Sousse";

const mapCopy = {
  fr: {
    eyebrow: "Nous trouver",
    heading: "Au cœur de Sousse",
    subtitle:
      "Située à la Place du Maghreb Arabe, la Clinique Essalem est facilement accessible et vous accueille 24h/24 et 7j/7 pour les urgences.",
    addressLabel: "Adresse",
    addressLine1: "Place du Maghreb Arabe",
    addressLine2: "4000, Sousse — Tunisie",
    emergencyBadge: "Urgences 24h/24 · 7j/7",
    directionsCta: "Itinéraire Google Maps",
    contactCta: "Nous contacter",
  },
  ar: {
    eyebrow: "موقعنا",
    heading: "في قلب مدينة سوسة",
    subtitle:
      "تقع مصحة السلام بساحة المغرب العربي في موقع يسهل الوصول إليه، وتستقبلكم على مدار الساعة وطيلة أيام الأسبوع في قسم الاستعجالي.",
    addressLabel: "العنوان",
    addressLine1: "ساحة المغرب العربي",
    addressLine2: "4000، سوسة — تونس",
    emergencyBadge: "قسم الاستعجالي 24/24 · 7/7",
    directionsCta: "الاتجاهات عبر خرائط جوجل",
    contactCta: "اتصل بنا",
  },
  en: {
    eyebrow: "Find us",
    heading: "In the heart of Sousse",
    subtitle:
      "Located at Place du Maghreb Arabe, Clinique Essalem is easily accessible and welcomes you 24/7 for medical and surgical emergencies.",
    addressLabel: "Address",
    addressLine1: "Place du Maghreb Arabe",
    addressLine2: "4000, Sousse — Tunisia",
    emergencyBadge: "24/7 Emergency Department",
    directionsCta: "Get directions",
    contactCta: "Contact us",
  },
} as const;

export function Contact() {
  const locale = useLocale();
  const c =
    mapCopy[(locale as keyof typeof mapCopy) ?? "fr"] ?? mapCopy.fr;

  return (
    <section className="px-5 pb-(--spacing-section) sm:px-6 md:px-12">
      {/* Séparation architecturale avec la section précédente */}
      <div className="mx-auto mb-14 flex max-w-[1280px] items-center gap-4 sm:mb-20">
        <span className="h-px flex-1 bg-[#5DC39B]/55" />
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#5DC39B] bg-paper text-xs text-[#5DC39B]">
          ✦
        </span>
        <span className="h-px flex-1 bg-[#5DC39B]/55" />
      </div>

      <div className="mx-auto max-w-[1280px]">
        <div className="grid overflow-hidden rounded-3xl border border-[#5DC39B]/45 bg-ink shadow-xl shadow-ink/6 lg:grid-cols-[0.92fr_1.08fr]">
          {/* Colonne gauche : Informations d'accès & Itinéraire */}
          <div className="relative flex flex-col justify-between gap-8 p-8 text-paper sm:p-10 md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -end-24 h-64 w-64 rounded-full bg-[#5DC39B]/15 blur-3xl"
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#5DC39B]/40 bg-[#5DC39B]/10 px-3.5 py-1.5 text-[0.76rem] font-medium tracking-[0.16em] text-[#5DC39B] uppercase">
                <span className="h-2 w-2 rounded-full bg-[#5DC39B]" />
                {c.eyebrow}
              </div>

              <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] text-paper">
                {c.heading}
              </h2>

              <p className="mt-4 max-w-[46ch] text-[0.98rem] leading-relaxed text-paper/70">
                {c.subtitle}
              </p>

              {/* Coordonnées structurées */}
              <div className="mt-8 grid gap-5 border-t border-white/12 pt-6 sm:grid-cols-2">
                <div>
                  <span className="block text-[0.74rem] font-semibold tracking-[0.18em] text-[#5DC39B] uppercase">
                    {c.addressLabel}
                  </span>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-paper/90">
                    {c.addressLine1}
                    <br />
                    {c.addressLine2}
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-[0.76rem] font-medium text-[#5DC39B]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5DC39B]" />
                      {c.emergencyBadge}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <a
                      href={clinic.phoneHref}
                      dir="ltr"
                      className="w-fit font-display text-[1.25rem] text-paper transition-colors hover:text-[#5DC39B]"
                    >
                      {clinic.phone}
                    </a>
                    <a
                      href={`mailto:${clinic.email}`}
                      dir="ltr"
                      className="w-fit text-[0.88rem] text-paper/65 transition-colors hover:text-[#5DC39B]"
                    >
                      {clinic.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="relative flex flex-wrap items-center gap-3 pt-2">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#5DC39B] px-6 text-[0.92rem] font-semibold text-ink transition-all hover:bg-paper"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {c.directionsCta}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </a>

              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-6 text-[0.92rem] font-medium text-paper transition-colors hover:border-[#5DC39B] hover:text-[#5DC39B]"
              >
                {c.contactCta}
              </Link>
            </div>
          </div>

          {/* Colonne droite : Carte Google Maps intégrée */}
          <div className="relative min-h-[340px] w-full bg-mist sm:min-h-[420px] lg:min-h-full">
            <iframe
              src={MAP_SRC}
              title="Clinique Essalem"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
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
                    {t("clinicName")}
                  </span>
                  <p className="mt-5 text-base leading-relaxed text-[#616161] sm:text-[1.05rem]">
                    {t("addressLine1")}
                    <br />
                    {t("addressLine2")}
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
                    href="/contact"
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
                  © 2026 {t("clinicName")}. {t("rights")}
                </span>
                <span>{t("cityCountry")}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
