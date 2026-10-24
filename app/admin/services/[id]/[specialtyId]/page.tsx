import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  getCategoryById,
  getSpecialtyById,
  listChildren,
} from "@/lib/services";
import AdminHeader from "@/components/admin-header";
import SpecialtyForm from "../specialty-form";
import { toggleSpecialty } from "../../actions";
import DeleteSpecialtyButton from "../delete-button";



export default async function EditSpecialtyPage({
  params,
}: {
  params: Promise<{ id: string; specialtyId: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id, specialtyId } = await params;

  const [category, specialty, children] = await Promise.all([
    getCategoryById(id),
    getSpecialtyById(specialtyId),
    listChildren(specialtyId),
  ]);

  if (!category || !specialty) notFound();

  const fr = category.translations.find((t) => t.locale === "fr");
  const byLocale = Object.fromEntries(
    specialty.translations.map((t) => [t.locale, t])
  );
  const title = byLocale.fr?.title ?? specialty.slug;

  return (
    <>
      <AdminHeader name={session.name} />

      <SpecialtyForm
        mode="edit"
        categoryId={id}
        categoryTitle={fr?.title ?? category.slug}
        parentId={specialty.parentId ?? undefined}
        specialty={{
          id: specialty.id,
          slug: specialty.slug,
          image: specialty.image,
          published: specialty.published,
          translations: {
            fr: { title: byLocale.fr?.title ?? "", body: byLocale.fr?.body ?? "" },
            ar: { title: byLocale.ar?.title ?? "", body: byLocale.ar?.body ?? "" },
            en: { title: byLocale.en?.title ?? "", body: byLocale.en?.body ?? "" },
          },
        }}
      />

      {/* Sous-spécialités — uniquement pour une spécialité racine */}
      {!specialty.parentId && (
        <div className="mx-auto max-w-[860px] px-6 pb-16 sm:px-10">
          <div className="rounded-2xl bg-paper p-6 sm:p-8">
            <h2 className="text-xl font-bold">Sous-spécialités</h2>
            <p className="mt-2 text-[0.92rem] text-stone">
              Elles s&apos;affichent en bas de la page de cette spécialité.
            </p>

            <Link
              href={`/admin/services/${id}/nouvelle?parent=${specialtyId}`}
              className="mt-5 inline-flex min-h-11 items-center rounded border border-leaf px-6 text-[0.92rem] font-semibold text-leaf transition-colors hover:bg-leaf hover:text-paper"
            >
              Ajouter une sous-spécialité
            </Link>

            {children.length === 0 ? (
              <p className="mt-6 text-[0.92rem] text-stone">
                Aucune sous-spécialité pour le moment.
              </p>
            ) : (
              <ul className="mt-6 flex flex-col gap-3">
                {children.map((child) => {
                  const ct = child.translations.find((x) => x.locale === "fr");

                  return (
                    <li
                      key={child.id}
                      className="flex flex-wrap items-center gap-4 rounded border border-line p-4"
                    >
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded bg-mist">
                        {child.image && (
                          <Image
                            src={child.image}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        )}
                      </div>

                      <div className="min-w-[140px] flex-1">
                        <span className="font-medium">
                          {ct?.title ?? child.slug}
                        </span>
                        <span className="mt-0.5 block text-[0.84rem] text-stone">
                          /{child.slug}
                        </span>
                      </div>

                      <form action={toggleSpecialty}>
                        <input type="hidden" name="id" value={child.id} />
                        <button
                          type="submit"
                          className={`inline-flex items-center gap-2 rounded px-3 py-2 text-[0.84rem] font-semibold transition-opacity hover:opacity-70 ${
                            child.published
                              ? "bg-leaf/15 text-leaf-deep"
                              : "bg-mist-deep text-stone"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              child.published ? "bg-leaf" : "bg-stone"
                            }`}
                            aria-hidden="true"
                          />
                          {child.published ? "Publiée" : "Masquée"}
                        </button>
                      </form>

                      <div className="flex gap-2">
                        <Link
                          href={`/admin/services/${id}/${child.id}`}
                          className="rounded border border-amber-500 px-4 py-2 text-[0.88rem] font-semibold text-amber-600 transition-colors hover:bg-amber-50"
                        >
                          Modifier
                        </Link>
                        <DeleteSpecialtyButton
                          id={child.id}
                          title={ct?.title ?? child.slug}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}