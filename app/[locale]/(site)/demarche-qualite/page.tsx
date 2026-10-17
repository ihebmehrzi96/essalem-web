import Image from "next/image";

export const metadata = {
  title: "Démarche qualité — Clinique Essalem",
  description:
    "Certification ISO 9001 version 2015 et accréditation niveau Platine de l'INEAS : la Clinique Essalem s'engage pour la qualité et la sécurité des soins.",
};

const certifications = [
  {
    src: "/images/qualite/iso-9001.jpg",
    caption: "Certification ISO 9001 version 2015",
  },
  {
    src: "/images/qualite/accreditation-platine.jpg",
    caption: "Accréditation niveau platine",
  },
];

export default function QualitePage() {
  return (
    <main className="pb-(--spacing-section)">

      {/* Bandeau image pleine largeur */}
      <div className="relative h-[55svh] min-h-[380px] w-full bg-ink-soft">
        <Image
          src="/images/qualite/cover.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      {/* Titre qui chevauche l'image */}
      <div className="relative z-10 -mt-12 px-5 sm:px-6">
        <h1 className="mx-auto w-fit max-w-[90%] rounded-sm bg-ink px-12 py-5 text-center text-[clamp(1.6rem,3.6vw,2.6rem)] text-paper sm:px-20">
          Démarche qualité
        </h1>
      </div>

      <div className="mx-auto mt-16 max-w-[760px] px-5 sm:px-6">

        {/* Certifications */}
        <div className="grid gap-8 sm:grid-cols-2">
          {certifications.map((item) => (
            <figure key={item.caption}>
              <div className="relative h-[260px] w-full overflow-hidden rounded-sm bg-mist">
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-contain p-3"
                />
              </div>
              <figcaption className="mt-3 text-center text-[0.9rem] text-stone">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Système de management de la qualité */}
        <section className="mt-16">
          <h2 className="text-center text-[1.6rem]">
            Système de management de la qualité
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-leaf" aria-hidden="true" />

          <p className="mt-8 text-[0.98rem] leading-[1.9] text-stone">
            La qualité des soins suscite de nos jours un intérêt de plus en plus
            important et constitue un enjeu primordial pour le système de santé
            et pour la médecine contemporaine.
          </p>

          <p className="mt-6 text-[0.98rem] leading-[1.9] text-stone">
            Le management de la qualité et la gestion des risques devient un
            impératif non seulement pour la performance, mais aussi pour la
            survie des organisations dans un environnement qui exerce de plus en
            plus de pression sur le système de santé. Nous assistons à une
            modification des exigences des usagers où la relation
            soignant-soigné, autrefois basée sur une rencontre entre la
            confiance du soigné et la conscience du soignant, est devenue une
            confrontation entre une exigence et une méfiance de la part du
            soigné.
          </p>

          <p className="mt-6 text-[0.98rem] leading-[1.9] text-stone">
            Nous assistons également à une modification des exigences des
            financiers, des instances de tutelle et du politique dans un
            environnement de concurrence, de mondialisation et de globalisation
            alimenté par les nouvelles technologies de l&apos;information et de
            la communication.
          </p>

          <p className="mt-6 text-[0.98rem] leading-[1.9] text-stone">
            Notre projet qualité est lancé sous le signe de la qualité et de
            l&apos;accréditation, où l&apos;usager représente le centre
            d&apos;intérêt de l&apos;établissement et des professionnels de
            santé qui s&apos;efforceront de lui offrir des soins de qualité en
            intégrant la maîtrise des risques, les vigilances sanitaires et la
            gestion de la douleur, en veillant au respect de ses droits, à sa
            bientraitance et à l&apos;évitement de sa maltraitance.
          </p>

          <p className="mt-6 text-[0.98rem] leading-[1.9] text-stone">
            Ce projet veille également à l&apos;amélioration de
            l&apos;information et de la communication interne et externe, au
            développement professionnel continu, à la fidélisation de nos chers
            médecins et à l&apos;attraction d&apos;une patientèle étrangère dans
            le cadre de la promotion de nos prestations aux pays voisins
            maghrébins, en Afrique et en Europe.
          </p>
        </section>

        {/* Projet qualité */}
        <section className="mt-16 border-t border-line pt-14">
          <h2 className="text-center text-[1.6rem]">Projet qualité</h2>
          <div className="mx-auto mt-5 h-px w-16 bg-leaf" aria-hidden="true" />

          <h3 className="mt-10 text-[1.15rem] font-semibold">Notre mission</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3 text-[0.98rem] leading-[1.8] text-stone">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden="true" />
              <span>
                <strong className="text-ink">Promouvoir</strong> des prestations
                de soins de qualité en veillant sur la sécurité des usagers et
                des professionnels de santé.
              </span>
            </li>
          </ul>

          <h3 className="mt-10 text-[1.15rem] font-semibold">
            Notre vision, orientée selon quatre axes
          </h3>
          <ul className="mt-4 space-y-3">
            {[
              ["Offrir", "à nos patients les soins les mieux adaptés à leur état de santé."],
              ["Être", "un lieu privilégié de suivi et d'acquisition de technologies de santé qui ne sont pas offertes dans notre région, en participant aux activités de planification et de suivi des besoins en santé de la région."],
              ["Ouvrir", "notre établissement sur son environnement pour faciliter la communication et la circulation de l'information avec nos partenaires des secteurs public et privé de la santé et avec les usagers."],
              ["Renforcer", "notre démarche qualité en vue du maintien et de la consolidation de l'accréditation de notre établissement et de la promotion de nos services à des patients étrangers."],
            ].map(([verb, rest]) => (
              <li key={verb} className="flex gap-3 text-[0.98rem] leading-[1.8] text-stone">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden="true" />
                <span>
                  <strong className="text-ink">{verb}</strong> {rest}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 text-[1.15rem] font-semibold">Nos valeurs</h3>
          <ul className="mt-4 space-y-3">
            {[
              ["La compétence", "de chacun d'entre nous dans son domaine."],
              ["Le respect", "des usagers, des professionnels de santé, de nos partenaires et des autorités locales et nationales."],
              ["L'ambition et la volonté", "de viser l'excellence, de nous dépasser et d'être le moteur du changement et de l'innovation."],
            ].map(([label, rest]) => (
              <li key={label} className="flex gap-3 text-[0.98rem] leading-[1.8] text-stone">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden="true" />
                <span>
                  <strong className="text-ink">{label}</strong> {rest}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Accréditation Platine */}
        <section className="mt-16 border-t border-line pt-14">
          <h2 className="text-center text-[1.6rem]">Accréditation Platine</h2>
          <div className="mx-auto mt-5 h-px w-16 bg-leaf" aria-hidden="true" />

          <p className="mt-10 text-[0.98rem] leading-[1.9] text-stone">
            Un nouveau palier d&apos;excellence pour la clinique ESSALEM
            Sousse&nbsp;: en décrochant l&apos;accréditation niveau platine de
            l&apos;INEAS, elle devient la première clinique privée en Tunisie à
            recevoir ce label, symbole de son dévouement à la qualité des soins
            et à la sécurité des patients.
          </p>

          <p className="mt-6 text-[0.98rem] leading-[1.9] text-stone">
            L&apos;obtention de l&apos;accréditation niveau platine est
            l&apos;aboutissement d&apos;un long et rigoureux processus.
            L&apos;équipe de la clinique ESSALEM Sousse a travaillé
            d&apos;arrache-pied pour mettre en place des normes et des
            procédures rigoureuses dans tous les aspects de ses pratiques, de la
            qualité des soins à la gestion des risques.
          </p>

          <p className="mt-10 text-[1.02rem] text-ink">
            Elle permet d&apos;assurer aux patients&nbsp;:
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "Des soins de haute qualité, conformes aux normes et exigences internationales les plus strictes",
              "Une sécurité optimale des patients",
              "Un environnement de soins propre et accueillant",
              "Une équipe médicale et paramédicale compétente et dévouée",
              "Une communication transparente et efficace",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[0.98rem] leading-[1.8] text-stone">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-12 text-[1.15rem] font-semibold">
            Un engagement continu envers l&apos;amélioration
          </h3>
          <p className="mt-4 text-[0.98rem] leading-[1.9] text-stone">
            L&apos;obtention de l&apos;accréditation niveau platine n&apos;est
            pas une fin en soi. La clinique ESSALEM Sousse s&apos;engage à
            poursuivre sa dynamique d&apos;amélioration continue et à offrir à
            ses patients les meilleurs soins possibles.
          </p>

          <p className="mt-10 text-[1.02rem] text-ink">
            Nos patients peuvent désormais s&apos;attendre à&nbsp;:
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "Des soins encore plus personnalisés et centrés sur leurs besoins",
              "Une meilleure coordination des soins entre les différents intervenants",
              "Un renforcement de la qualité de l'information et de la communication à l'intérieur et à l'extérieur de l'établissement",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[0.98rem] leading-[1.8] text-stone">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  );
}