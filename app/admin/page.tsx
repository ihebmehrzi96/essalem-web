import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin-header";



const sections = [
  {
    label: "Actualités",
    href: "/admin/actualites",
    description: "Ajouter, modifier ou publier des actualités.",
  },
  {
    label: "Offres d'emploi",
    href: "/admin/offres-emploi",
    description: "Gérer les offres et consulter les candidatures.",
  },
  {
    label: "Enquête de satisfaction",
    href: "/admin/enquete-satisfaction",
    description: "Consulter les réponses des patients.",
  },
  {
    label: "Newsletters",
    href: "/admin/newsletters",
    description: "Voir les abonnés et envoyer une newsletter.",
  },
    {
    label: "Messages",
    href: "/admin/messages",
    description: "Lire et répondre aux messages du formulaire de contact.",
  },
];

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [total, published] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
  ]);

  return (
    <>
      <AdminHeader name={session.name} />

      <div className="mx-auto max-w-[1400px] px-5 py-8">
        <div className="rounded border border-line bg-paper p-6 sm:p-10">

          <h1 className="text-[2.3rem] font-bold tracking-tight">
            Tableau de bord
          </h1>
          <p className="mt-2 text-stone">
            Gérez le contenu du site de la Clinique Essalem.
          </p>

          {/* Chiffres */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded border border-line bg-[#f7f7f7] p-6">
              <span className="block text-[2rem] font-bold leading-none">{total}</span>
              <span className="mt-1.5 block text-[0.9rem] text-stone">
                actualités au total
              </span>
            </div>
            <div className="rounded border border-line bg-[#f7f7f7] p-6">
              <span className="block text-[2rem] font-bold leading-none text-leaf-deep">
                {published}
              </span>
              <span className="mt-1.5 block text-[0.9rem] text-stone">
                publiées sur le site
              </span>
            </div>
            <div className="rounded border border-line bg-[#f7f7f7] p-6">
              <span className="block text-[2rem] font-bold leading-none text-stone">
                {total - published}
              </span>
              <span className="mt-1.5 block text-[0.9rem] text-stone">
                en brouillon
              </span>
            </div>
          </div>

          {/* Sections */}
          <h2 className="mt-12 text-xl font-bold">Sections</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group rounded border border-line p-6 transition-colors hover:border-leaf"
              >
                <span className="block text-[1.15rem] font-semibold transition-colors group-hover:text-leaf-deep">
                  {section.label}
                </span>
                <span className="mt-1.5 block text-[0.9rem] text-stone">
                  {section.description}
                </span>
              </Link>
            ))}
          </div>

          {/* Accès rapide */}
          <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
            <Link
              href="/admin/actualites/nouvelle"
              className="inline-flex min-h-12 items-center rounded border border-leaf px-7 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-paper"
            >
              Ajouter une actualité
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex min-h-12 items-center rounded border border-line px-7 font-semibold transition-colors hover:border-ink"
            >
              Voir le site
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}