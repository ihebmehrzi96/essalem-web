import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getApplicationById } from "@/lib/jobs";
import AdminHeader from "@/components/admin-header";
import { deleteApplication } from "../actions";



function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function FileLink({ name, label }: { name: string | null; label: string }) {
  if (!name) {
    return (
      <div className="flex flex-wrap items-center gap-3 border-b border-line py-4">
        <span className="w-52 shrink-0 text-[0.9rem] text-stone">{label}</span>
        <span className="text-[0.9rem] text-stone italic">Non fourni</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-line py-4">
      <span className="w-52 shrink-0 text-[0.9rem] text-stone">{label}</span>
      <a
        href={`/api/fichier/${name}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-10 items-center gap-2 rounded border border-sky-500 px-4 text-[0.88rem] font-semibold text-sky-600 transition-colors hover:bg-sky-50"
      >
        Ouvrir le document
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 17 17 7" /><path d="M8 7h9v9" />
        </svg>
      </a>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap gap-3 border-b border-line py-4">
      <span className="w-52 shrink-0 text-[0.9rem] text-stone">{label}</span>
      <span className="flex-1">{value || "—"}</span>
    </div>
  );
}

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const app = await getApplicationById(id);
  if (!app) notFound();

  return (
    <>
      <AdminHeader name={session.name} />

      <div className="mx-auto max-w-[900px] px-5 py-8">
        <div className="rounded border border-line bg-paper p-6 sm:p-10">

          <Link
            href="/admin/candidatures"
            className="text-[0.9rem] text-stone transition-colors hover:text-ink"
          >
            ← Candidatures
          </Link>

          <h1 className="mt-2 text-[2.1rem] font-bold tracking-tight">
            {app.lastName} {app.firstName}
          </h1>

          <p className="mt-2 text-stone">
            {app.jobOffer?.title ?? "Candidature spontanée"}
          </p>

          <h2 className="mt-10 text-xl font-bold">Informations</h2>
          <div className="mt-3">
            <Row label="Nom" value={app.lastName} />
            <Row label="Prénom" value={app.firstName} />
            <Row label="État civil" value={app.maritalStatus} />
            <Row label="Date de naissance" value={formatDate(app.birthDate)} />
            <Row label="E-mail" value={app.email} />
            <Row label="Téléphone" value={app.phone} />
            <Row label="Adresse" value={app.address ?? ""} />
            <Row label="Ville" value={app.city ?? ""} />
            <Row label="Code postal" value={app.postalCode ?? ""} />
            <Row label="Qualification" value={app.qualification ?? ""} />
            <Row label="Année de promotion" value={app.promoYear ?? ""} />
          </div>

          <h2 className="mt-10 text-xl font-bold">Documents</h2>
          <div className="mt-3">
            <FileLink name={app.cv} label="CV" />
            <FileLink name={app.motivation} label="Lettre de motivation" />
            <FileLink name={app.diploma} label="Diplôme" />
            <FileLink name={app.baccalaureat} label="Attestation du Baccalauréat" />
            {app.transcripts.length === 0 ? (
              <FileLink name={null} label="Relevés de notes" />
            ) : (
              app.transcripts.map((name, i) => (
                <FileLink key={name} name={name} label={`Relevé de notes ${i + 1}`} />
              ))
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
            <a
              href={`mailto:${app.email}`}
              className="inline-flex min-h-12 items-center rounded border border-leaf px-7 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-paper"
            >
              Répondre par e-mail
            </a>

            <form action={deleteApplication}>
              <input type="hidden" name="id" value={app.id} />
              <button
                type="submit"
                className="inline-flex min-h-12 items-center rounded border border-red-500 px-7 font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                Supprimer
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}