import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { findSpecialty, allSpecialtyPaths, type Locale } from "@/content/services";
import { clinic } from "@/lib/content";
import Reveal from "@/components/reveal";

export const instant = false;

export function generateStaticParams() {
  return allSpecialtyPaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; specialty: string; locale: string }>;
}) {
  const { slug, specialty, locale } = await params;
  const found = findSpecialty(slug, specialty);
  const l = locale as Locale;

  return {
    title: `${found?.specialty.title[l] ?? "Spécialité"} — Clinique Essalem`,
    description: found?.specialty.body?.[l]?.slice(0, 160),
  };
}

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<{ slug: string; specialty: string; locale: string }>;
}) {
  const { slug, specialty, locale } = await params;
  const l = locale as Locale;

  const found = findSpecialty(slug, specialty);
  if (!found) notFound();

  const { category, specialty: item, parent } = found;

  return (
    <main className="pb-(--spacing-section)">

      {/* Bandeau */}
      <div className="relative h-[46svh] min-h-[260px] w-full bg-ink-soft">
        {item.image && (
          <Image
            src={item.image}
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
            {parent ? parent.title[l] : category.title[l]}
          </span>
          <h1 className="mt-3 text-[clamp(1.8rem,4.2vw,3rem)] leading-[1.15] text-paper">
            {item.title[l]}
          </h1>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1000px] px-5 sm:px-8">

        {/* Visuel + texte */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
            {item.image && (
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>

          <div>
            <div className="bg-leaf px-8 py-6">
              <h2 className="text-[0.86rem] tracking-[0.14em] text-paper uppercase">
                {item.title[l]}
              </h2>
            </div>

            {item.body && (
              <p className="mt-7 text-[0.95rem] leading-[1.85] whitespace-pre-wrap text-ink">
                {item.body[l]}
              </p>
            )}
          </div>
        </div>

        {/* Sous-spécialités */}
        {item.children && item.children.length > 0 && (
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {item.children.map((child, i) => (
              <Reveal key={child.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${category.slug}/${child.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden bg-ink-soft"
                >
                  {child.image && (
                    <Image
                      src={child.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent transition-opacity duration-500 group-hover:from-ink/90" />

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-[1.15rem] leading-snug text-paper">
                      {child.title[l]}
                    </h3>
                  </div>

                  <span
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-leaf transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {/* Retour et contact */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
          <Link
            href={
              parent
                ? `/services/${category.slug}/${parent.slug}`
                : `/services/${category.slug}`
            }
            className="group inline-flex items-center gap-2.5 font-medium transition-colors hover:text-leaf"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-400 group-hover:-translate-x-1 rtl:-scale-x-100" aria-hidden="true">
              <path d="M19 12H5" /><path d="m11 18-6-6 6-6" />
            </svg>
            {parent ? parent.title[l] : category.title[l]}
          </Link>

          <a
            href={clinic.phoneHref}
            dir="ltr"
            className="inline-flex min-h-13 items-center rounded-full bg-ink px-8 font-medium text-paper transition-colors hover:bg-leaf-deep"
          >
            {clinic.phone}
          </a>
        </div>

      </div>
    </main>
  );
}