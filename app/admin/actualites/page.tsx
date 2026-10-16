import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { listAllPosts } from "@/lib/posts";
import AdminHeader from "@/components/admin-header";
import DeleteButton from "./delete-button";
import { togglePublished } from "./actions";

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

export default async function AdminNewsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const posts = await listAllPosts();

  return (
    <>
      <AdminHeader name={session.name} />

      <div className="mx-auto max-w-[1400px] px-5 py-8">
        <div className="rounded border border-line bg-paper p-6 sm:p-10">

          <h1 className="text-[2.3rem] font-bold tracking-tight">
            Liste des actualités
          </h1>

          <Link
            href="/admin/actualites/nouvelle"
            className="mt-6 inline-flex min-h-12 items-center rounded border border-leaf px-7 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-paper"
          >
            Ajouter une actualité
          </Link>

          {posts.length === 0 ? (
            <p className="mt-10 text-stone">Aucune actualité pour le moment.</p>
          ) : (
            <div className="mt-10 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border border-line px-5 py-5 font-bold">Titre</th>
                    <th className="border border-line px-5 py-5 font-bold whitespace-nowrap">
                      Date de création
                    </th>
                    <th className="border border-line px-5 py-5 font-bold">Statut</th>
                    <th className="border border-line px-5 py-5 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, i) => (
                    <tr key={post.id} className={i % 2 === 0 ? "bg-[#f4f4f4]" : "bg-paper"}>
                      <td className="border border-line px-5 py-5 align-top">
                        {post.title}
                      </td>

                      <td className="border border-line px-5 py-5 align-top whitespace-nowrap">
                        {formatDate(post.createdAt)}
                      </td>

                      {/* Statut cliquable : bascule publiée / brouillon */}
                      <td className="border border-line px-5 py-5 align-top">
                        <form action={togglePublished}>
                          <input type="hidden" name="id" value={post.id} />
                          <button
                            type="submit"
                            title={
                              post.published
                                ? "Cliquer pour dépublier"
                                : "Cliquer pour publier"
                            }
                            className={`inline-flex items-center gap-2 rounded px-3 py-2 text-[0.85rem] font-semibold transition-opacity hover:opacity-70 ${
                              post.published
                                ? "bg-leaf/15 text-leaf-deep"
                                : "bg-mist-deep text-stone"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                post.published ? "bg-leaf" : "bg-stone"
                              }`}
                              aria-hidden="true"
                            />
                            {post.published ? "Publiée" : "Brouillon"}
                          </button>
                        </form>
                      </td>

                      <td className="border border-line px-5 py-5 align-top">
                        <div className="flex min-w-[200px] flex-col gap-2">
                          <Link
                            href={`/actualites/${post.slug}`}
                            target="_blank"
                            className="rounded border border-sky-500 px-5 py-2.5 text-center text-[0.9rem] font-semibold text-sky-600 transition-colors hover:bg-sky-50"
                          >
                            voir Détail
                          </Link>

                          <Link
                            href={`/admin/actualites/${post.id}`}
                            className="rounded border border-amber-500 px-5 py-2.5 text-center text-[0.9rem] font-semibold text-amber-600 transition-colors hover:bg-amber-50"
                          >
                            Modifier
                          </Link>

                          {/* Bouton explicite, en plus du statut cliquable */}
                          <form action={togglePublished}>
                            <input type="hidden" name="id" value={post.id} />
                            <button
                              type="submit"
                              className="w-full rounded border border-leaf px-5 py-2.5 text-[0.9rem] font-semibold text-leaf transition-colors hover:bg-leaf hover:text-paper"
                            >
                              {post.published ? "Dépublier" : "Publier"}
                            </button>
                          </form>

                          <DeleteButton id={post.id} title={post.title} />
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