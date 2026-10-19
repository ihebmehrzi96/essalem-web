import Link from "next/link";
import Image from "next/image";
import { logout } from "@/app/admin/actions";

const adminNav = [
  { label: "Messages", href: "/admin/messages" },
  { label: "Enquête de satisfaction", href: "/admin/enquete-satisfaction" },
  { label: "Offres d'emploi", href: "/admin/offres-emploi" },
  { label: "Actualités", href: "/admin/actualites" },
  { label: "Newsletters", href: "/admin/newsletters" },
];

export default function AdminHeader({ name }: { name: string }) {
  return (
    <header className="border-b border-line bg-paper">
      <div className="px-6 pt-3 text-right text-[0.9rem] text-stone">
        Bonjour, {name}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 px-6 pb-4">
        <Link href="/admin" aria-label="Administration" className="shrink-0">
          <Image
            src="/logo-essalem.png"
            alt="Clinique Essalem"
            width={675}
            height={372}
            className="h-14 w-auto"
          />
        </Link>

        <nav className="flex flex-wrap items-center gap-7 text-[0.95rem]">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-ink transition-colors hover:text-leaf"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form action={logout}>
          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-md bg-leaf px-6 text-[0.9rem] font-semibold tracking-wide text-paper uppercase transition-colors hover:bg-leaf-deep"
          >
            Déconnexion
          </button>
        </form>
      </div>
    </header>
  );
}