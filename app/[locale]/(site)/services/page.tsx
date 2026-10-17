import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { services } from "@/lib/content";
import Reveal from "@/components/reveal";

export const metadata = {
  title: "Nos services — Clinique Essalem",
  description:
    "Spécialités chirurgicales et médicales, gynécologie-obstétrique, plateau technique et service des urgences.",
};

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <>
      <section className="px-5 pt-32 pb-14 sm:px-6 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1280px]">
          <h1 className="max-w-[18ch] text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02]">
            {t("heading")}
          </h1>
        </div>
      </section>

      <section className="px-5 pb-(--spacing-section) sm:px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 2) * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl bg-ink-soft p-7 sm:min-h-[400px]"
                >
                  {service.image && (
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/30 to-transparent transition-opacity duration-500 group-hover:from-ink" />

                  <div className="relative flex items-end justify-between gap-4">
                    <div>
                      <h2 className="text-[clamp(1.35rem,2.4vw,2rem)] text-paper">
                        {t(`${service.key}.title`)}
                      </h2>
                      <p className="mt-2 max-w-[36ch] text-[0.93rem] leading-relaxed text-paper/70">
                        {t(`${service.key}.blurb`)}
                      </p>
                    </div>

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper/15 backdrop-blur-md transition-colors duration-500 group-hover:bg-paper">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-paper transition-colors duration-500 group-hover:text-ink rtl:-scale-x-100" aria-hidden="true">
                        <path d="M7 17 17 7" /><path d="M8 7h9v9" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}