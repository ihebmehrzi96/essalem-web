"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useEffect, useState, useTransition } from "react";

const LANGUAGES = [
  { code: "fr", badge: "FR", name: "Français" },
  { code: "ar", badge: "AR", name: "العربية" },
  { code: "en", badge: "GB", name: "English" },
] as const;

export default function LocaleSwitch({ dark = false }: { dark?: boolean }) {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Optimistic state so pill highlights immediately without waiting for RSC fetch
  const [optimisticLocale, setOptimisticLocale] = useState<string | null>(null);

  useEffect(() => {
    setOptimisticLocale(null);
  }, [currentLocale]);

  const activeLocale = optimisticLocale ?? currentLocale;

  function change(next: string) {
    if (next === activeLocale) return;
    setOptimisticLocale(next);
    startTransition(() => {
      router.replace(pathname, { locale: next, scroll: false });
    });
  }

  return (
    <div
      className="flex items-center gap-2 sm:gap-2.5"
      role="group"
      aria-label="Sélection de langue"
      aria-busy={pending}
    >
      {LANGUAGES.map((lang) => {
        const isActive = lang.code === activeLocale;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => change(lang.code)}
            aria-current={isActive ? "true" : undefined}
            className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer select-none ${
              isActive
                ? "bg-leaf text-white font-bold shadow-lg shadow-leaf/35 ring-1 ring-white/20 scale-[1.02]"
                : dark
                  ? "bg-white/10 hover:bg-white/20 text-white/85 hover:text-white border border-white/15"
                  : "bg-mist/80 hover:bg-mist text-ink/85 hover:text-ink border border-line/60"
            }`}
          >
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase transition-colors ${
                isActive
                  ? "bg-black/25 text-white"
                  : dark
                    ? "bg-white/15 text-white/90"
                    : "bg-black/10 text-ink/80"
              }`}
            >
              {lang.badge}
            </span>
            <span className="leading-none">{lang.name}</span>
          </button>
        );
      })}
    </div>
  );
}
