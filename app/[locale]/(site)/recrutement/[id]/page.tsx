import Link from "next/link";
import { notFound } from "next/navigation";
import { getOfferById } from "@/lib/jobs";


function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function OfferPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const offer = await getOfferById(id);

  if (!offer || !offer.active) notFound();

  return (
    <div className="px-3 pt-24 pb-3 sm:px-4 sm:pt-28 md:pt-32">
      <div className="mx-auto grid max-w-[1340px] gap-3 lg:grid-cols-[minmax(0,0.85fr)_1fr]">

        {/* Panneau gauche — fixe au défilement */}
        <section className="relative overflow-hidden rounded-[1.75rem] bg-ink p-8 sm:p-10 lg:sticky lg:top-28 lg:flex lg:h-[calc(100svh-8rem)] lg:flex-col lg:justify-between">
          <div
            className="pointer-events-none absolute -bottom-32 -left-24 h-[400px] w-[400px] rounded-full bg-leaf/20 blur-[130px]"
            aria-hidden="true"
          />

          <div className="relative">
            <Link
              href="/recrutement"
              className="group inline-flex items-center gap-2 text-[0.88rem] text-white/50 transition-colors hover:text-paper"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-400 group-hover:-translate-x-1" aria-hidden="true">
                <path d="M19 12H5" /><path d="m11 18-6-6 6-6" />
              </svg>
              Recrutement
            </Link>

            <h1 className="mt-10 max-w-[15ch] text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.02] text-paper">
              {offer.title}
            </h1>
          </div>

          {/* Métadonnées, alignées en bas du panneau */}
                    <dl className="relative mt-12 grid grid-cols-2 gap-y-7 border-t border-white/12 pt-8">
            <div>
              <dt className="text-[0.74rem] tracking-[0.14em] text-white/40">
                RÉFÉRENCE
              </dt>
              <dd className="mt-1.5 text-[0.98rem] text-paper">{offer.ref}</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] tracking-[0.14em] text-white/40">
                PUBLIÉE LE
              </dt>
              <dd className="mt-1.5 text-[0.98rem] text-paper">
                {formatDate(offer.createdAt)}
              </dd>
            </div>
          </dl>
        </section>

        {/* Panneau droit — contenu */}
        <section className="rounded-[1.75rem] bg-mist p-8 sm:p-10 lg:p-14">
          <span className="text-[0.74rem] tracking-[0.14em] text-stone">
            DESCRIPTIF DU POSTE
          </span>

          <div className="mt-7 text-[1.08rem] leading-[1.8] whitespace-pre-wrap">
            {offer.body}
          </div>

          <div className="mt-14 rounded-2xl bg-paper p-7 sm:p-8">
            <h2 className="text-[1.3rem] leading-snug">
              Prêt à nous rejoindre&nbsp;?
            </h2>
            <p className="mt-3 max-w-[46ch] text-[0.96rem] leading-relaxed text-stone">
              Préparez votre CV, votre lettre de motivation et vos diplômes.
              Le dépôt se fait en ligne, en moins de cinq minutes.
            </p>

            <Link
              href={`/recrutement/candidature?offre=${offer.id}`}
              className="group mt-7 inline-flex min-h-13 items-center gap-3 rounded-full bg-ink px-8 font-medium text-paper transition-colors hover:bg-leaf-deep"
            >
              Postuler à cette offre
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
              </svg>
            </Link>

            <p className="mt-6 border-t border-line pt-5 text-[0.88rem] text-stone">
              Une question sur ce poste&nbsp;?{" "}
              <a
                href="tel:+21673210375"
                className="font-medium text-ink underline underline-offset-4 transition-colors hover:text-leaf"
              >
                +216 73 210 375
              </a>
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}