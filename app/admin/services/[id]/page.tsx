import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getCategoryById, listAllSpecialties } from "@/lib/services";
import AdminHeader from "@/components/admin-header";
import { toggleSpecialty } from "../actions";
import DeleteSpecialtyButton from "./delete-button";

export const instant = false;

export default async function CategorySpecialtiesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) notFound();

  const specialties = await listAllSpecialties(id);
  const fr = category.translations.find((t) => t.locale === "fr");

  return (
    <>
      <AdminHeader name={session.name} />

      <div className="mx-auto max-w-[1400px] px-5 py-8">
        <div className="rounded border border-line bg-paper p-6 sm:p-10">

          <Link
            href="/admin/services"
            className="text-[0.9rem] text-stone transition-colors hover:text-ink"
          >
            ← Nos services
          </Link>

          <h1 className="mt-2 text-[2.3rem] font-bold tracking-tight">
            {fr?.title ?? category.slug}
          </h1>

          <Link
            href={`/admin/services/${id}/nouvelle`}
            className="mt-6 inline-flex min-h-12 items-center rounded border border-leaf px-7 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-paper"
          >
            Ajouter une spécialité
          </Link>

          {specialties.length === 0 ? (
            <p className="mt-10 text-stone">Aucune spécialité dans ce pôle.</p>
          ) : (
            <div className="mt-10 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border border-line px-5 py-5 font-bold">Image</th>
                    <th className="border border-line px-5 py-5 font-bold">Titre</th>
                    <th className="border border-line px-5 py-5 font-bold">Statut</th>
                    <th className="border border-line px-5 py-5 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {specialties.map((item, i) => {
                    const t = item.translations.find((x) => x.locale === "fr");
                    const langs = item.translations.filter((x) => x.title).length;

                    return (
                      <tr key={item.id} className={i % 2 === 0 ? "bg-[#f4f4f4]" : "bg-paper"}>
                        <td className="border border-line px-5 py-5 align-top">
                          <div className="relative h-14 w-20 overflow-hidden rounded bg-mist">
                            {item.image && (
                              <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                            )}
                          </div>
                        </td>

                        <td className="border border-line px-5 py-5 align-top">
                          <span className="font-medium">{t?.title ?? item.slug}</span>
                          <span className="mt-0.5 block text-[0.85rem] text-stone">
                            /{item.slug} · {langs}/3 langues
                          </span>
                        </td>

                        <td className="border border-line px-5 py-5 align-top">
                          <form action={toggleSpecialty}>
                            <input type="hidden" name="id" value={item.id} />
                            <button
                              type="submit"
                              className={`inline-flex items-center gap-2 rounded px-3 py-2 text-[0.85rem] font-semibold transition-opacity hover:opacity-70 ${
                                item.published
                                  ? "bg-leaf/15 text-leaf-deep"
                                  : "bg-mist-deep text-stone"
                              }`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  item.published ? "bg-leaf" : "bg-stone"
                                }`}
                                aria-hidden="true"
                              />
                              {item.published ? "Publiée" : "Masquée"}
                            </button>
                          </form>
                        </td>

                        <td className="border border-line px-5 py-5 align-top">
                          <div className="flex min-w-[180px] flex-col gap-2">
                            <Link
                              href={`/admin/services/${id}/${item.id}`}
                              className="rounded border border-amber-500 px-5 py-2.5 text-center text-[0.9rem] font-semibold text-amber-600 transition-colors hover:bg-amber-50"
                            >
                              Modifier
                            </Link>
                            <DeleteSpecialtyButton
                              id={item.id}
                              title={t?.title ?? item.slug}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </>
  );
}