"use client";

import { useState } from "react";

const LOCALES = [
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
] as const;

/**
 * Affiche trois onglets de langue. Les champs des langues masquées restent
 * dans le DOM : le formulaire envoie toujours les trois versions.
 */
export default function LocaleTabs({
  render,
}: {
  render: (locale: "fr" | "ar" | "en") => React.ReactNode;
}) {
  const [active, setActive] = useState<"fr" | "ar" | "en">("fr");

  return (
    <div>
      <div className="flex gap-1 border-b border-line">
        {LOCALES.map((item) => (
          <button
            key={item.code}
            type="button"
            onClick={() => setActive(item.code)}
            className={`px-5 py-3 text-[0.92rem] font-medium transition-colors ${
              active === item.code
                ? "border-b-2 border-ink text-ink"
                : "text-stone hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {LOCALES.map((item) => (
        <div
          key={item.code}
          hidden={active !== item.code}
          dir={item.code === "ar" ? "rtl" : "ltr"}
          className="pt-6"
        >
          {render(item.code)}
        </div>
      ))}
    </div>
  );
}