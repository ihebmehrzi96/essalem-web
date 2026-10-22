import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { categories, getCategory, type Locale } from "@/content/services";
import { clinic } from "@/lib/content";
import Reveal from "@/components/reveal";

export const instant = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const category = getCategory(slug);
  const l = locale as Locale;

  return {
    title: `${category?.title[l] ?? "Services"} — Clinique Essalem`,
    description: (category?.intro?.[l] ?? category?.body?.[l])?.slice(0, 160),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const l = locale as Locale;

  const category = getCategory(slug);
  if (!category) notFound();

  const isSimple = Boolean(category.body);

  return (
    <main className="pb-(--spacing-section)">

      {/* Bandeau */}
      <div className="relative h-[64svh] min-h-[340px] w-full bg-ink-soft">
        {category.image && (
          <Image
            src={category.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-ink/20" />
      </div>

      {/* Titre en chevauchement */}
      <div className="relative z-10 -mt-24 flex justify-center px-5">
        <div className="max-w-[90%] bg-stone/80 px-12 py-8 text-center backdrop-blur-sm sm:px-20">
          <span className="block text-[0.76rem] tracking-[0.3em] text-paper/80 uppercase">
           {l === "ar" ? "الخدمات" : l === "en" ? "Services" : "Services"}
          </span>
          <h1 className="mt-3 text-[clamp(1.8rem,4.2vw,3rem)] leading-[1.15] text-paper">
            {category.title[l]}
          </h1>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1000px] px-5 sm:px-8">

        {/* ───── Page simple : texte + image ───── */}
        {isSimple && category.body && (
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
            {category.bodyImage && (
              <Reveal>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
                  <Image
                    src={category.bodyImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <div className={category.bodyImage ? "" : "md:col-span-2 mx-auto max-w-[62ch]"}>
                <div className="bg-leaf px-8 py-6">
                  <h2 className="text-[0.86rem] tracking-[0.14em] text-paper uppercase">
                    {category.title[l]}
                  </h2>
                </div>

                <div className="mt-7 space-y-5 text-[0.98rem] leading-[1.85] text-ink">
                  {category.body[l].split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <a
                  href={clinic.phoneHref}
                  dir="ltr"
                  className="mt-9 inline-flex min-h-13 items-center rounded-full bg-ink px-8 font-medium text-paper transition-colors hover:bg-leaf-deep"
                >
                  {clinic.phone}
                </a>
              </div>
            </Reveal>
          </div>
        )}

        {/* ───── Page à grille : introduction + spécialités ───── */}
        {!isSimple && (
          <>
            {category.intro && (
              <p className="mx-auto max-w-[62ch] text-center text-[1rem] leading-[1.9] text-stone">
                {category.intro[l]}
              </p>
            )}

            {category.specialties.length > 0 && (
              <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {category.specialties.map((specialty, i) => (
                  <Reveal key={specialty.slug} delay={(i % 2) * 0.08}>
                    <Link
                      href={`/services/${category.slug}/${specialty.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[16/11] w-full overflow-hidden bg-mist">
                        {specialty.image ? (
                          <Image
                            src={specialty.image}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-[0.85rem] text-stone">
                            {specialty.title[l]}
                          </span>
                        )}
                      </div>

                      <div className="relative -mt-6 me-8 flex items-center justify-between gap-4 bg-leaf px-5 py-3.5 transition-colors duration-500 group-hover:bg-leaf-deep">
                        <h2 className="text-[0.86rem] leading-snug tracking-[0.08em] text-paper uppercase">
                          {specialty.title[l]}
                        </h2>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0 text-paper opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 rtl:-scale-x-100"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                        </svg>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}

        {/* Retour */}
        <div className="mt-20 border-t border-line pt-10">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 font-medium transition-colors hover:text-leaf"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-400 group-hover:-translate-x-1 rtl:-scale-x-100" aria-hidden="true">
              <path d="M19 12H5" /><path d="m11 18-6-6 6-6" />
            </svg>
            {l === "ar"
              ? "كل الخدمات"
              : l === "en"
                ? "All services"
                : "Tous nos services"}
          </Link>
        </div>

      </div>
    </main>
  );
}