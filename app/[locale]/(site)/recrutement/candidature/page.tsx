import { listActiveOffers } from "@/lib/jobs";
import ApplicationForm from "./form";
import type { Locale } from "@/content/services";

const titles: Record<Locale, string> = {
  fr: "Candidature — Clinique Essalem",
  ar: "إيداع ترشّح — مصحة السلام",
  en: "Job Application — Clinique Essalem",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: titles[(locale as Locale) ?? "fr"] ?? titles.fr,
    robots: { index: false, follow: false },
  };
}

export default async function CandidaturePage({
  searchParams,
}: {
  searchParams: Promise<{ offre?: string }>;
}) {
  const [offers, { offre }] = await Promise.all([
    listActiveOffers(),
    searchParams,
  ]);

  return (
    <ApplicationForm
      offers={offers.map((o) => ({ id: o.id, title: o.title }))}
      preselected={offre ?? ""}
    />
  );
}
