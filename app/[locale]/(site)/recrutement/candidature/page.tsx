import { listActiveOffers } from "@/lib/jobs";
import ApplicationForm from "./form";

export const instant = false;

export const metadata = {
  title: "Candidature — Clinique Essalem",
  robots: { index: false, follow: false },
};

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