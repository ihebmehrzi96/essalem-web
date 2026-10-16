import Link from "next/link";
import Counter from "@/components/counter";
import { clinic, figures, specialties } from "@/lib/content";
import Image from "next/image";

export default function Clinic() {
  return (
    <>
      {/* Bandeau défilant */}
      <div className="overflow-hidden border-y border-line py-5">
        <div className="rail-track flex w-max gap-10 whitespace-nowrap">
          {[...specialties, ...specialties].map((name, i) => (
            <span key={`${name}-${i}`} className="flex items-center gap-10 text-stone">
              <span className="font-display text-xl tracking-tight">{name}</span>
              <span className="h-1 w-1 rounded-full bg-leaf" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      {/* Présentation */}
      <section id="clinique" className="px-5 py-(--spacing-section) sm:px-6 md:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[minmax(0,0.75fr)_1fr] lg:gap-20">
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-ink-soft lg:min-h-[580px]">
            <Image
              src="/images/hall-accueil.jpg"
              alt="Le hall d'accueil de la Clinique Essalem"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-8">
            <h2 className="max-w-[16ch] text-[clamp(2rem,4.4vw,3.4rem)]">
              Une clinique pensée autour du patient
            </h2>

            <p className="max-w-[58ch] leading-relaxed text-stone">
              {clinic.intro}
            </p>

            <p className="max-w-[52ch] leading-relaxed">
              Renforcer la dynamique qualité-sécurité dans nos prestations est notre
              priorité.
            </p>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-7 border-t border-line pt-8">
              {figures.map((figure) => (
                <div key={figure.label}>
                  <dt className="sr-only">{figure.label}</dt>
                  <dd className="flex flex-col gap-1">
                    <Counter to={figure.value} suffix={figure.suffix} todo={figure.todo} />
                    <span className="text-[0.92rem] text-stone">{figure.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/presentation"
                className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 font-medium text-paper transition-colors hover:bg-leaf-deep"
              >
                Découvrir la clinique
              </Link>
              <Link
                href="/demarche-qualite"
                className="inline-flex min-h-12 items-center rounded-full border border-line px-6 font-medium transition-colors hover:border-ink"
              >
                Démarche qualité
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}