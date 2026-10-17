"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";
import { routing } from "@/i18n/routing";

export default function LocaleSwitch({ dark = false }: { dark?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function change(next: string) {
    if (next === locale) return;
    // Même page, autre langue : le chemin est conservé.
    startTransition(() => router.replace(pathname, { locale: next }));
  }

  return (
    <div className="flex items-center gap-0.5 text-sm" aria-busy={pending}>
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => change(code)}
          aria-current={code === locale ? "true" : undefined}
          className={`rounded-full px-2.5 py-1.5 uppercase transition-colors ${
            code === locale
              ? dark
                ? "bg-white/15 text-paper"
                : "bg-mist text-ink"
              : dark
                ? "text-paper/55 hover:text-paper"
                : "text-stone hover:text-ink"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}