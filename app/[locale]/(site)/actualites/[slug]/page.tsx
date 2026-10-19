import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getPostBySlug, listPublishedPosts } from "@/lib/posts";
import Reveal from "@/components/reveal";

export const instant = false;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const all = await listPublishedPosts(4);
  const others = all.filter((p) => p.slug !== slug).slice(0, 3);

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
      <section className="px-5 pt-32 pb-12 sm:px-8 md:pt-44">
        <div className="mx-auto max-w-[800px]">
          <Link
            href="/actualites"
            className="group inline-flex items-center gap-2 text-[0.9rem] text-stone transition-colors hover:text-ink"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-400 group-hover:-translate-x-1 rtl:-scale-x-100" aria-hidden="true">
              <path d="M19 12H5" /><path d="m11 18-6-6 6-6" />
            </svg>
            {t("all")}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="bg-leaf/12 px-3 py-1 text-[0.78rem] text-leaf-deep">
              {post.kind}
            </span>
            <span className="text-[0.88rem] text-stone">
              {format(post.createdAt)}
            </span>
          </div>

          <h1 className="mt-5 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.06]">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Image */}
      {post.image && (
        <div className="mx-auto max-w-[800px] px-5 sm:px-8">
          <div className="relative w-full overflow-hidden bg-mist">
            <Image
              src={post.image}
              alt=""
              width={1600}
              height={1200}
              priority
              sizes="(max-width: 800px) 100vw, 800px"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Corps */}
      <article className="mx-auto mt-12 max-w-[800px] px-5 text-[1.05rem] leading-[1.85] whitespace-pre-wrap sm:px-8">
        {post.body}
      </article>

      {/* Autres actualités */}
      {others.length > 0 && (
        <Reveal>
          <section className="mx-auto mt-24 max-w-[800px] border-t border-line px-5 pt-12 sm:px-8">
            <h2 className="text-[0.9rem] tracking-[0.22em] text-leaf uppercase">
              {t("all")}
            </h2>

            <ul className="mt-7">
              {others.map((other) => (
                <li key={other.id}>
                  <Link
                    href={`/actualites/${other.slug}`}
                    className="group flex items-baseline justify-between gap-6 border-b border-line py-5 first:border-t"
                  >
                    <span className="font-display text-[1.2rem] leading-snug tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2">
                      {other.title}
                    </span>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-stone transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-leaf rtl:-scale-x-100" aria-hidden="true">
                      <path d="M7 17 17 7" /><path d="M8 7h9v9" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      )}
    </main>
  );
}