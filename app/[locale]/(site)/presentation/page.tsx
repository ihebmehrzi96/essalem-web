import Image from "next/image";
import { notFound } from "next/navigation";
import { presentation } from "@/content/pages";
export const instant = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = presentation[locale as keyof typeof presentation];

  return {
    title: `${page?.title ?? "Présentation"} — Clinique Essalem`,
    description: page?.paragraphs[0]?.slice(0, 160),
  };
}

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = presentation[locale as keyof typeof presentation];
  if (!page) notFound();

  return (
    <main className="pb-(--spacing-section)">

      {/* Bandeau image pleine largeur */}
      <div className="relative h-[65svh] min-h-[280px] w-full bg-ink-soft">
        <Image
          src="/images/presentation-cover.jpg"
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

      {/* Contenu */}
      <div className="mx-auto mt-16 max-w-[680px] px-5 sm:px-6">
        {page.paragraphs.map((text, i) => (
          <p
            key={i}
            className={`text-center text-[0.98rem] leading-[1.9] text-stone ${
              i === 0 ? "" : "mt-7"
            }`}
          >
            {text}
          </p>
        ))}

        {/* Photo verticale */}
        <div className="relative mt-14 h-[480px] w-full overflow-hidden bg-mist sm:h-[560px]">
          <Image
            src="/images/hall-accueil.jpg"
            alt=""
            fill
            sizes="(max-width: 680px) 100vw, 680px"
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
}