import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getCategoryById } from "@/lib/services";
import AdminHeader from "@/components/admin-header";
import CategoryForm from "./form";



export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) notFound();

  const byLocale = Object.fromEntries(
    category.translations.map((t) => [t.locale, t])
  );

  return (
    <>
      <AdminHeader name={session.name} />
      <CategoryForm
        category={{
          id: category.id,
          slug: category.slug,
          image: category.image,
          published: category.published,
          translations: {
            fr: { title: byLocale.fr?.title ?? "", intro: byLocale.fr?.intro ?? "" },
            ar: { title: byLocale.ar?.title ?? "", intro: byLocale.ar?.intro ?? "" },
            en: { title: byLocale.en?.title ?? "", intro: byLocale.en?.intro ?? "" },
          },
        }}
      />
    </>
  );
}