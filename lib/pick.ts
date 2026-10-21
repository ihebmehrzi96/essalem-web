/** Traduction dans la langue demandée, à défaut en français. */
export function pick<T extends { locale: string }>(
  items: T[],
  locale: string
): T | undefined {
  return (
    items.find((t) => t.locale === locale) ??
    items.find((t) => t.locale === "fr")
  );
}