import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Reveal from "@/components/reveal";

type NewsPost = {
  id: string;
  slug: string;
  title: string;
  kind: string;
  image: string | null;
  createdAt: Date;
};

export function News({ posts }: { posts: NewsPost[] }) {
  const t = useTranslations("news");
  const locale = useLocale();

  if (posts.length === 0) return null;

  const format = (date: Date) =>
    new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

  return (
    <section id="actualites" className="px-5 py-(--spacing-section) sm:px-6 md:px-12">
      <div className="mx-auto max-w-[1280px]">

        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
            <h2 className="text-[clamp(2rem,4.4vw,3.4rem)]">{t("heading")}</h2>
            <Link
              href="/actualites"
              className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-line px-5 font-medium transition-colors hover:border-ink"
            >
              {t("all")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-1 rtl:-scale-x-100" aria-hidden="true">
                <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.09}>
              <Link
                href={`/actualites/${post.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-xl hover:shadow-ink/8"
              >
                <span className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl">
                  <span className="sheen absolute inset-y-0 -left-full w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                </span>

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

                  <span className="absolute start-3 top-3 rounded-full bg-paper/85 px-3 py-1 text-[0.74rem] text-ink backdrop-blur-sm">
                    {post.kind}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <span className="text-[0.82rem] text-stone">
                    {format(post.createdAt)}
                  </span>

                  <h3 className="text-[1.2rem] leading-snug transition-colors duration-500 group-hover:text-leaf-deep">
                    {post.title}
                  </h3>

                  <span className="mt-auto flex items-center justify-between pt-4">
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

      </div>
    </section>
  );
}