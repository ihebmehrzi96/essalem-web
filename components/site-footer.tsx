"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { clinic } from "@/lib/content";

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

  return (
    <footer
      id="footer"
      data-footer-circle
      className="relative z-10 w-full border-t-4 border-[#43a982] bg-ink text-paper"
    >
      <div className="mx-auto max-w-[1380px] px-5 pt-14 pb-10 sm:px-8 sm:pt-18 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Signature Brand & Direct Contact Block */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div>
              <div className="flex items-center gap-3.5">
                <Image
                  src="/logo-essalem-white.svg"
                  alt={t("clinicName")}
                  width={58}
                  height={44}
                  className="h-12 w-auto object-contain"
                />
                <span className="font-display text-2xl leading-none text-paper sm:text-[1.85rem]">
                  {t("clinicName")}
                </span>
              </div>

              <p className="mt-5 max-w-[34ch] text-[0.96rem] leading-relaxed text-white/65">
                {t("addressLine1")}
                <br />
                {t("addressLine2")}
              </p>

              <div className="mt-7">
                <a
                  href={clinic.phoneHref}
                  dir="ltr"
                  className="font-display inline-block text-[clamp(1.75rem,3vw,2.4rem)] leading-none text-[#43a982] transition-colors hover:text-paper"
                >
                  {clinic.phone}
                </a>
                <a
                  href={`mailto:${clinic.email}`}
                  dir="ltr"
                  className="mt-2.5 block w-fit text-[0.92rem] text-white/70 underline decoration-[#43a982]/60 underline-offset-4 transition-colors hover:text-[#43a982]"
                >
                  {clinic.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#43a982] px-6 py-2.5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-paper hover:text-ink"
              >
                <span>{t("contact")}</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Framed Bento Panel with Links & Named Social Pills */}
          <div className="flex flex-col justify-between gap-8 rounded-3xl border border-[#43a982]/30 bg-white/[0.03] p-7 sm:p-9 lg:col-span-7">
            <div className="grid gap-8 sm:grid-cols-3">
              {/* Col 1: Clinic */}
              <nav className="flex flex-col gap-3 text-[0.94rem] text-white/75">
                <span className="mb-1 text-[0.74rem] font-semibold tracking-[0.18em] text-[#43a982] uppercase">
                  {tn("clinic")}
                </span>
                <Link
                  href="/presentation"
                  className="w-fit transition-colors hover:text-[#43a982]"
                >
                  {tn("presentation")}
                </Link>
                <Link
                  href="/demarche-qualite"
                  className="w-fit transition-colors hover:text-[#43a982]"
                >
                  {tn("quality")}
                </Link>
                <Link
                  href="/votre-sejour"
                  className="w-fit transition-colors hover:text-[#43a982]"
                >
                  {tn("stay")}
                </Link>
                <Link
                  href="/actualites"
                  className="w-fit transition-colors hover:text-[#43a982]"
                >
                  {tn("news")}
                </Link>
              </nav>

              {/* Col 2: Services */}
              <nav className="flex flex-col gap-3 text-[0.94rem] text-white/75">
                <span className="mb-1 text-[0.74rem] font-semibold tracking-[0.18em] text-[#43a982] uppercase">
                  {t("services")}
                </span>
                <Link
                  href="/services/specialites-chirurgicales"
                  className="w-fit transition-colors hover:text-[#43a982]"
                >
                  {tn("surgical")}
                </Link>
                <Link
                  href="/services/specialites-medicales"
                  className="w-fit transition-colors hover:text-[#43a982]"
                >
                  {tn("medical")}
                </Link>
                <Link
                  href="/services/gynecologie-obstetrique"
                  className="w-fit transition-colors hover:text-[#43a982]"
                >
                  {tn("gyneco")}
                </Link>
                <Link
                  href="/services/plateau-technique"
                  className="w-fit transition-colors hover:text-[#43a982]"
                >
                  {tn("technical")}
                </Link>
                <Link
                  href="/services/urgences"
                  className="w-fit transition-colors hover:text-[#43a982]"
                >
                  {tn("emergency")}
                </Link>
              </nav>

              {/* Col 3: Keep in touch */}
              <nav className="flex flex-col gap-3 text-[0.94rem] text-white/75">
                <span className="mb-1 text-[0.74rem] font-semibold tracking-[0.18em] text-[#43a982] uppercase">
                  {t("keepInTouch")}
                </span>
                <Link
                  href="/contact"
                  className="w-fit transition-colors hover:text-[#43a982]"
                >
                  {t("review")}
                </Link>
                <Link
                  href="/recrutement"
                  className="w-fit transition-colors hover:text-[#43a982]"
                >
                  {t("recruitment")}
                </Link>
                <Link
                  href="/contact"
                  className="w-fit transition-colors hover:text-[#43a982]"
                >
                  {t("contact")}
                </Link>
              </nav>
            </div>

            {/* Social Pills inside Bento Panel */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <span className="text-[0.74rem] font-semibold tracking-[0.18em] text-[#43a982] uppercase">
                {t("follow")}
              </span>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={clinic.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-[0.84rem] text-white/85 transition-colors hover:border-[#43a982] hover:bg-[#43a982] hover:text-white"
                >
                  <span>Facebook</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={clinic.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-[0.84rem] text-white/85 transition-colors hover:border-[#43a982] hover:bg-[#43a982] hover:text-white"
                >
                  <span>LinkedIn</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={clinic.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-[0.84rem] text-white/85 transition-colors hover:border-[#43a982] hover:bg-[#43a982] hover:text-white"
                >
                  <span>Instagram</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-7 text-[0.88rem] text-white/55">
          <span>
            © 2026 {t("clinicName")}. {t("rights")}
          </span>
          <span className="text-[#43a982]">{t("cityCountry")}</span>
        </div>
      </div>
    </footer>
  );
}
