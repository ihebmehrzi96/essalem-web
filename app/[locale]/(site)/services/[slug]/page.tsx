import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { services, serviceDetails, clinic } from "@/lib/content";
import Reveal from "@/components/reveal";
export const instant = false;
/** Génère les cinq pages à la construction. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  const service = services.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) notFound();

  const t = await getTranslations({ locale, namespace: "services" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      {/* En-tête avec visuel */}
      <section className="relative h-[52svh] min-h-[380px] overflow-hidden">
        {service.image && (
          <Image
            src={service.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />

        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 sm:px-6 md:px-12 md:pb-16">
          <div className="mx-auto max-w-[1280px]">
            <nav className="flex flex-wrap items-center gap-2 text-[0.86rem] text-paper/55">
              <Link href="/services" className="transition-colors hover:text-paper">
                {tn("services")}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-paper">{t(`${service.key}.title`)}</span>
            </nav>

            <h1 className="mt-5 max-w-[20ch] text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.03] text-paper">
              {t(`${service.key}.title`)}
            </h1>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="px-5 py-(--spacing-section) sm:px-6 md:px-12">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">

          <div>
            <Reveal>
              <p className="max-w-[62ch] text-[1.15rem] leading-[1.75]">
                {detail.intro}
              </p>
            </Reveal>

            {detail.sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.06}>
                <div className="mt-12 border-t border-line pt-10">
                  <h2 className="text-[1.5rem]">{section.title}</h2>
                  <p className="mt-4 max-w-[62ch] leading-[1.75] whitespace-pre-wrap text-stone">
                    {section.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Encadré contact */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-mist p-7">
              <h2 className="text-[1.1rem] leading-snug">
                Prendre rendez-vous
              </h2>
              <p className="mt-3 text-[0.93rem] leading-relaxed text-stone">
                Notre accueil vous oriente vers le praticien adapté à votre
                situation.
              </p>

              <a
                href={clinic.phoneHref}
                dir="ltr"
                className="mt-6 flex min-h-13 w-full items-center justify-center rounded-full bg-ink px-6 font-medium text-paper transition-colors hover:bg-leaf-deep"
              >
                {clinic.phone}
              </a>

              <p className="mt-5 border-t border-mist-deep pt-5 text-[0.86rem] text-stone">
                Urgences ouvertes 24h/24, 7j/7
              </p>
            </div>
          </aside>

        </div>
      </section>

      {/* Autres services */}
      <section className="bg-mist px-5 py-(--spacing-section) sm:px-6 md:px-12">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)]">
            {tn("services")}
          </h2>

          <ul className="mt-8">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex items-baseline justify-between gap-6 border-b border-mist-deep py-5 first:border-t"
                >
                  <span className="font-display text-[1.3rem] leading-snug tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2">
                    {t(`${other.key}.title`)}
                  </span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-stone transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-leaf rtl:-scale-x-100" aria-hidden="true">
                    <path d="M7 17 17 7" /><path d="M8 7h9v9" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}