import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { listAllOffers, countApplications } from "@/lib/jobs";
import AdminHeader from "@/components/admin-header";
import { toggleOffer } from "./actions"
import DeleteOfferButton from "./delete-button";



function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace(/ /g, "-");
}

export default async function AdminOffersPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [offers, applications] = await Promise.all([
    listAllOffers(),
    countApplications(),
  ]);

  return (
    <>
      <AdminHeader name={session.name} />

      <div className="mx-auto max-w-[1400px] px-5 py-8">
        <div className="rounded border border-line bg-paper p-6 sm:p-10">

          <h1 className="text-[2.3rem] font-bold tracking-tight">
            Liste des offres d&apos;emploi
          </h1>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/admin/offres-emploi/nouvelle"
              className="inline-flex min-h-12 items-center rounded border border-leaf px-7 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-paper"
            >
              Ajouter une offre d&apos;emploi
            </Link>

            <Link
              href="/admin/candidatures"
              className="inline-flex min-h-12 items-center rounded border border-sky-500 px-7 font-semibold text-sky-600 transition-colors hover:bg-sky-50"
            >
              Afficher les candidatures
              {applications > 0 && (
                <span className="ml-2 rounded-full bg-sky-100 px-2 py-0.5 text-[0.8rem]">
                  {applications}
                </span>
              )}
            </Link>
          </div>

          {offers.length === 0 ? (
            <p className="mt-10 text-stone">Aucune offre pour le moment.</p>
          ) : (
            <div className="mt-10 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border border-line px-5 py-5 font-bold">Ref</th>
                    <th className="border border-line px-5 py-5 font-bold">Titre</th>
                    <th className="border border-line px-5 py-5 font-bold whitespace-nowrap">
                      Date de création
                    </th>
                    <th className="border border-line px-5 py-5 font-bold">Statut</th>
                    <th className="border border-line px-5 py-5 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((offer, i) => (
                    <tr key={offer.id} className={i % 2 === 0 ? "bg-[#f4f4f4]" : "bg-paper"}>
                      <td className="border border-line px-5 py-5 align-top">
                        {offer.ref}
                      </td>

                      <td className="border border-line px-5 py-5 align-top">
                        {offer.title}
                      </td>

                      <td className="border border-line px-5 py-5 align-top whitespace-nowrap">
                        {formatDate(offer.createdAt)}
                      </td>

                      <td className="border border-line px-5 py-5 align-top">
                        <form action={toggleOffer}>
                          <input type="hidden" name="id" value={offer.id} />
                          <button
                            type="submit"
                            title={
                              offer.active
                                ? "Cliquer pour désactiver"
                                : "Cliquer pour activer"
                            }
                            className={`inline-flex items-center gap-2 rounded px-3 py-2 text-[0.85rem] font-semibold transition-opacity hover:opacity-70 ${
                              offer.active
                                ? "bg-leaf/15 text-leaf-deep"
                                : "bg-mist-deep text-stone"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                offer.active ? "bg-leaf" : "bg-stone"
                              }`}
                              aria-hidden="true"
                            />
                            {offer.active ? "Active" : "Inactive"}
                          </button>
                        </form>
                      </td>

                      <td className="border border-line px-5 py-5 align-top">
                        <div className="flex min-w-[200px] flex-col gap-2">
                          <Link
                            href={`/admin/offres-emploi/${offer.id}`}
                            className="rounded border border-amber-500 px-5 py-2.5 text-center text-[0.9rem] font-semibold text-amber-600 transition-colors hover:bg-amber-50"
                          >
                            Modifier
                          </Link>

                          <form action={toggleOffer}>
                            <input type="hidden" name="id" value={offer.id} />
                            <button
                              type="submit"
                              className="w-full rounded border border-leaf px-5 py-2.5 text-[0.9rem] font-semibold text-leaf transition-colors hover:bg-leaf hover:text-paper"
                            >
                              {offer.active ? "Désactiver" : "Activer"}
                            </button>
                          </form>

                          <DeleteOfferButton id={offer.id} title={offer.title} />
                        </div>
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