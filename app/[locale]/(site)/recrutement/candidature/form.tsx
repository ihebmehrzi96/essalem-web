"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitApplication, type ApplicationState } from "./actions";

const initial: ApplicationState = {};

const FIELD =
  "h-13 w-full rounded-xl border border-line px-4 outline-none transition-colors focus:border-ink";
const FILE =
  "w-full rounded-xl border border-line p-3 text-[0.9rem] file:mr-4 file:rounded-full file:border-0 file:bg-mist file:px-4 file:py-2 file:font-medium";

type Props = {
  offers: { id: string; title: string }[];
  preselected: string;
};

export default function ApplicationForm({ offers, preselected }: Props) {
  const [state, action, pending] = useActionState(submitApplication, initial);

  if (state.success) {
    return (
      <main className="px-5 pt-32 pb-(--spacing-section) sm:px-6 md:px-12 md:pt-40">
        <div className="mx-auto max-w-[620px] rounded-2xl bg-mist p-10 text-center">
          <h1 className="text-[clamp(1.6rem,3.4vw,2.4rem)]">
            Candidature envoyée
          </h1>
          <p className="mt-4 leading-relaxed text-stone">
            Nous avons bien reçu votre dossier. Il sera étudié par notre service
            des ressources humaines et traité dans les plus brefs délais.
          </p>
          <Link
            href="/recrutement"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-7 font-medium text-paper transition-colors hover:bg-leaf-deep"
          >
            Retour aux offres
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-5 pt-32 pb-(--spacing-section) sm:px-6 md:px-12 md:pt-40">
      <div className="mx-auto max-w-[760px]">

        <Link
          href="/recrutement"
          className="inline-flex items-center gap-2 text-[0.92rem] text-stone transition-colors hover:text-ink"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5" /><path d="m11 18-6-6 6-6" />
          </svg>
          Consulter nos offres d&apos;emploi
        </Link>

        <h1 className="mt-5 text-[clamp(2rem,4.4vw,3.2rem)]">
          Déposer une candidature
        </h1>
        <p className="mt-4 max-w-[56ch] leading-relaxed text-stone">
          Les champs marqués d&apos;un astérisque sont obligatoires. Formats
          acceptés pour les documents&nbsp;: PDF, JPG, PNG, DOC ou DOCX, 5 Mo
          maximum par fichier.
        </p>

        <form action={action} className="mt-10 flex flex-col gap-8">

          {/* Poste visé */}
          <fieldset className="flex flex-col gap-5 rounded-2xl border border-line p-6 sm:p-7">
            <legend className="px-2 text-[0.85rem] font-semibold tracking-wide text-leaf-deep">
              Poste visé
            </legend>

            <div className="flex flex-col gap-2">
              <label htmlFor="jobOfferId" className="text-[0.9rem] font-medium">
                Offre d&apos;emploi
              </label>
              <select
                id="jobOfferId"
                name="jobOfferId"
                defaultValue={preselected}
                className={FIELD}
              >
                <option value="">Candidature spontanée</option>
                {offers.map((offer) => (
                  <option key={offer.id} value={offer.id}>
                    {offer.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="qualification" className="text-[0.9rem] font-medium">
                Qualification de poste
              </label>
              <input
                id="qualification"
                name="qualification"
                maxLength={120}
                placeholder="Ex. : Infirmier, Technicien de laboratoire…"
                className={FIELD}
              />
            </div>
          </fieldset>

          {/* Identité */}
          <fieldset className="grid gap-5 rounded-2xl border border-line p-6 sm:grid-cols-2 sm:p-7">
            <legend className="px-2 text-[0.85rem] font-semibold tracking-wide text-leaf-deep">
              Vos informations
            </legend>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-[0.9rem] font-medium">
                Nom *
              </label>
              <input id="lastName" name="lastName" required maxLength={80} className={FIELD} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-[0.9rem] font-medium">
                Prénom *
              </label>
              <input id="firstName" name="firstName" required maxLength={80} className={FIELD} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="maritalStatus" className="text-[0.9rem] font-medium">
                État civil
              </label>
              <select id="maritalStatus" name="maritalStatus" defaultValue="Célibataire" className={FIELD}>
                <option>Célibataire</option>
                <option>Marié(e)</option>
                <option>Divorcé(e)</option>
                <option>Veuf(ve)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="birthDate" className="text-[0.9rem] font-medium">
                Date de naissance
              </label>
              <input id="birthDate" name="birthDate" type="date" className={FIELD} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[0.9rem] font-medium">
                E-mail *
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={FIELD} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-[0.9rem] font-medium">
                Numéro de téléphone *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="20 123 456"
                className={FIELD}
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="address" className="text-[0.9rem] font-medium">
                Adresse
              </label>
              <input id="address" name="address" maxLength={200} className={FIELD} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="text-[0.9rem] font-medium">
                Ville
              </label>
              <input id="city" name="city" maxLength={80} className={FIELD} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="postalCode" className="text-[0.9rem] font-medium">
                Code postal
              </label>
              <input id="postalCode" name="postalCode" maxLength={10} className={FIELD} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="promoYear" className="text-[0.9rem] font-medium">
                Année de promotion
              </label>
              <input
                id="promoYear"
                name="promoYear"
                maxLength={4}
                inputMode="numeric"
                placeholder="2024"
                className={FIELD}
              />
            </div>
          </fieldset>

          {/* Documents */}
          <fieldset className="flex flex-col gap-5 rounded-2xl border border-line p-6 sm:p-7">
            <legend className="px-2 text-[0.85rem] font-semibold tracking-wide text-leaf-deep">
              Vos documents
            </legend>

            <div className="flex flex-col gap-2">
              <label htmlFor="cv" className="text-[0.9rem] font-medium">CV</label>
              <input id="cv" name="cv" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className={FILE} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="motivation" className="text-[0.9rem] font-medium">
                Lettre de motivation
              </label>
              <input id="motivation" name="motivation" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className={FILE} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="diploma" className="text-[0.9rem] font-medium">Diplôme</label>
              <input id="diploma" name="diploma" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className={FILE} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="baccalaureat" className="text-[0.9rem] font-medium">
                Attestation du Baccalauréat
              </label>
              <input id="baccalaureat" name="baccalaureat" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className={FILE} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="transcripts" className="text-[0.9rem] font-medium">
                Relevés de notes (jusqu&apos;à 3 fichiers)
              </label>
              <input
                id="transcripts"
                name="transcripts"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className={FILE}
              />
            </div>
          </fieldset>

          {/* Consentement — exigé pour le traitement de données personnelles */}
          <label className="flex items-start gap-3 rounded-2xl bg-mist p-5">
            <input type="checkbox" required className="mt-1 h-5 w-5 shrink-0 rounded border-line" />
            <span className="text-[0.92rem] leading-relaxed text-stone">
              J&apos;autorise la Clinique Essalem à conserver et traiter les
              informations et documents transmis dans le cadre de ma
              candidature. *
            </span>
          </label>

          {state.error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[0.9rem] text-red-700">
              {state.error}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex min-h-13 items-center rounded-full bg-ink px-8 font-medium text-paper transition-colors hover:bg-leaf-deep disabled:opacity-50"
            >
              {pending ? "Envoi en cours…" : "Envoyer ma candidature"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}