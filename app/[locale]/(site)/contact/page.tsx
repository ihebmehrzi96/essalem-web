import { notFound } from "next/navigation";
import Reveal from "@/components/reveal";
import { clinic } from "@/lib/content";
import { contact } from "@/content/contact";
import ContactForm from "./form";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.3916896023056!2d10.618824216098437!3d35.83939798015767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13027580bf92c027%3A0xcdb5761297fc24b0!2sClinique%20Essalem%20Sousse!5e0!3m2!1sfr!2stn!4v1600960303372!5m2!1sfr!2stn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = contact[locale as keyof typeof contact];

  return {
    title: `${page?.title ?? "Contact"} — Clinique Essalem`,
    description: page?.intro?.slice(0, 160),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = contact[locale as keyof typeof contact];
  if (!page) notFound();

  return (
    <main className="pb-(--spacing-section)">

      <section className="px-5 pt-32 pb-14 sm:px-8 md:pt-44">
        <div className="mx-auto max-w-[1150px]">
          <span className="text-[0.8rem] tracking-[0.24em] text-leaf uppercase">
            {page.eyebrow}
          </span>
          <h1 className="mt-4 text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.98]">
            {page.title}
          </h1>
          <p className="mt-7 max-w-[52ch] text-[1.05rem] leading-relaxed text-stone">
            {page.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1150px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,0.75fr)] lg:gap-16">

          <Reveal>
            <ContactForm t={page.form} />
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="flex flex-col gap-10 bg-ink p-8 sm:p-10">
              <div>
                <h2 className="text-[0.88rem] tracking-[0.22em] text-leaf uppercase">
                  {page.aside.contact}
                </h2>
                <div className="mt-5 flex flex-col gap-2">
                  <a
                    href={`mailto:${clinic.email}`}
                    dir="ltr"
                    className="w-fit text-paper transition-colors hover:text-leaf"
                  >
                    {clinic.email}
                  </a>
                  <a
                    href={clinic.phoneHref}
                    dir="ltr"
                    className="w-fit text-paper transition-colors hover:text-leaf"
                  >
                    {clinic.phone}
                  </a>
                </div>
              </div>

              <div>
                <h2 className="text-[0.88rem] tracking-[0.22em] text-leaf uppercase">
                  {page.aside.address}
                </h2>
                <p className="mt-5 leading-[1.9] text-paper/70">
                  Place du Maghreb Arabe
                  <br />
                  4000, Sousse
                  <br />
                  Tunisie
                </p>
              </div>

              <div>
                <h2 className="text-[0.88rem] tracking-[0.22em] text-leaf uppercase">
                  {page.aside.social}
                </h2>
                <div className="mt-5 flex gap-3">
                  <a
                    href={clinic.facebook}
                    aria-label="Facebook"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-paper transition-colors hover:bg-paper hover:text-ink"
                  >
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3h-3v-2c0-.6.4-1 1-1Z" />
                    </svg>
                  </a>
                  <a
                    href={clinic.linkedin}
                    aria-label="LinkedIn"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-paper transition-colors hover:bg-paper hover:text-ink"
                  >
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.5 8H4v12h2.5V8ZM5.2 3.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20 13.3c0-3-1.6-4.5-3.8-4.5-1.5 0-2.3.8-2.7 1.4V8H11v12h2.5v-6.6c0-1.3.7-2.1 1.8-2.1s1.7.8 1.7 2.1V20H20v-6.7Z" />
                    </svg>
                  </a>
                  <a
                    href={clinic.instagram}
                    aria-label="Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-paper transition-colors hover:bg-paper hover:text-ink"
                  >
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                </div>
              </div>
            </aside>
          </Reveal>

        </div>
      </div>

      <div className="mt-20 h-[380px] w-full sm:h-[460px]">
        <iframe
          src={MAP_SRC}
          title="Clinique Essalem"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>
    </main>
  );
}