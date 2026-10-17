"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@/i18n/routing";
import NavDropdown from "@/components/nav-dropdown";
import LocaleSwitch from "@/components/locale-switch";
import { clinic, nav } from "@/lib/content";

export default function SiteHeader() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled && !open;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 md:pt-6">
        <div className="mx-auto max-w-[1280px]">

          <div
            className={`flex items-center justify-between gap-4 rounded-full py-2 pl-2 pr-2 transition-all duration-300 sm:gap-8 sm:py-3 sm:ps-8 sm:pe-3 ${
              solid
                ? "bg-paper shadow-lg shadow-ink/10"
                : "bg-transparent shadow-none sm:bg-paper sm:shadow-md sm:shadow-ink/5"
            }`}
          >
            <Link href="/" aria-label={clinic.name} className="shrink-0">
              <Image
                src="/logo-essalem.png"
                alt={clinic.name}
                width={675}
                height={372}
                priority
                className="h-12 w-auto"
              />
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              {nav.map((item) => (
                <NavDropdown key={item.href} item={item} />
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden md:block">
                <LocaleSwitch />
              </div>

              <Link
                href="/contact"
                className="hidden min-h-11 items-center rounded-full bg-ink px-6 font-medium text-paper transition-colors hover:bg-leaf-deep sm:inline-flex"
              >
                {t("contact")}
              </Link>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={open}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-colors lg:hidden ${
                  open ? "bg-white/20" : scrolled ? "bg-mist" : "bg-white/25 sm:bg-mist"
                }`}
              >
                <motion.span
                  className={`absolute h-[1.5px] w-4 rounded-full transition-colors ${
                    open ? "bg-paper" : scrolled ? "bg-ink" : "bg-paper sm:bg-ink"
                  }`}
                  animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className={`absolute h-[1.5px] w-4 rounded-full transition-colors ${
                    open ? "bg-paper" : scrolled ? "bg-ink" : "bg-paper sm:bg-ink"
                  }`}
                  animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                className="mt-2 overflow-hidden rounded-[1.75rem] bg-paper shadow-xl shadow-ink/15 lg:hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <nav className="max-h-[60svh] overflow-y-auto px-3 pt-3">
                  {nav.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.08 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-colors active:bg-mist"
                      >
                        <span className="font-display text-xl tracking-tight">
                          {t(item.key)}
                        </span>
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-stone transition-transform group-active:translate-x-1 rtl:-scale-x-100"
                          aria-hidden="true"
                        >
                          <path d="M7 17 17 7" />
                          <path d="M8 7h9v9" />
                        </svg>
                      </Link>

                      {item.children && (
                        <div className="mb-1 ms-4 flex flex-col border-s border-line ps-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="py-2.5 text-[0.95rem] text-stone active:text-ink"
                            >
                              {t(child.key)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  className="mt-2 border-t border-line px-6 py-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <div className="mb-4">
                    <LocaleSwitch />
                  </div>

                  <a
                    href={clinic.phoneHref}
                    className="flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-ink px-6 font-medium text-paper"
                    dir="ltr"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                    </svg>
                    {clinic.phone}
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>
    </>
  );
}