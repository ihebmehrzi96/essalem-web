"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Link, usePathname } from "@/i18n/routing";
import LocaleSwitch from "@/components/locale-switch";
import { clinic, nav } from "@/lib/content";
import { menuStore } from "@/lib/menu-store";

export default function SiteHeader() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);

  // Synchronized external store persists state during client-side locale route switches
  // Server snapshot is always false to eliminate any SSR hydration mismatch
  const isOpen = useSyncExternalStore(
    menuStore.subscribe,
    menuStore.getIsOpen,
    () => false
  );

  const openSubmenu = useSyncExternalStore(
    menuStore.subscribe,
    menuStore.getOpenSubmenu,
    () => null
  );

  const isHeroPage =
    pathname === "/" ||
    pathname === "/presentation" ||
    pathname === "/demarche-qualite" ||
    pathname === "/votre-sejour" ||
    pathname === "/recrutement" ||
    pathname.startsWith("/services/");
  const isOverDarkHero = isHeroPage && !pastHero;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      const threshold = pathname === "/" ? window.innerHeight * 0.98 : 320;
      setPastHero(window.scrollY > threshold);

      const footerCircle = document.querySelector("[data-footer-circle]");
      if (footerCircle) {
        const rect = footerCircle.getBoundingClientRect();
        setIsOverFooter(rect.top <= 90);
      } else {
        setIsOverFooter(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Sync body scroll lock whenever isOpen changes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Handle ESC key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleCloseNav();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Pure Native CSS + JS Transitions (Ultra smooth, zero lag, zero GSAP overhead)
  const handleOpenNav = () => {
    menuStore.open();
  };

  const handleCloseNav = () => {
    menuStore.close();
  };

  return (
    <>
      {/* ── Integrated Seamless Topbar (Progressive feather blur on scroll, like Arpeggio) ── */}
      <header className="fixed inset-x-0 top-0 z-50 px-5 py-4 sm:px-10 sm:py-5 md:px-14 pointer-events-none">
        {/* Progressive Gradient Blur Backdrop (no hard border line, fades smoothly downward) */}
        <div
          aria-hidden="true"
          style={{
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0) 100%)",
          }}
          className={`pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-40 transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            aria-label={clinic.name}
            className="pointer-events-auto shrink-0 flex items-center transition-opacity hover:opacity-85"
          >
            <Image
              src={isOverDarkHero || isOverFooter ? "/logo-essalem-white.svg" : "/logo-essalem.svg"}
              alt={clinic.name}
              width={200}
              height={150}
              priority
              className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* Right: Language Flags on the left of the Menu */}
          <div className="pointer-events-auto flex items-center gap-3.5 sm:gap-5 md:gap-6 shrink-0">
            {/* Language Flags */}
            <LocaleSwitch variant="navbar" dark={isOverDarkHero || isOverFooter} />

            {/* Subtle separator */}
            <span
              className={`w-px h-3.5 sm:h-4 transition-colors duration-300 ${
                isOverFooter || isOverDarkHero ? "bg-white/25" : "bg-ink/20"
              }`}
              aria-hidden="true"
            />

            {/* Minimal 2-Bar Hamburger Button */}
            <button
              type="button"
              onClick={handleOpenNav}
              className="py-2 px-1 transition group focus:outline-none cursor-pointer flex items-center justify-center"
              aria-label="Ouvrir le menu"
            >
              <div className="w-8 sm:w-9 h-[10px] flex flex-col justify-between relative pointer-events-none">
                <span
                  className={`block w-full h-[2.5px] rounded-full transition-all duration-300 group-hover:translate-x-1 ${
                    isOverFooter
                      ? "bg-white group-hover:bg-ink"
                      : isOverDarkHero
                      ? "bg-white group-hover:bg-leaf"
                      : "bg-leaf group-hover:bg-ink"
                  }`}
                />
                <span
                  className={`block w-full h-[2.5px] rounded-full transition-all duration-300 group-hover:-translate-x-1 ${
                    isOverFooter
                      ? "bg-white group-hover:bg-ink"
                      : isOverDarkHero
                      ? "bg-white group-hover:bg-leaf"
                      : "bg-leaf group-hover:bg-ink"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ── Fullscreen Menu (Pure CSS GPU acceleration, butter-smooth 60/120fps, zero lag) ── */}
      <nav
        suppressHydrationWarning
        style={{
          transform: isOpen ? "translate3d(0, 0, 0)" : "translate3d(100%, 0, 0)",
          transition: "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)",
          background: "rgba(10, 20, 16, 0.96)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className={`fixed inset-0 w-full h-screen text-white flex flex-col justify-between py-5 sm:py-7 px-4 sm:px-8 z-[9999] overflow-y-auto no-scrollbar border-l border-white/10 will-change-transform ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-label="Fullscreen Navigation"
        aria-hidden={!isOpen}
      >
        {/* Subtle Ambient Emerald Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[650px] h-[550px] sm:h-[650px] bg-leaf/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Header inside Menu: Logo + Close Button */}
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between px-2 sm:px-6 relative z-10 shrink-0">
          <Link
            href="/"
            onClick={handleCloseNav}
            className="relative inline-flex items-center"
          >
            <Image
              src="/logo-essalem-white.svg"
              alt={clinic.name}
              width={215}
              height={162}
              priority
              className="h-20 sm:h-24 md:h-28 w-auto object-contain"
            />
          </Link>

          {/* Close button with rotating X icon */}
          <div
            onClick={handleCloseNav}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-leaf border border-white/15 flex items-center justify-center transition-all duration-200 cursor-pointer text-white shadow-lg group focus:outline-none"
            role="button"
            tabIndex={0}
            aria-label="Fermer le menu"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleCloseNav();
            }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-90 transition-transform duration-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        </div>

        {/* Centered Area: Links with Pure CSS Staggered Cascade */}
        <div className="my-auto text-center w-full max-w-xl mx-auto py-3 sm:py-4 relative z-10">
          <ul className="space-y-2 sm:space-y-3">
            {/* Home Link */}
            <li
              style={{
                transition: "opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: isOpen ? "100ms" : "0ms",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
              }}
            >
              <Link
                href="/"
                onClick={handleCloseNav}
                className="font-tanker text-2xl sm:text-3xl lg:text-4xl tracking-wider uppercase text-white hover:text-leaf transition-colors inline-block"
              >
                {t("clinic") === "La clinique"
                  ? "Accueil"
                  : t("clinic") === "The clinic"
                  ? "Home"
                  : "الرئيسية"}
              </Link>
            </li>

            {nav.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;
              const isSubOpen = openSubmenu === item.key;
              const delay = 140 + index * 40;

              return (
                <li
                  key={item.href}
                  style={{
                    transition: "opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: isOpen ? `${delay}ms` : "0ms",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
                  }}
                >
                  {hasChildren ? (
                    <div className="flex flex-col items-center">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={item.href}
                          onClick={handleCloseNav}
                          className="font-tanker text-2xl sm:text-3xl lg:text-4xl tracking-wider uppercase text-white hover:text-leaf transition-colors inline-block"
                        >
                          {t(item.key)}
                        </Link>
                        <button
                          type="button"
                          onClick={() => menuStore.toggleSubmenu(item.key)}
                          aria-label={`Afficher le sous-menu ${t(item.key)}`}
                          className="p-1 sm:p-1.5 rounded-full bg-white/10 hover:bg-leaf text-white transition-colors cursor-pointer"
                        >
                          <svg
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
                              isSubOpen ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                      </div>

                      {/* Smooth Submenu Accordion */}
                      <AnimatePresence initial={false}>
                        {isSubOpen && (
                          <motion.div
                            key="submenu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden w-full"
                          >
                            <div className="mt-2 mb-1 flex flex-col items-center gap-1 border-s-2 border-leaf/50 ps-3.5 py-0.5 max-w-xs mx-auto">
                              {item.children!.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={handleCloseNav}
                                  className="text-sm sm:text-base font-medium text-white/80 hover:text-leaf transition-colors py-0.5"
                                >
                                  {t(child.key)}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={handleCloseNav}
                      className="font-tanker text-2xl sm:text-3xl lg:text-4xl tracking-wider uppercase text-white hover:text-leaf transition-colors inline-block"
                    >
                      {t(item.key)}
                    </Link>
                  )}
                </li>
              );
            })}

            {/* Contact Link */}
            <li
              style={{
                transition: "opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: isOpen ? `${140 + nav.length * 40}ms` : "0ms",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
              }}
            >
              <Link
                href="/contact"
                onClick={handleCloseNav}
                className="font-tanker text-2xl sm:text-3xl lg:text-4xl tracking-wider uppercase text-white hover:text-leaf transition-colors inline-block"
              >
                {t("contact")}
              </Link>
            </li>
          </ul>

          {/* Architectural Sparkle Divider */}
          <div
            aria-hidden="true"
            style={{
              transition: "opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: isOpen ? `${160 + nav.length * 40}ms` : "0ms",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translate3d(0, 0, 0)" : "translate3d(0, 16px, 0)",
            }}
            className="w-full max-w-xs sm:max-w-sm mx-auto my-3 sm:my-4 flex items-center justify-center gap-2.5 sm:gap-3"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#5DC39B]/40 to-[#5DC39B]/80" />
            <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-[#5DC39B]/60 bg-black/40 text-[0.65rem] sm:text-[0.7rem] text-[#5DC39B] shadow-sm">
              ✦
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#5DC39B]/40 to-[#5DC39B]/80" />
          </div>

          {/* Bottom Preferences: Language Switcher + Emergency Phone + Address */}
          <div
            style={{
              transition: "opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: isOpen ? `${190 + nav.length * 40}ms` : "0ms",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translate3d(0, 0, 0)" : "translate3d(0, 16px, 0)",
            }}
            className="flex flex-col items-center gap-3"
          >
            {/* Language Switcher */}
            <LocaleSwitch dark={true} />

            {/* Quick Contact & Address Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-1">
              {/* Phone with active indicator */}
              <a
                href={clinic.phoneHref}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-leaf text-white border border-white/15 transition-all duration-200 group text-xs sm:text-sm font-semibold tracking-wide shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-leaf group-hover:bg-white animate-pulse" />
                <svg
                  className="w-3.5 h-3.5 text-leaf group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span dir="ltr">{clinic.phone}</span>
              </a>

              {/* Address Badge with Google Maps link */}
              <a
                href="https://maps.google.com/?q=Clinique+Essalem+Sousse"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/85 hover:text-white border border-white/10 transition-all duration-200 text-xs sm:text-sm"
              >
                <svg
                  className="w-3.5 h-3.5 text-leaf"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{tf("addressLine1")}, {tf("cityCountry")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Subtle footer credit inside menu */}
        <div className="text-center text-[11px] sm:text-[12px] text-zinc-400 font-mono tracking-wider uppercase pb-1 relative z-10 shrink-0">
          {tf("clinicName")} — {tf("cityCountry")}
        </div>
      </nav>
    </>
  );
}
