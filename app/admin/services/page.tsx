import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { listAllCategories } from "@/lib/services";
import AdminHeader from "@/components/admin-header";

export const instant = false;

export default async function AdminServicesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const categories = await listAllCategories();

  return (
    <>
      <AdminHeader name={session.name} />

      <div className="mx-auto max-w-[1400px] px-5 py-8">
        <div className="rounded border border-line bg-paper p-6 sm:p-10">

          <Link
            href="/admin"
            className="text-[0.9rem] text-stone transition-colors hover:text-ink"
          >
            ← Tableau de bord
          </Link>

          <h1 className="mt-2 text-[2.3rem] font-bold tracking-tight">
            Nos services
          </h1>
          <p className="mt-2 text-stone">
            Chaque pôle regroupe des spécialités. Cliquez sur un pôle pour gérer
            ses spécialités.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="border border-line px-5 py-5 font-bold">Pôle</th>
                  <th className="border border-line px-5 py-5 font-bold">Spécialités</th>
                  <th className="border border-line px-5 py-5 font-bold">Statut</th>
                  <th className="border border-line px-5 py-5 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, i) => {
                  const fr = category.translations.find((t) => t.locale === "fr");

                  return (
                    <tr key={category.id} className={i % 2 === 0 ? "bg-[#f4f4f4]" : "bg-paper"}>
                      <td className="border border-line px-5 py-5 align-top">
                        <span className="font-medium">{fr?.title ?? category.slug}</span>
                        <span className="mt-0.5 block text-[0.85rem] text-stone">
                          /{category.slug}
                        </span>
                      </td>

                                          <td className="border border-line px-5 py-5 align-top">
                        {category.specialties.length}
                      </td>

                      <td className="border border-line px-5 py-5 align-top">
                        <span
                          className={`inline-block rounded px-3 py-1 text-[0.85rem] font-semibold ${
                            category.published
                              ? "bg-leaf/15 text-leaf-deep"
                              : "bg-mist-deep text-stone"
                          }`}
                        >
                          {category.published ? "Publié" : "Masqué"}
                        </span>
                      </td>

                      <td className="border border-line px-5 py-5 align-top">
                        <div className="flex min-w-[220px] flex-col gap-2">
                          <Link
                            href={`/admin/services/${category.id}`}
                            className="rounded border border-sky-500 px-5 py-2.5 text-center text-[0.9rem] font-semibold text-sky-600 transition-colors hover:bg-sky-50"
                          >
                            Gérer les spécialités
                          </Link>
                          <Link
                            href={`/admin/services/${category.id}/modifier`}
                            className="rounded border border-amber-500 px-5 py-2.5 text-center text-[0.9rem] font-semibold text-amber-600 transition-colors hover:bg-amber-50"
                          >
                            Modifier le pôle
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}