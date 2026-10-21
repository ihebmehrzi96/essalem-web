import Image from "next/image";
import { Link } from "@/i18n/routing";
import { categories, type Locale } from "@/content/services";
import Reveal from "@/components/reveal";

export const instant = false;

export const metadata = {
  title: "Nos services — Clinique Essalem",
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = locale as Locale;

  return (
    <main className="pb-(--spacing-section)">

      <section className="px-5 pt-32 pb-14 sm:px-8 md:pt-44">
        <div className="mx-auto max-w-[1150px]">
          <span className="text-[0.8rem] tracking-[0.24em] text-leaf uppercase">
            Services
          </span>
          <h1 className="mt-4 text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.98]">
            {l === "ar" ? "خدماتنا" : l === "en" ? "Our services" : "Nos services"}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1150px] px-5 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((category, i) => (
            <Reveal key={category.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/services/${category.slug}`}
                className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden bg-ink-soft p-7 sm:min-h-[380px]"
              >
                {category.image && (
                  <Image
                    src={category.image}
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
                      {category.title[l]}
                    </h2>
                    {category.specialties.length > 0 && (
                      <span className="mt-2 block text-[0.88rem] text-paper/60">
                        {category.specialties.length}{" "}
                        {l === "ar"
                          ? "اختصاص"
                          : l === "en"
                            ? "specialties"
                            : "spécialités"}
                      </span>
                    )}
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
    </main>
  );
}