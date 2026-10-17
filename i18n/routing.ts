import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["fr", "ar", "en"],
  defaultLocale: "fr",
});

/** Remplace next/link et next/navigation : la langue est ajoutée automatiquement. */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);