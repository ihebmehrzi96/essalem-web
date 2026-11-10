"use client";

import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useActionState } from "react";
import { submitApplication, type ApplicationState } from "./actions";
import type { Locale } from "@/content/services";

const initial: ApplicationState = {};

const FIELD =
  "h-13 w-full rounded-xl border border-line px-4 outline-none transition-colors focus:border-ink";
const FILE =
  "w-full rounded-xl border border-line p-3 text-[0.9rem] file:me-4 file:rounded-full file:border-0 file:bg-mist file:px-4 file:py-2 file:font-medium";

type Props = {
  offers: { id: string; title: string }[];
  preselected: string;
};

const copy: Record<
  Locale,
  {
    sentTitle: string;
    sentBody: string;
    backToOffers: string;
    browseOffers: string;
    pageTitle: string;
    pageIntro: string;
    positionLegend: string;
    jobOfferLabel: string;
    spontaneousOption: string;
    qualificationLabel: string;
    qualificationPlaceholder: string;
    identityLegend: string;
    lastNameLabel: string;
    firstNameLabel: string;
    maritalStatusLabel: string;
    maritalOptions: { value: string; label: string }[];
    birthDateLabel: string;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
    cityLabel: string;
    postalCodeLabel: string;
    promoYearLabel: string;
    documentsLegend: string;
    cvLabel: string;
    motivationLabel: string;
    diplomaLabel: string;
    baccalaureatLabel: string;
    transcriptsLabel: string;
    consentText: string;
    sendingLabel: string;
    submitLabel: string;
  }
> = {
  fr: {
    sentTitle: "Candidature envoyée",
    sentBody:
      "Nous avons bien reçu votre dossier. Il sera étudié par notre service des ressources humaines et traité dans les plus brefs délais.",
    backToOffers: "Retour aux offres",
    browseOffers: "Consulter nos offres d'emploi",
    pageTitle: "Déposer une candidature",
    pageIntro:
      "Les champs marqués d'un astérisque sont obligatoires. Formats acceptés pour les documents : PDF, JPG, PNG, DOC ou DOCX, 5 Mo maximum par fichier.",
    positionLegend: "Poste visé",
    jobOfferLabel: "Offre d'emploi",
    spontaneousOption: "Candidature spontanée",
    qualificationLabel: "Qualification de poste",
    qualificationPlaceholder: "Ex. : Infirmier, Technicien de laboratoire…",
    identityLegend: "Vos informations",
    lastNameLabel: "Nom *",
    firstNameLabel: "Prénom *",
    maritalStatusLabel: "État civil",
    maritalOptions: [
      { value: "Célibataire", label: "Célibataire" },
      { value: "Marié(e)", label: "Marié(e)" },
      { value: "Divorcé(e)", label: "Divorcé(e)" },
      { value: "Veuf(ve)", label: "Veuf(ve)" },
    ],
    birthDateLabel: "Date de naissance",
    emailLabel: "E-mail *",
    phoneLabel: "Numéro de téléphone *",
    addressLabel: "Adresse",
    cityLabel: "Ville",
    postalCodeLabel: "Code postal",
    promoYearLabel: "Année de promotion",
    documentsLegend: "Vos documents",
    cvLabel: "CV",
    motivationLabel: "Lettre de motivation",
    diplomaLabel: "Diplôme",
    baccalaureatLabel: "Attestation du Baccalauréat",
    transcriptsLabel: "Relevés de notes (jusqu'à 3 fichiers)",
    consentText:
      "J'autorise la Clinique Essalem à conserver et traiter les informations et documents transmis dans le cadre de ma candidature. *",
    sendingLabel: "Envoi en cours…",
    submitLabel: "Envoyer ma candidature",
  },
  ar: {
    sentTitle: "تمّ إرسال ترشّحكم",
    sentBody:
      "لقد توصّلنا بملفّكم بنجاح. ستتمّ دراسته من قِبل مصلحة الموارد البشرية ومعالجته في أقرب الآجال.",
    backToOffers: "العودة إلى عروض الشغل",
    browseOffers: "الاطّلاع على عروض الشغل",
    pageTitle: "إيداع ملفّ ترشّح",
    pageIntro:
      "الحقول المشار إليها بنجمة (*) إجبارية. الصيغ المقبولة للوثائق: PDF أو JPG أو PNG أو DOC أو DOCX، بحجم أقصى 5 ميغابايت لكلّ ملفّ.",
    positionLegend: "الخطّة المطلوبة",
    jobOfferLabel: "عرض الشغل",
    spontaneousOption: "ترشّح تلقائي",
    qualificationLabel: "الاختصاص أو المؤهّل الوظيفي",
    qualificationPlaceholder: "مثال: ممرّض، فني سامٍ في المخبر…",
    identityLegend: "معلوماتكم الشخصية",
    lastNameLabel: "اللقب *",
    firstNameLabel: "الاسم *",
    maritalStatusLabel: "الحالة المدنية",
    maritalOptions: [
      { value: "Célibataire", label: "أعزب / عزباء" },
      { value: "Marié(e)", label: "متزوّج(ة)" },
      { value: "Divorcé(e)", label: "مطلّق(ة)" },
      { value: "Veuf(ve)", label: "أرمل(ة)" },
    ],
    birthDateLabel: "تاريخ الولادة",
    emailLabel: "البريد الإلكتروني *",
    phoneLabel: "رقم الهاتف *",
    addressLabel: "العنوان",
    cityLabel: "المدينة",
    postalCodeLabel: "الترقيم البريدي",
    promoYearLabel: "سنة التخرّج",
    documentsLegend: "وثائقكم المرفقة",
    cvLabel: "السيرة الذاتية (CV)",
    motivationLabel: "رسالة التحفيز",
    diplomaLabel: "الشهادة العلمية",
    baccalaureatLabel: "شهادة البكالوريا",
    transcriptsLabel: "كشوف الأعداد (حتى 3 ملفّات)",
    consentText:
      "أرخّص لمصحة السلام في حفظ ومعالجة المعطيات والوثائق المرسلة في إطار ملفّ ترشّحي. *",
    sendingLabel: "جارٍ الإرسال…",
    submitLabel: "إرسال ملفّ الترشّح",
  },
  en: {
    sentTitle: "Application submitted",
    sentBody:
      "We have received your application. It will be reviewed by our Human Resources department as soon as possible.",
    backToOffers: "Back to job openings",
    browseOffers: "View our job openings",
    pageTitle: "Submit an application",
    pageIntro:
      "Fields marked with an asterisk (*) are required. Accepted document formats: PDF, JPG, PNG, DOC, or DOCX, up to 5 MB per file.",
    positionLegend: "Target position",
    jobOfferLabel: "Job opening",
    spontaneousOption: "Spontaneous application",
    qualificationLabel: "Job qualification / Specialty",
    qualificationPlaceholder: "e.g., Registered Nurse, Lab Technician…",
    identityLegend: "Your information",
    lastNameLabel: "Last name *",
    firstNameLabel: "First name *",
    maritalStatusLabel: "Marital status",
    maritalOptions: [
      { value: "Célibataire", label: "Single" },
      { value: "Marié(e)", label: "Married" },
      { value: "Divorcé(e)", label: "Divorced" },
      { value: "Veuf(ve)", label: "Widowed" },
    ],
    birthDateLabel: "Date of birth",
    emailLabel: "Email *",
    phoneLabel: "Phone number *",
    addressLabel: "Address",
    cityLabel: "City",
    postalCodeLabel: "Postal code",
    promoYearLabel: "Graduation year",
    documentsLegend: "Your documents",
    cvLabel: "Resume / CV",
    motivationLabel: "Cover letter",
    diplomaLabel: "Diploma",
    baccalaureatLabel: "High school diploma (Baccalauréat)",
    transcriptsLabel: "Academic transcripts (up to 3 files)",
    consentText:
      "I authorize Clinique Essalem to store and process the information and documents submitted as part of my job application. *",
    sendingLabel: "Sending…",
    submitLabel: "Submit application",
  },
};

export default function ApplicationForm({ offers, preselected }: Props) {
  const locale = useLocale();
  const loc = ((locale as Locale) ?? "fr") in copy ? (locale as Locale) : "fr";
  const c = copy[loc];
  const [state, action, pending] = useActionState(submitApplication, initial);

  if (state.success) {
    return (
      <main className="px-5 pt-32 pb-(--spacing-section) sm:px-6 md:px-12 md:pt-40">
        <div className="mx-auto max-w-[620px] rounded-2xl bg-mist p-10 text-center">
          <h1 className="text-[clamp(1.6rem,3.4vw,2.4rem)]">{c.sentTitle}</h1>
          <p className="mt-4 leading-relaxed text-stone">{c.sentBody}</p>
          <Link
            href="/recrutement"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-7 font-medium text-paper transition-colors hover:bg-leaf-deep"
          >
            {c.backToOffers}
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
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rtl:-scale-x-100"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="m11 18-6-6 6-6" />
          </svg>
          {c.browseOffers}
        </Link>

        <h1 className="mt-5 text-[clamp(2rem,4.4vw,3.2rem)]">{c.pageTitle}</h1>
        <p className="mt-4 max-w-[56ch] leading-relaxed text-stone">
          {c.pageIntro}
        </p>

        <form action={action} className="mt-10 flex flex-col gap-8">
          {/* Poste visé */}
          <fieldset className="flex flex-col gap-5 rounded-2xl border border-line p-6 sm:p-7">
            <legend className="px-2 text-[0.85rem] font-semibold tracking-wide text-leaf-deep">
              {c.positionLegend}
            </legend>

            <div className="flex flex-col gap-2">
              <label htmlFor="jobOfferId" className="text-[0.9rem] font-medium">
                {c.jobOfferLabel}
              </label>
              <select
                id="jobOfferId"
                name="jobOfferId"
                defaultValue={preselected}
                className={FIELD}
              >
                <option value="">{c.spontaneousOption}</option>
                {offers.map((offer) => (
                  <option key={offer.id} value={offer.id}>
                    {offer.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="qualification"
                className="text-[0.9rem] font-medium"
              >
                {c.qualificationLabel}
              </label>
              <input
                id="qualification"
                name="qualification"
                maxLength={120}
                placeholder={c.qualificationPlaceholder}
                className={FIELD}
              />
            </div>
          </fieldset>

          {/* Identité */}
          <fieldset className="grid gap-5 rounded-2xl border border-line p-6 sm:grid-cols-2 sm:p-7">
            <legend className="px-2 text-[0.85rem] font-semibold tracking-wide text-leaf-deep">
              {c.identityLegend}
            </legend>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-[0.9rem] font-medium">
                {c.lastNameLabel}
              </label>
              <input
                id="lastName"
                name="lastName"
                required
                maxLength={80}
                className={FIELD}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-[0.9rem] font-medium">
                {c.firstNameLabel}
              </label>
              <input
                id="firstName"
                name="firstName"
                required
                maxLength={80}
                className={FIELD}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="maritalStatus"
                className="text-[0.9rem] font-medium"
              >
                {c.maritalStatusLabel}
              </label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                defaultValue="Célibataire"
                className={FIELD}
              >
                {c.maritalOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="birthDate" className="text-[0.9rem] font-medium">
                {c.birthDateLabel}
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                className={FIELD}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[0.9rem] font-medium">
                {c.emailLabel}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={FIELD}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-[0.9rem] font-medium">
                {c.phoneLabel}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="20 123 456"
                dir="ltr"
                className={FIELD}
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="address" className="text-[0.9rem] font-medium">
                {c.addressLabel}
              </label>
              <input
                id="address"
                name="address"
                maxLength={200}
                className={FIELD}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="text-[0.9rem] font-medium">
                {c.cityLabel}
              </label>
              <input id="city" name="city" maxLength={80} className={FIELD} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="postalCode" className="text-[0.9rem] font-medium">
                {c.postalCodeLabel}
              </label>
              <input
                id="postalCode"
                name="postalCode"
                maxLength={10}
                className={FIELD}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="promoYear" className="text-[0.9rem] font-medium">
                {c.promoYearLabel}
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
              {c.documentsLegend}
            </legend>

            <div className="flex flex-col gap-2">
              <label htmlFor="cv" className="text-[0.9rem] font-medium">
                {c.cvLabel}
              </label>
              <input
                id="cv"
                name="cv"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className={FILE}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="motivation" className="text-[0.9rem] font-medium">
                {c.motivationLabel}
              </label>
              <input
                id="motivation"
                name="motivation"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className={FILE}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="diploma" className="text-[0.9rem] font-medium">
                {c.diplomaLabel}
              </label>
              <input
                id="diploma"
                name="diploma"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className={FILE}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="baccalaureat"
                className="text-[0.9rem] font-medium"
              >
                {c.baccalaureatLabel}
              </label>
              <input
                id="baccalaureat"
                name="baccalaureat"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className={FILE}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="transcripts"
                className="text-[0.9rem] font-medium"
              >
                {c.transcriptsLabel}
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
            <input
              type="checkbox"
              required
              className="mt-1 h-5 w-5 shrink-0 rounded border-line"
            />
            <span className="text-[0.92rem] leading-relaxed text-stone">
              {c.consentText}
            </span>
          </label>

          {state.error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-[0.9rem] text-red-700"
            >
              {state.error}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex min-h-13 items-center rounded-full bg-ink px-8 font-medium text-paper transition-colors hover:bg-leaf-deep disabled:opacity-50"
            >
              {pending ? c.sendingLabel : c.submitLabel}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
