import Link from "next/link";
import { listActiveOffers } from "@/lib/jobs";
import Reveal from "@/components/reveal";
import Image from "next/image";
export const instant = false;

export const metadata = {
  title: "Recrutement — Clinique Essalem",
  description:
    "Consultez les offres d'emploi de la Clinique Essalem à Sousse et postulez en ligne.",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

const values = [
  {
    title: "Des équipes qui durent",
    body: "Beaucoup de nos collaborateurs sont là depuis plus de dix ans. La stabilité des équipes fait la qualité des soins.",
  },
  {
    title: "Un plateau technique complet",
    body: "Imagerie, laboratoire, blocs opératoires : vous travaillez avec les moyens nécessaires à votre métier.",
  },
  {
    title: "Au cœur de Sousse",
    body: "Place du Maghreb Arabe, accessible et bien desservie, dans l'un des quartiers les plus vivants de la ville.",
  },
];

export default async function RecrutementPage() {
  const offers = await listActiveOffers();

  return (
    <>
      {/* Héro */}
        <section className="relative overflow-hidden bg-ink px-5 pt-36 pb-20 sm:px-6 md:px-12 md:pt-48 md:pb-28">
        {/* Image de couverture */}
        <Image
          src="/images/recrutement-cover.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Voile sombre pour garder le texte lisible */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/65 to-ink/45" />

        <div className="relative mx-auto max-w-[1280px]">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-[0.82rem] text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
            </span>
            {offers.length === 0
              ? "Aucune offre ouverte actuellement"
              : `${offers.length} poste${offers.length > 1 ? "s" : ""} à pourvoir`}
          </span>

          <h1 className="mt-7 max-w-[16ch] text-[clamp(2.4rem,6.5vw,5rem)] text-paper">
            Construisons la suite ensemble
          </h1>

          <p className="mt-6 max-w-[54ch] text-[1.08rem] leading-relaxed text-white/60">
            La Clinique Essalem recrute des professionnels engagés, soucieux de
            la qualité des soins et du bien-être des patients.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#offres"
              className="inline-flex min-h-13 items-center rounded-full bg-paper px-7 font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Voir les offres
            </a>
            <Link
              href="/recrutement/candidature"
              className="inline-flex min-h-13 items-center rounded-full border border-white/25 px-7 font-medium text-paper transition-colors hover:bg-white/10"
            >
              Candidature spontanée
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi nous rejoindre */}
      <section className="px-5 py-(--spacing-section) sm:px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-px overflow-hidden rounded-3xl bg-line md:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="h-full bg-paper p-8 md:p-9">
                  <h2 className="text-[1.25rem] leading-snug">{value.title}</h2>
                  <p className="mt-3 text-[0.96rem] leading-relaxed text-stone">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Offres */}
      <section id="offres" className="bg-mist px-5 py-(--spacing-section) sm:px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">

          <Reveal>
            <h2 className="text-[clamp(1.9rem,4vw,3rem)]">
              Nos offres ouvertes
            </h2>
          </Reveal>

          {offers.length === 0 ? (
            <div className="mt-10 rounded-3xl bg-paper p-10">
              <p className="max-w-[52ch] leading-relaxed text-stone">
                Aucune offre n&apos;est ouverte pour le moment. Vous pouvez
                néanmoins nous adresser une candidature spontanée&nbsp;: elle
                sera conservée et étudiée dès qu&apos;un poste correspondra à
                votre profil.
              </p>
            </div>
          ) : (
            <ul className="mt-10 flex flex-col gap-2.5">
              {offers.map((offer, i) => (
                <Reveal key={offer.id} delay={i * 0.06}>
                  <li>
                    <Link
                      href={`/recrutement/${offer.id}`}
                      className="group relative flex flex-wrap items-center gap-5 overflow-hidden rounded-2xl bg-paper p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/8 sm:p-7"
                    >
                      {/* Barre d'accent qui se déploie au survol */}
                      <span
                        className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-leaf transition-transform duration-500 group-hover:scale-y-100"
                        aria-hidden="true"
                      />

                      <div className="min-w-[220px] flex-1">
                        <h3 className="text-[clamp(1.25rem,2.1vw,1.7rem)] leading-snug transition-transform duration-500 group-hover:translate-x-2">
                          {offer.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-[0.86rem] text-stone transition-transform duration-500 group-hover:translate-x-2">
                          <span>Réf. {offer.ref}</span>
                          <span aria-hidden="true">·</span>
                          <span>Publiée le {formatDate(offer.createdAt)}</span>
                        </div>
                      </div>

                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-ink group-hover:bg-ink">
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-stone transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
                          aria-hidden="true"
                        >
                          <path d="M7 17 17 7" />
                          <path d="M8 7h9v9" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          )}

        </div>
      </section>

      {/* Candidature spontanée */}
      <section className="px-5 py-(--spacing-section) sm:px-6 md:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-3xl border border-line p-8 sm:p-12">
            <div>
              <h2 className="max-w-[20ch] text-[clamp(1.6rem,3.2vw,2.4rem)]">
                Aucune offre ne correspond à votre profil&nbsp;?
              </h2>
              <p className="mt-4 max-w-[48ch] leading-relaxed text-stone">
                Envoyez-nous votre dossier. Il sera étudié par notre service des
                ressources humaines et conservé pour nos futurs recrutements.
              </p>
            </div>

            <Link
              href="/recrutement/candidature"
              className="group inline-flex min-h-13 shrink-0 items-center gap-3 rounded-full bg-ink px-8 font-medium text-paper transition-colors hover:bg-leaf-deep"
            >
              Déposer ma candidature
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}