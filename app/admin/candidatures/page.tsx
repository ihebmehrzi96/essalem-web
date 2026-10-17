import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { listApplications } from "@/lib/jobs";
import AdminHeader from "@/components/admin-header";
import { toggleHandled } from "./actions";

export const instant = false;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace(/ /g, "-");
}

export default async function ApplicationsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const applications = await listApplications();
  const pending = applications.filter((a) => !a.handled).length;

  return (
    <>
      <AdminHeader name={session.name} />

      <div className="mx-auto max-w-[1400px] px-5 py-8">
        <div className="rounded border border-line bg-paper p-6 sm:p-10">

          <Link
            href="/admin/offres-emploi"
            className="text-[0.9rem] text-stone transition-colors hover:text-ink"
          >
            ← Offres d&apos;emploi
          </Link>

          <h1 className="mt-2 text-[2.3rem] font-bold tracking-tight">
            Liste des candidatures
          </h1>

          <p className="mt-2 text-stone">
            {applications.length} candidature{applications.length > 1 ? "s" : ""} reçue
            {applications.length > 1 ? "s" : ""}
            {pending > 0 && ` · ${pending} à traiter`}
          </p>

          {applications.length === 0 ? (
            <p className="mt-10 text-stone">Aucune candidature pour le moment.</p>
          ) : (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border border-line px-5 py-5 font-bold">Candidat</th>
                    <th className="border border-line px-5 py-5 font-bold">Poste</th>
                    <th className="border border-line px-5 py-5 font-bold">Contact</th>
                    <th className="border border-line px-5 py-5 font-bold whitespace-nowrap">
                      Reçue le
                    </th>
                    <th className="border border-line px-5 py-5 font-bold">Statut</th>
                    <th className="border border-line px-5 py-5 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, i) => (
                    <tr key={app.id} className={i % 2 === 0 ? "bg-[#f4f4f4]" : "bg-paper"}>
                      <td className="border border-line px-5 py-5 align-top">
                        <span className="font-medium">
                          {app.lastName} {app.firstName}
                        </span>
                        {app.qualification && (
                          <span className="mt-0.5 block text-[0.85rem] text-stone">
                            {app.qualification}
                          </span>
                        )}
                      </td>

                      <td className="border border-line px-5 py-5 align-top">
                        {app.jobOffer?.title ?? (
                          <span className="text-stone italic">
                            Candidature spontanée
                          </span>
                        )}
                      </td>

                      <td className="border border-line px-5 py-5 align-top text-[0.9rem]">
                        <a href={`mailto:${app.email}`} className="block hover:text-leaf">
                          {app.email}
                        </a>
                        <a href={`tel:${app.phone}`} className="mt-0.5 block text-stone hover:text-leaf">
                          {app.phone}
                        </a>
                      </td>

                      <td className="border border-line px-5 py-5 align-top whitespace-nowrap">
                        {formatDate(app.createdAt)}
                      </td>

                      <td className="border border-line px-5 py-5 align-top">
                        <form action={toggleHandled}>
                          <input type="hidden" name="id" value={app.id} />
                          <button
                            type="submit"
                            title={
                              app.handled
                                ? "Marquer comme à traiter"
                                : "Marquer comme traitée"
                            }
                            className={`inline-flex items-center gap-2 rounded px-3 py-2 text-[0.85rem] font-semibold transition-opacity hover:opacity-70 ${
                              app.handled
                                ? "bg-leaf/15 text-leaf-deep"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                app.handled ? "bg-leaf" : "bg-amber-500"
                              }`}
                              aria-hidden="true"
                            />
                            {app.handled ? "Traitée" : "À traiter"}
                          </button>
                        </form>
                      </td>

                      <td className="border border-line px-5 py-5 align-top">
                        <Link
                          href={`/admin/candidatures/${app.id}`}
                          className="inline-block rounded border border-sky-500 px-5 py-2.5 text-[0.9rem] font-semibold text-sky-600 transition-colors hover:bg-sky-50"
                        >
                          voir Détail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </>
  );
}