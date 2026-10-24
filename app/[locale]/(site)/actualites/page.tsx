import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { listPublishedPostsPaged } from "@/lib/posts";
import Reveal from "@/components/reveal";



export const metadata = {
  title: "Actualités — Clinique Essalem",
  description:
    "Appels d'offres, événements et nouvelles de la Clinique Essalem à Sousse.",
};

const PER_PAGE = 9;

export default async function ActualitesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const [{ locale }, { page: raw }] = await Promise.all([params, searchParams]);
  const page = Math.max(1, Number(raw) || 1);

  const [posts, total] = await listPublishedPostsPaged(page, PER_PAGE);
  const pages = Math.ceil(total / PER_PAGE);

  const t = await getTranslations({ locale, namespace: "news" });

  const format = (date: Date) =>
    new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

  return (
    <main className="pb-(--spacing-section)">

      {/* En-tête */}
      <section className="px-5 pt-32 pb-14 sm:px-8 md:pt-44">
        <div className="mx-auto max-w-[1150px]">
          <span className="text-[0.8rem] tracking-[0.24em] text-leaf uppercase">
            {t("heading")}
          </span>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.98]">
            {t("heading")}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1150px] px-5 sm:px-8">

        {posts.length === 0 ? (
          <p className="bg-mist p-10 text-stone">
            Aucune actualité publiée pour le moment.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 0.08}>
                <Link
                  href={`/actualites/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden border border-line bg-paper transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-xl hover:shadow-ink/8"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-2 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-[0.85rem] text-stone">
                        {post.kind}
                      </span>
                    )}

                    <span className="absolute start-3 top-3 bg-paper/90 px-3 py-1 text-[0.74rem] text-ink backdrop-blur-sm">
                      {post.kind}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-2.5 p-6">
                    <span className="text-[0.82rem] text-stone">
                      {format(post.createdAt)}
                    </span>

                    <h2 className="text-[1.2rem] leading-snug transition-colors duration-500 group-hover:text-leaf-deep">
                      {post.title}
                    </h2>

                    <span className="mt-auto flex items-center justify-between pt-5">
                      <span className="text-[0.9rem] font-medium text-leaf-deep">
                        {t("seeMore")}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-ink group-hover:bg-ink">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper rtl:-scale-x-100" aria-hidden="true">
                          <path d="M7 17 17 7" /><path d="M8 7h9v9" />
                        </svg>
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <nav className="mt-16 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={`/actualites?page=${n}`}
                aria-current={n === page ? "page" : undefined}
                className={`inline-flex h-11 w-11 items-center justify-center text-[0.92rem] transition-colors ${
                  n === page
                    ? "bg-ink text-paper"
                    : "border border-line hover:border-ink"
                }`}
              >
                {n}
              </Link>
            ))}
          </nav>
        )}

      </div>
    </main>
  );
}