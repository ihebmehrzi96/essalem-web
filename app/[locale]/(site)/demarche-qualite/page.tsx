import Image from "next/image";
import { notFound } from "next/navigation";
import { qualite } from "@/content/qualite";

/** Toujours en français, quelle que soit la langue du site. */
const CERTIFICATIONS = [
  {
    src: "/images/qualite/iso-9001.jpg",
    caption: "Certification ISO 9001 version 2015",
  },
  {
    src: "/images/qualite/accreditation-platine.jpg",
    caption: "Accréditation niveau platine",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = qualite[locale as keyof typeof qualite];

  return {
    title: `${page?.title ?? "Démarche qualité"} — Clinique Essalem`,
    description: page?.system.paragraphs[0]?.slice(0, 160),
  };
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[0.98rem] leading-[1.8] text-stone">
      <span
        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf"
        aria-hidden="true"
      />
      <span>{children}</span>
    </li>
  );
}

export default async function QualitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = qualite[locale as keyof typeof qualite];
  if (!page) notFound();

  return (
    <main className="pb-(--spacing-section)">

      {/* Bandeau image pleine largeur */}
      <div className="relative h-[65svh] min-h-[280px] w-full bg-ink-soft">
        <Image
          src="/images/qualite/cover.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      {/* Titre qui chevauche l'image */}
      <div className="relative z-10 -mt-12 px-5 sm:px-6">
        <h1 className="mx-auto w-fit max-w-[90%] rounded-sm bg-ink px-12 py-5 text-center text-[clamp(1.6rem,3.6vw,2.6rem)] text-paper sm:px-20">
          {page.title}
        </h1>
      </div>

      {/* Certifications — plus larges que le corps de texte */}
      <div className="mx-auto mt-16 max-w-[1000px] px-5 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2">
          {CERTIFICATIONS.map((item) => (
            <figure key={item.src}>
              <div className="relative h-[380px] w-full overflow-hidden bg-mist sm:h-[440px]">
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, 480px"
                  className="object-contain p-4"
                />
              </div>
              <figcaption
                dir="ltr"
                className="mt-4 text-center text-[0.95rem] text-stone"
              >
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[760px] px-5 sm:px-6">

        {/* Système de management */}
        <section className="mt-20">
          <h2 className="text-center text-[1.6rem]">{page.system.heading}</h2>
          <div className="mx-auto mt-5 h-px w-16 bg-leaf" aria-hidden="true" />

          {page.system.paragraphs.map((text, i) => (
            <p
              key={i}
              className={`text-[0.98rem] leading-[1.9] text-stone ${
                i === 0 ? "mt-8" : "mt-6"
              }`}
            >
              {text}
            </p>
          ))}
        </section>

        {/* Projet qualité */}
        <section className="mt-16 border-t border-line pt-14">
          <h2 className="text-center text-[1.6rem]">{page.project.heading}</h2>
          <div className="mx-auto mt-5 h-px w-16 bg-leaf" aria-hidden="true" />

          <h3 className="mt-10 text-[1.15rem] font-semibold">
            {page.project.missionTitle}
          </h3>
          <ul className="mt-4">
            <Bullet>{page.project.mission}</Bullet>
          </ul>

          <h3 className="mt-10 text-[1.15rem] font-semibold">
            {page.project.visionTitle}
          </h3>
          <ul className="mt-4 space-y-3">
            {page.project.vision.map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>

          <h3 className="mt-10 text-[1.15rem] font-semibold">
            {page.project.valuesTitle}
          </h3>
          <ul className="mt-4 space-y-3">
            {page.project.values.map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
        </section>

        {/* Accréditation Platine */}
        <section className="mt-16 border-t border-line pt-14">
          <h2 className="text-center text-[1.6rem]">{page.platine.heading}</h2>
          <div className="mx-auto mt-5 h-px w-16 bg-leaf" aria-hidden="true" />

          {page.platine.intro.map((text, i) => (
            <p
              key={i}
              className={`text-[0.98rem] leading-[1.9] text-stone ${
                i === 0 ? "mt-10" : "mt-6"
              }`}
            >
              {text}
            </p>
          ))}

          <p className="mt-10 text-[1.02rem] text-ink">
            {page.platine.guaranteeTitle}
          </p>
          <ul className="mt-4 space-y-3">
            {page.platine.guarantees.map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>

          <h3 className="mt-12 text-[1.15rem] font-semibold">
            {page.platine.commitmentTitle}
          </h3>
          <p className="mt-4 text-[0.98rem] leading-[1.9] text-stone">
            {page.platine.commitment}
          </p>

          <p className="mt-10 text-[1.02rem] text-ink">
            {page.platine.expectTitle}
          </p>
          <ul className="mt-4 space-y-3">
            {page.platine.expect.map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
        </section>

      </div>
    </main>
  );
}