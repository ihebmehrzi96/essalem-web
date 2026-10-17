import Image from "next/image";
import { Link } from "@/i18n/routing";
import { clinic } from "@/lib/content";

export const metadata = {
  title: "Présentation — Clinique Essalem",
  description:
    "Active depuis plus de 20 ans, la Clinique Essalem est un établissement multidisciplinaire privé de soins à Sousse : 105 lits, 8 salles opératoires, IRM, scanner.",
};

export default function PresentationPage() {
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
          Présentation
        </h1>
      </div>

      {/* Contenu */}
      <div className="mx-auto mt-16 max-w-[680px] px-5 sm:px-6">

        <p className="text-center text-[0.98rem] leading-[1.9] text-stone">
          Active depuis plus de 20 ans, la Clinique ESSALEM est un établissement
          multidisciplinaire privé de soins offrant des prestations et des
          services médicaux et chirurgicaux qui répondent aux besoins de santé
          de nos patients.
        </p>

        <p className="mt-7 text-center text-[0.98rem] leading-[1.9] text-stone">
          Situé dans un des quartiers les plus influents de la ville de Sousse
          en Tunisie, notre établissement a connu une évolution progressive de
          sa capacité d&apos;accueil, de son plateau technique et de ses
          équipements lourds ainsi que de son personnel.
        </p>

        <p className="mt-7 text-center text-[0.98rem] leading-[1.9] text-stone">
          Actuellement, la clinique ESSALEM dispose de 105 lits
          d&apos;hospitalisation, 8 salles opératoires dont 2 à flux
          unidirectionnel, une IRM, un scanner, une salle de cathétérisme
          cardiaque, un appareil de lithotripsie extracorporelle,
          oxygénothérapie hyperbare monoplace et une multitude
          d&apos;équipements de pointe à visée diagnostique ou thérapeutique
          comme le cadre de biopsie stéréotaxique IRM et scanner compatible des
          tumeurs cérébrales et le microscope opératoire de très haute
          performance ZEISS KINEVO 900.
        </p>

        <p className="mt-7 text-center text-[0.98rem] leading-[1.9] text-stone">
          Ce personnel jouit d&apos;une expérience et d&apos;une compétence
          accrues lui permettant d&apos;exécuter ses tâches et de jouer son rôle
          dans les meilleures conditions, en assurant la qualité et la sécurité
          des soins prodigués à nos chers patients.
        </p>

        <p className="mt-7 text-center text-[0.98rem] leading-[1.9] text-stone">
          Engagé depuis 2004 dans une démarche d&apos;amélioration continue de
          la qualité et de la sécurité des soins, notre établissement a mis en
          place, en 2009, un système de management de la qualité couvrant
          l&apos;ensemble de ses services, couronné par l&apos;obtention de la
          certification ISO 9001, renouvelée tous les trois ans. Dans cette
          dynamique de recherche d&apos;excellence, la clinique a également
          obtenu, en 2024, l&apos;accréditation de niveau Platine, renouvelée
          tous les trois ans.
        </p>

        {/* Photo verticale */}
        <div className="relative mt-14 h-[480px] w-full overflow-hidden bg-mist sm:h-[560px]">
          <Image
            src="/images/hall-accueil.jpg"
            alt="La façade de la Clinique Essalem"
            fill
            sizes="(max-width: 680px) 100vw, 680px"
            className="object-cover"
          />
        </div>

        {/* Lien vers la démarche qualité */}
     

      

      </div>
    </main>
  );
}