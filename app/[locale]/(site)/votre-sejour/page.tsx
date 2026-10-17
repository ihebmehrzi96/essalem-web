import Image from "next/image";
import SlideIn from "@/components/slide-in";
import Reveal from "@/components/reveal";
import { clinic } from "@/lib/content";

export const metadata = {
  title: "Votre séjour — Clinique Essalem",
  description:
    "Visites, hébergement, restauration, transport sanitaire et consignes pratiques pour votre hospitalisation à la Clinique Essalem.",
};

const sections = [
  {
    id: "visites",
    label: "Visites",
    image: "/images/sejour/visites.jpg",
    body: [
      "Les patients hospitalisés peuvent recevoir les visites de leurs proches tous les jours de la semaine de 10h à 22h pour toutes les unités de soins conventionnelles. Les visites en réanimation et en soins intensifs sont autorisées de 15h à 17h.",
    ],
    tags: ["10h — 22h", "Réanimation : 15h — 17h"],
  },
  {
    id: "hebergement",
    label: "Hébergement et restauration",
    image: "/images/sejour/restauration.jpg",
    body: [
      "Votre prise en charge peut se faire dans le cadre d'une hospitalisation classique ou en hôpital de jour. Une chambre vous sera proposée selon votre choix et en fonction des disponibilités. Un de vos proches peut être hébergé à vos côtés et vous accompagner durant votre séjour, sauf contre-indication médicale.",
      "Nos cuisiniers et nos diététiciennes s'efforceront de satisfaire vos besoins en vous proposant des plats équilibrés et bien étudiés, préparés avec des produits frais et servis dans des plateaux isothermes.",
    ],
    tags: ["Chambre individuelle", "Chambre double", "Chambre premium"],
  },
  {
    id: "transport",
    label: "Transport sanitaire",
    image: "/images/sejour/ambulance.jpg",
    body: [
      "Nous disposons d'une ambulance médicalisée qui est mise à votre disposition pour assurer vos transports sanitaires.",
    ],
    tags: ["Ambulance médicalisée"],
  },
  {
    id: "objets",
    label: "Biens et objets de valeur",
    image: "/images/sejour/coffre.jpg",
    body: [
      "Dans le but d'assurer la sécurité de tous vos objets de valeur tels vos bijoux, vos portefeuilles, vos téléphones…, nous disposons d'une procédure et d'un coffre-fort pour y déposer tous ces objets.",
      "Les objets et biens non déclarés demeurent sous la responsabilité du patient en cas de perte.",
    ],
    tags: ["Coffre-fort", "Procédure de dépôt"],
  },
];

const rules = [
  "Ne pas fumer dans l'enceinte de l'établissement (décret n° 98-2248 du 16/11/98)",
  "Ne pas amener ni consommer de boissons alcoolisées",
  "Ne pas ramener des animaux dans l'enceinte de l'établissement",
  "Ne pas ramener des fleurs coupées ou plantes vertes en pot au service de réanimation",
];

const notes = [
  "Un livret d'accueil vous est remis à votre admission",
  "Le plan d'évacuation est affiché dans différents endroits de l'établissement et dans votre chambre",
  "La tarification des prestations et le règlement intérieur sont aussi affichés dans votre chambre",
];

export default function SejourPage() {
  return (
    <main className="overflow-x-hidden pb-(--spacing-section)">

      {/* Couverture */}
      <div className="relative h-[58svh] min-h-[360px] w-full bg-ink-soft">
        <Image
          src="/images/sejour/cover.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 sm:px-8 md:pb-16">
          <div className="mx-auto max-w-[1150px]">
            <span className="text-[0.8rem] tracking-[0.24em] text-paper/70 uppercase">
              Votre hospitalisation
            </span>
            <h1 className="mt-4 text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.98] text-paper">
              Votre séjour
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-[1150px] px-5 sm:px-8">

        {sections.map((section, i) => {
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
                    src={section.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Carré d'accent en débord */}
                <span
                  className={`absolute -bottom-4 h-16 w-16 bg-leaf ${
                    reversed ? "-start-4" : "-end-4"
                  }`}
                  aria-hidden="true"
                />

                {/* Numéro */}
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
                  {section.body.map((p) => (
                    <p key={p} className="text-[0.98rem] leading-[1.8] text-ink">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Repères */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {section.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-4 py-2 text-[0.84rem] text-stone transition-colors hover:border-leaf hover:text-leaf-deep"
                    >
                      {tag}
                    </span>
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
              Consignes et informations pour nos patients
            </h2>
            <div className="mt-5 h-px w-12 bg-leaf" aria-hidden="true" />

            <div className="mt-9 grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <p className="text-[0.98rem] leading-[1.8] text-paper/85">
                  Pour votre sécurité, nous vous prions de respecter le
                  règlement intérieur de notre établissement et de suivre les
                  consignes suivantes&nbsp;:
                </p>

                <ul className="mt-6 space-y-4">
                  {rules.map((rule) => (
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
                {notes.map((note) => (
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
            <p className="text-[1.05rem] text-stone">
              Une question sur votre séjour&nbsp;?
            </p>
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