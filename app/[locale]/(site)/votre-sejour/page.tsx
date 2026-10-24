import Image from "next/image";
import { notFound } from "next/navigation";
import SlideIn from "@/components/slide-in";
import Reveal from "@/components/reveal";
import { clinic } from "@/lib/content";
import { sejour } from "@/content/sejour";

/** Visuel associé à chaque section, dans l'ordre. */
const IMAGES = [
  "/images/sejour/visites.jpg",
  "/images/sejour/restauration.jpg",
  "/images/sejour/ambulance.jpg",
  "/images/sejour/coffre.jpg",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = sejour[locale as keyof typeof sejour];

  return {
    title: `${page?.title ?? "Votre séjour"} — Clinique Essalem`,
    description: page?.sections[0]?.body[0]?.slice(0, 160),
  };
}

export default async function SejourPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = sejour[locale as keyof typeof sejour];
  if (!page) notFound();

  return (
    <main className="overflow-x-hidden pb-(--spacing-section)">

      {/* Bandeau image pleine largeur */}
      <div className="relative h-[65svh] min-h-[280px] w-full bg-ink-soft">
        <Image
          src="/images/sejour/cover.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      {/* Titre qui chevauche l'image */}
      <div className="relative z-10 -mt-12 px-5 sm:px-6">
        <h1 className="mx-auto w-fit max-w-[90%] rounded-sm bg-ink px-12 py-5 text-center text-[clamp(1.6rem,3.6vw,2.6rem)] text-paper sm:px-20">
          {page.title}
        </h1>
      </div>

      <div className="mx-auto mt-20 max-w-[1150px] px-5 sm:px-8">

        {page.sections.map((section, i) => {
          const reversed = i % 2 === 1;

          return (
            <section
              key={section.id}
              id={section.id}
              className="mt-24 grid items-center gap-10 first:mt-0 md:grid-cols-2 md:gap-16"
            >
              {/* Image */}
              <SlideIn
                from={reversed ? "right" : "left"}
                className={`group relative ${reversed ? "md:order-2" : "md:order-1"}`}
              >
                <div className="relative h-[280px] w-full overflow-hidden bg-mist sm:h-[380px]">
                  <Image
                    src={IMAGES[i]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <span
                  className={`absolute -bottom-4 h-16 w-16 bg-leaf ${
                    reversed ? "-start-4" : "-end-4"
                  }`}
                  aria-hidden="true"
                />

                <span
                  className={`font-display absolute -top-7 text-[3.5rem] leading-none text-mist-deep ${
                    reversed ? "end-0" : "start-0"
                  }`}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </SlideIn>

              {/* Texte */}
              <SlideIn
                from={reversed ? "left" : "right"}
                delay={0.14}
                className={reversed ? "md:order-1" : "md:order-2"}
              >
                <h2 className="text-[0.92rem] tracking-[0.22em] text-leaf uppercase">
                  {section.label}
                </h2>
                <div className="mt-5 h-px w-12 bg-leaf" aria-hidden="true" />

                <div className="mt-6 space-y-5">
                  {section.body.map((p, j) => (
                    <p key={j} className="text-[0.98rem] leading-[1.8] text-ink">
                      {p}
                    </p>
                  ))}
                </div>
              </SlideIn>
            </section>
          );
        })}

        {/* Consignes */}
        <Reveal>
          <section className="mt-28 bg-ink p-8 sm:p-12">
            <h2 className="text-[0.92rem] tracking-[0.22em] text-leaf uppercase">
              {locale === "ar"
                ? "تعليمات ومعلومات"
                : locale === "en"
                  ? "Instructions and information for our patients"
                  : "Consignes et informations pour nos patients"}
            </h2>
            <div className="mt-5 h-px w-12 bg-leaf" aria-hidden="true" />

            <div className="mt-9 grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <p className="text-[0.98rem] leading-[1.8] text-paper/85">
                  {page.rulesIntro}
                </p>

                <ul className="mt-6 space-y-4">
                  {page.rules.map((rule) => (
                    <li
                      key={rule}
                      className="flex gap-4 text-[0.96rem] leading-[1.75] text-paper/70"
                    >
                      <span
                        className="mt-3 h-px w-5 shrink-0 bg-leaf"
                        aria-hidden="true"
                      />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-5 border-s border-white/12 ps-7">
                {page.notes.map((note) => (
                  <p
                    key={note}
                    className="text-[0.94rem] leading-[1.75] text-paper/55"
                  >
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Contact */}
        <Reveal>
          <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
            <p className="text-[1.05rem] text-stone">{page.question}</p>
            <a
              href={clinic.phoneHref}
              dir="ltr"
              className="group inline-flex min-h-13 items-center gap-3 rounded-full bg-ink px-8 font-medium text-paper transition-colors hover:bg-leaf-deep"
            >
              {clinic.phone}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-1 rtl:-scale-x-100" aria-hidden="true">
                <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
              </svg>
            </a>
          </div>
        </Reveal>

      </div>
    </main>
  );
}