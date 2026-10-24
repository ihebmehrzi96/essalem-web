import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <>
      <SiteHeader />

      <main className="flex min-h-[80svh] flex-col items-center justify-center px-5 pt-32 pb-20 text-center">
        <span className="font-display text-[clamp(6rem,22vw,14rem)] leading-none tracking-tight text-mist-deep">
          404
        </span>

        <h1 className="mt-2 max-w-[18ch] text-[clamp(1.6rem,3.6vw,2.6rem)] leading-[1.15]">
          {t("title")}
        </h1>

        <p className="mt-5 max-w-[46ch] leading-relaxed text-stone">
          {t("body")}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-13 items-center rounded-full bg-ink px-8 font-medium text-paper transition-colors hover:bg-leaf-deep"
          >
            {t("home")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-13 items-center rounded-full border border-line px-8 font-medium transition-colors hover:border-ink"
          >
            {t("contact")}
          </Link>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}