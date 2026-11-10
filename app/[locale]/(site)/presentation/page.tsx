import Image from "next/image";
import { notFound } from "next/navigation";
import { presentation } from "@/content/pages";
import { Link } from "@/i18n/routing";

type Locale = "fr" | "ar" | "en";

const HIGHLIGHTS: Record<
  Locale,
  { value: string; label: string }[]
> = {
  fr: [
    { value: "105", label: "Lits d'hospitalisation" },
    { value: "8", label: "Salles opératoires" },
    { value: "ISO 9001", label: "Certifiée depuis 2009" },
    { value: "Platine", label: "Accréditation 2024" },
  ],
  ar: [
    { value: "105", label: "سرير استشفائي" },
    { value: "8", label: "قاعات عمليات جراحية" },
    { value: "ISO 9001", label: "شهادة جودة منذ 2009" },
    { value: "بلاتيني", label: "اعتماد صحي 2024" },
  ],
  en: [
    { value: "105", label: "Inpatient beds" },
    { value: "8", label: "Operating rooms" },
    { value: "ISO 9001", label: "Certified since 2009" },
    { value: "Platinum", label: "2024 Accreditation" },
  ],
};

const QUALITY_CTA: Record<Locale, string> = {
  fr: "Découvrir notre démarche qualité",
  ar: "اكتشف منهجية الجودة لدينا",
  en: "Explore our quality commitment",
};

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
  const lang = (locale as Locale) in presentation ? (locale as Locale) : null;
  if (!lang) notFound();

  const page = presentation[lang];
  const stats = HIGHLIGHTS[lang];

  return (
    <div className="pb-24 sm:pb-32">
      {/* Bandeau image pleine largeur */}
      <div className="relative h-[62svh] min-h-[340px] w-full overflow-hidden bg-ink-soft">
        <Image
          src="/images/presentation-cover.jpg"
          alt="Clinique Essalem Sousse"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/65" />
      </div>

      {/* Bloc Titre architectural qui chevauche l'image */}
      <div className="relative z-10 -mt-16 px-5 sm:px-6 md:px-12">
        <div className="mx-auto flex w-fit max-w-[92%] flex-col items-center border-t-4 border-[#5DC39B] bg-ink px-10 py-6 text-center shadow-xl sm:px-20 sm:py-8">
          <span className="mb-2 inline-flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#5DC39B]">
            <span>✦</span>
            <span>{page.eyebrow}</span>
          </span>
          <h1 className="font-display text-[clamp(2rem,4.2vw,3.2rem)] leading-none tracking-wide text-paper uppercase">
            {page.title}
          </h1>
        </div>
      </div>

      {/* Grille éditoriale principale */}
      <div className="mx-auto mt-16 max-w-[1280px] px-5 sm:mt-24 sm:px-6 md:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Colonne gauche : Récit éditorial + Encadré Qualité */}
          <div className="lg:col-span-7">
            {/* Paragraphe d'introduction mis en avant */}
            <p className="border-s-2 border-[#5DC39B] ps-5 font-body text-[clamp(1.15rem,1.8vw,1.4rem)] font-medium leading-[1.6] text-ink sm:ps-6">
              {page.paragraphs[0]}
            </p>

            {/* Corps de texte */}
            <div className="mt-8 space-y-6 text-[1.02rem] leading-[1.85] text-stone">
              {page.paragraphs.slice(1, 4).map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            {/* Encadré Qualité & Accréditation Platine (Paragraphe 5) */}
            <div className="mt-10 border border-[#5DC39B]/45 bg-white/65 p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 bg-[#5DC39B] px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white">
                  <span>✓</span>
                  <span>ISO 9001</span>
                </span>
                <span className="inline-flex items-center gap-1.5 border border-[#5DC39B] bg-[#5DC39B]/10 px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink">
                  <span>✦</span>
                  <span>2024</span>
                </span>
              </div>

              <p className="text-[0.98rem] leading-[1.8] text-ink/90">
                {page.paragraphs[4]}
              </p>

              <div className="mt-6">
                <Link
                  href="/demarche-qualite"
                  className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-[#5DC39B]"
                >
                  <span>{QUALITY_CTA[lang]}</span>
                  <span aria-hidden="true" className="text-[#5DC39B]">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Colonne droite : Chiffres clés + Photo du hall */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            {/* Grille architecturale 2x2 des chiffres clés */}
            <div className="grid grid-cols-2 border-t border-s border-[#5DC39B]/45 bg-white/50">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between border-e border-b border-[#5DC39B]/45 p-5 sm:p-6"
                >
                  <span className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-[#5DC39B]">
                    0{idx + 1}
                  </span>
                  <div className="mt-4">
                    <span className="font-display block text-[clamp(1.9rem,3vw,2.6rem)] leading-none tracking-wide text-ink">
                      {item.value}
                    </span>
                    <span className="mt-2 block text-xs font-medium text-stone sm:text-sm">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Photo verticale du hall d'accueil */}
            <div className="relative h-[440px] w-full overflow-hidden border border-[#5DC39B]/40 bg-mist sm:h-[520px]">
              <Image
                src="/images/hall-accueil.jpg"
                alt="Hall d'accueil — Clinique Essalem"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
