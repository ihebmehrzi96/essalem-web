"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useEffect, useState, useTransition } from "react";

function FlagFR({ className = "w-full h-full object-cover" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
      <path fill="#002654" d="M0 0h213.3v480H0z" />
      <path fill="#ffffff" d="M213.3 0h213.4v480H213.3z" />
      <path fill="#ce1126" d="M426.7 0H640v480H426.7z" />
    </svg>
  );
}

function FlagTN({ className = "w-full h-full object-cover" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 800" className={className} aria-hidden="true">
      <rect width="1200" height="800" fill="#e70013" />
      <circle cx="600" cy="400" r="200" fill="#ffffff" />
      <circle cx="600" cy="400" r="160" fill="#e70013" />
      <circle cx="640" cy="400" r="130" fill="#ffffff" />
      <polygon
        fill="#e70013"
        points="580,330 598,375 645,375 607,402 622,448 580,420 538,448 553,402 515,375 562,375"
      />
    </svg>
  );
}

function FlagUS({ className = "w-full h-full object-cover" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
      <g fillRule="evenodd">
        <path fill="#bd3d44" d="M0 0h640v480H0z" />
        <path stroke="#ffffff" strokeWidth="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640" />
        <path fill="#192f5d" d="M0 0h260v259H0z" />
        <g fill="#ffffff">
          {[
            [25, 25], [75, 25], [125, 25], [175, 25], [225, 25],
            [50, 52], [100, 52], [150, 52], [200, 52],
            [25, 79], [75, 79], [125, 79], [175, 79], [225, 79],
            [50, 106], [100, 106], [150, 106], [200, 106],
            [25, 133], [75, 133], [125, 133], [175, 133], [225, 133],
            [50, 160], [100, 160], [150, 160], [200, 160],
            [25, 187], [75, 187], [125, 187], [175, 187], [225, 187],
            [50, 214], [100, 214], [150, 214], [200, 214],
            [25, 241], [75, 241], [125, 241], [175, 241], [225, 241]
          ].map(([cx, cy], i) => (
            <polygon
              key={i}
              points="0,-7 2.1,-2.2 7,-2.2 3.1,0.9 4.6,5.7 0,2.8 -4.6,5.7 -3.1,0.9 -7,-2.2 -2.1,-2.2"
              transform={`translate(${cx}, ${cy})`}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

const LANGUAGES = [
  { code: "ar", name: "العربية", Flag: FlagTN },
  { code: "en", name: "English", Flag: FlagUS },
  { code: "fr", name: "Français", Flag: FlagFR },
] as const;

export default function LocaleSwitch({
  dark = false,
  variant = "default",
}: {
  dark?: boolean;
  variant?: "default" | "navbar";
}) {
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

  if (variant === "navbar") {
    return (
      <div
        className="flex items-center gap-1.5 sm:gap-2 bg-transparent"
        role="group"
        aria-label="Sélection de langue"
        aria-busy={pending}
      >
        {LANGUAGES.map((lang) => {
          const isActive = lang.code === activeLocale;
          const FlagComponent = lang.Flag;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => change(lang.code)}
              title={lang.name}
              aria-label={lang.name}
              aria-current={isActive ? "true" : undefined}
              className={`relative w-6 h-4 sm:w-7 sm:h-4.5 rounded-[3px] overflow-hidden transition-all duration-200 cursor-pointer select-none flex items-center justify-center shadow-xs ${
                isActive
                  ? "ring-2 ring-leaf ring-offset-1.5 ring-offset-transparent scale-105 opacity-100 shadow-sm"
                  : "opacity-75 hover:opacity-100 hover:scale-105 border border-black/20 dark:border-white/20"
              }`}
            >
              <FlagComponent className="w-full h-full object-cover pointer-events-none" />
            </button>
          );
        })}
      </div>
    );
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
        const FlagComponent = lang.Flag;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => change(lang.code)}
            aria-current={isActive ? "true" : undefined}
            className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer select-none ${
              isActive
                ? "bg-leaf text-white font-bold shadow-lg shadow-leaf/35 ring-1 ring-white/20 scale-[1.02]"
                : dark
                  ? "bg-white/10 hover:bg-white/20 text-white/85 hover:text-white border border-white/15"
                  : "bg-mist/80 hover:bg-mist text-ink/85 hover:text-ink border border-line/60"
            }`}
          >
            <span className="w-5 h-3.5 rounded-[2px] overflow-hidden inline-flex shrink-0 shadow-xs">
              <FlagComponent className="w-full h-full object-cover" />
            </span>
            <span className="leading-none">{lang.name}</span>
          </button>
        );
      })}
    </div>
  );
}
