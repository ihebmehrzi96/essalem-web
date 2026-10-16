import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/content";

/** Classes de taille pour une grille asymétrique : la première carte est large. */
const SPANS = [
  "md:col-span-4",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-4",
];

export default function Services() {
  return (
    <section id="services" className="px-5 py-(--spacing-section) sm:px-6 md:px-12">
      <div className="mx-auto max-w-[1280px]">

        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <h2 className="max-w-[18ch] text-[clamp(2rem,4.4vw,3.4rem)]">
            Une prise en charge complète, sous un même toit
          </h2>
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center border-b border-ink pb-1 font-medium transition-colors hover:border-leaf hover:text-leaf"
          >
            Toutes les spécialités
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-6">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl bg-ink-soft p-7 sm:min-h-[380px] ${SPANS[i] ?? "md:col-span-2"}`}
            >
              {/* Visuel */}
              {service.image ? (
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-white/35">
                  [PHOTO — {service.title}]
                </span>
              )}

              {/* Voile */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent transition-opacity duration-500 group-hover:from-ink" />

              {/* Texte */}
              <div className="relative flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-[clamp(1.35rem,2.2vw,1.85rem)] text-paper">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-[0.92rem] leading-relaxed text-paper/0 transition-colors duration-500 group-hover:text-paper/75">
                    {service.blurb}
                  </p>
                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper/15 backdrop-blur-md transition-colors duration-500 group-hover:bg-paper">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-paper transition-colors duration-500 group-hover:text-ink"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}