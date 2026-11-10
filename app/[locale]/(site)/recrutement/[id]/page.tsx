import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getOfferById } from "@/lib/jobs";
import type { Locale } from "@/content/services";

const copy: Record<
  Locale,
  {
    backLabel: string;
    refLabel: string;
    publishedLabel: string;
    descriptionLabel: string;
    readyTitle: string;
    readyBody: string;
    applyButton: string;
    questionPrefix: string;
  }
> = {
  fr: {
    backLabel: "Recrutement",
    refLabel: "RÉFÉRENCE",
    publishedLabel: "PUBLIÉE LE",
    descriptionLabel: "DESCRIPTIF DU POSTE",
    readyTitle: "Prêt à nous rejoindre ?",
    readyBody:
      "Préparez votre CV, votre lettre de motivation et vos diplômes. Le dépôt se fait en ligne, en moins de cinq minutes.",
    applyButton: "Postuler à cette offre",
    questionPrefix: "Une question sur ce poste ?",
  },
  ar: {
    backLabel: "الانتداب",
    refLabel: "المرجع",
    publishedLabel: "تاريخ النشر",
    descriptionLabel: "وصف الخطّة الوظيفية",
    readyTitle: "هل أنتم مستعدّون للانضمام إلينا؟",
    readyBody:
      "جهّزوا سيرتكم الذاتية ورسالة التحفيز وشهائدكم العلمية. يتمّ إيداع الملفّ عبر الإنترنت في أقلّ من خمس دقائق.",
    applyButton: "التقدّم لهذه الوظيفة",
    questionPrefix: "هل لديكم استفسار حول هذه الخطّة؟",
  },
  en: {
    backLabel: "Careers",
    refLabel: "REFERENCE",
    publishedLabel: "PUBLISHED ON",
    descriptionLabel: "JOB DESCRIPTION",
    readyTitle: "Ready to join us?",
    readyBody:
      "Prepare your resume, cover letter, and diplomas. You can submit your application online in under five minutes.",
    applyButton: "Apply for this position",
    questionPrefix: "Have a question about this position?",
  },
};

export default async function OfferPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const loc = ((locale as Locale) ?? "fr") in copy ? (locale as Locale) : "fr";
  const c = copy[loc];
  const offer = await getOfferById(id);

  if (!offer || !offer.active) notFound();

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat(loc === "ar" ? "ar-TN" : loc === "en" ? "en-GB" : "fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

  return (
    <div className="px-3 pt-24 pb-3 sm:px-4 sm:pt-28 md:pt-32">
      <div className="mx-auto grid max-w-[1340px] gap-3 lg:grid-cols-[minmax(0,0.85fr)_1fr]">
        {/* Panneau gauche — fixe au défilement */}
        <section className="relative overflow-hidden rounded-[1.75rem] bg-ink p-8 sm:p-10 lg:sticky lg:top-28 lg:flex lg:h-[calc(100svh-8rem)] lg:flex-col lg:justify-between">
          <div
            className="pointer-events-none absolute -bottom-32 -start-24 h-[400px] w-[400px] rounded-full bg-leaf/20 blur-[130px]"
            aria-hidden="true"
          />

          <div className="relative">
            <Link
              href="/recrutement"
              className="group inline-flex items-center gap-2 text-[0.88rem] text-white/50 transition-colors hover:text-paper"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-400 group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M19 12H5" />
                <path d="m11 18-6-6 6-6" />
              </svg>
              {c.backLabel}
            </Link>

            <h1 className="mt-10 max-w-[15ch] text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.02] text-paper">
              {offer.title}
            </h1>
          </div>

          {/* Métadonnées, alignées en bas du panneau */}
          <dl className="relative mt-12 grid grid-cols-2 gap-y-7 border-t border-white/12 pt-8">
            <div>
              <dt className="text-[0.74rem] tracking-[0.14em] text-white/40">
                {c.refLabel}
              </dt>
              <dd className="mt-1.5 text-[0.98rem] text-paper">{offer.ref}</dd>
            </div>
            <div>
              <dt className="text-[0.74rem] tracking-[0.14em] text-white/40">
                {c.publishedLabel}
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
            {c.descriptionLabel}
          </span>

          <div className="mt-7 text-[1.08rem] leading-[1.8] whitespace-pre-wrap">
            {offer.body}
          </div>

          <div className="mt-14 rounded-2xl bg-paper p-7 sm:p-8">
            <h2 className="text-[1.3rem] leading-snug">{c.readyTitle}</h2>
            <p className="mt-3 max-w-[46ch] text-[0.96rem] leading-relaxed text-stone">
              {c.readyBody}
            </p>

            <Link
              href={`/recrutement/candidature?offre=${offer.id}`}
              className="group mt-7 inline-flex min-h-13 items-center gap-3 rounded-full bg-ink px-8 font-medium text-paper transition-colors hover:bg-leaf-deep"
            >
              {c.applyButton}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-500 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>

            <p className="mt-6 border-t border-line pt-5 text-[0.88rem] text-stone">
              {c.questionPrefix}{" "}
              <a
                href="tel:+21673210375"
                dir="ltr"
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
