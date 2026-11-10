import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { categories, getCategory, type Locale } from "@/content/services";
import { clinic } from "@/lib/content";
import Reveal from "@/components/reveal";

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
    <div className="pb-(--spacing-section)">
      {/* Bandeau */}
      <div className="relative h-[64svh] min-h-[340px] w-full bg-ink-soft">
        {category.image && (
          <Image
            src={category.image}
            alt={category.title[l]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      {/* Titre en chevauchement */}
      <div className="relative z-10 -mt-16 flex justify-center px-5">
        <div className="max-w-[90%] rounded-sm bg-ink px-12 py-6 text-center sm:px-20 sm:py-7">
          <span className="block text-[0.72rem] tracking-[0.28em] text-[#5DC39B] uppercase">
            {l === "ar" ? "الخدمات" : "Services"}
          </span>
          <h1 className="mt-2 text-[clamp(1.6rem,3.6vw,2.6rem)] leading-[1.1] text-paper">
            {category.title[l]}
          </h1>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1150px] px-5 sm:px-8">
        {/* ───── Page simple : texte + image ───── */}
        {isSimple && category.body && (
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
            {category.bodyImage && (
              <Reveal>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
                  <Image
                    src={category.bodyImage}
                    alt={category.title[l]}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <div
                className={
                  category.bodyImage
                    ? ""
                    : "mx-auto max-w-[62ch] md:col-span-2"
                }
              >
                <div className="border-s-4 border-[#5DC39B] bg-ink px-7 py-5">
                  <h2 className="text-[0.9rem] tracking-[0.14em] text-paper uppercase">
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
              <div className="mt-14 grid gap-4 sm:grid-cols-2">
                {category.specialties.map((specialty, i) => {
                  const isLastOdd =
                    category.specialties.length % 2 === 1 &&
                    i === category.specialties.length - 1;

                  return (
                    <div
                      key={specialty.slug}
                      className={isLastOdd ? "sm:col-span-2" : ""}
                    >
                      <Reveal delay={(i % 2) * 0.08}>
                        <Link
                          href={`/services/${category.slug}/${specialty.slug}`}
                          className="group relative flex min-h-[290px] flex-col justify-end overflow-hidden bg-ink-soft p-6 sm:min-h-[340px] sm:p-7"
                        >
                          {specialty.image ? (
                            <Image
                              src={specialty.image}
                              alt={specialty.title[l]}
                              fill
                              sizes={
                                isLastOdd
                                  ? "(max-width: 1150px) 100vw, 1150px"
                                  : "(max-width: 640px) 100vw, 50vw"
                              }
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-[0.85rem] text-paper/60">
                              {specialty.title[l]}
                            </span>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/30 to-transparent transition-opacity duration-500 group-hover:from-ink" />

                          <div className="relative flex items-end justify-between gap-4">
                            <h2 className="text-[clamp(1.25rem,2.1vw,1.75rem)] leading-snug text-paper">
                              {specialty.title[l]}
                            </h2>

                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper/15 backdrop-blur-md transition-colors duration-500 group-hover:bg-[#5DC39B]">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-paper transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                                aria-hidden="true"
                              >
                                <path d="M7 17 17 7" />
                                <path d="M8 7h9v9" />
                              </svg>
                            </span>
                          </div>

                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#5DC39B] transition-transform duration-500 ease-out group-hover:scale-x-100 rtl:origin-right"
                          />
                        </Link>
                      </Reveal>
                    </div>
                  );
                })}
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-400 group-hover:-translate-x-1 rtl:-scale-x-100"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="m11 18-6-6 6-6" />
            </svg>
            {l === "ar"
              ? "كل الخدمات"
              : l === "en"
                ? "All services"
                : "Tous nos services"}
          </Link>
        </div>
      </div>
    </div>
  );
}
