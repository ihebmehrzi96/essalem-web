"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@/i18n/routing";
import type { NavItem } from "@/lib/content";

export default function NavDropdown({ item }: { item: NavItem }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="whitespace-nowrap transition-colors hover:text-leaf"
      >
        {t(item.key)}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <Link
        href={item.href}
        className="flex items-center gap-1.5 whitespace-nowrap py-2 transition-colors hover:text-leaf"
        aria-expanded={open}
      >
        {t(item.key)}
        <motion.svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-1/2 top-full z-50 w-[280px] -translate-x-1/2 pt-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden rounded-2xl bg-paper p-2 shadow-xl shadow-ink/15">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-[0.95rem] transition-colors hover:bg-mist"
                >
                  <span>{t(child.key)}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-stone opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 rtl:-scale-x-100"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}