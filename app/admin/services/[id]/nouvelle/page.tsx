import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getCategoryById, getSpecialtyById } from "@/lib/services";
import AdminHeader from "@/components/admin-header";
import SpecialtyForm from "../specialty-form";

export const instant = false;

export default async function NewSpecialtyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ parent?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [{ id }, { parent }] = await Promise.all([params, searchParams]);

  const category = await getCategoryById(id);
  if (!category) notFound();

  const parentSpecialty = parent ? await getSpecialtyById(parent) : null;
  const parentTitle = parentSpecialty?.translations.find(
    (t) => t.locale === "fr"
  )?.title;

  const fr = category.translations.find((t) => t.locale === "fr");

  return (
    <>
      <AdminHeader name={session.name} />
      <SpecialtyForm
        mode="create"
        categoryId={id}
        categoryTitle={fr?.title ?? category.slug}
        parentId={parent}
        parentTitle={parentTitle}
      />
    </>
  );
}