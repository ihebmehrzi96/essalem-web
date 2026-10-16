import Link from "next/link";
import { clinic } from "@/lib/content";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.3916896023056!2d10.618824216098437!3d35.83939798015767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13027580bf92c027%3A0xcdb5761297fc24b0!2sClinique%20Essalem%20Sousse!5e0!3m2!1sfr!2stn!4v1600960303372!5m2!1sfr!2stn";

/** Carte pleine largeur, juste au-dessus du pied de page. */
export function Contact() {
  return (
    <div className="h-[320px] w-full sm:h-[420px]">
      <iframe
        src={MAP_SRC}
        title="Plan d'accès à la Clinique Essalem"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
      />
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-ink-soft px-5 py-16 text-white/60 sm:px-6 md:px-12">
      <div className="mx-auto max-w-[1280px]">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Coordonnées */}
          <div>
            <span className="font-display block text-lg text-paper">
              {clinic.name}
            </span>
            <p className="mt-4 text-[0.95rem] leading-relaxed">
              Place du Maghreb Arabe
              <br />
              4000, Sousse — Tunisie
            </p>
            <a
              href={clinic.phoneHref}
              className="mt-4 inline-flex items-center gap-2.5 text-paper transition-colors hover:text-leaf"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
              </svg>
              {clinic.phone}
            </a>
          </div>

          {/* Services */}
          <nav className="flex flex-col gap-3 text-[0.95rem]">
            <span className="mb-1 text-paper">Nos services</span>
            <Link href="/services/specialites-chirurgicales" className="hover:text-paper">Spécialités chirurgicales</Link>
            <Link href="/services/specialites-medicales" className="hover:text-paper">Spécialités médicales</Link>
            <Link href="/services/gynecologie-obstetrique" className="hover:text-paper">Gynécologie-Obstétrique</Link>
            <Link href="/services/plateau-technique" className="hover:text-paper">Plateau technique</Link>
            <Link href="/services/urgences" className="hover:text-paper">Service des urgences</Link>
          </nav>

          {/* Restons en contact */}
          <nav className="flex flex-col gap-3 text-[0.95rem]">
            <span className="mb-1 text-paper">Restons en contact</span>
            <Link href="/enquete-satisfaction" className="underline underline-offset-4 hover:text-paper">
              Donner votre avis
            </Link>
            <Link href="/recrutement" className="underline underline-offset-4 hover:text-paper">
              Recrutement
            </Link>
            <Link href="/contact" className="underline underline-offset-4 hover:text-paper">
              Contact
            </Link>
          </nav>

          {/* Suivez-nous */}
          <div>
            <span className="mb-4 block text-[0.95rem] text-paper">Suivez-nous</span>
            <div className="flex gap-3">
              <a
                href={clinic.facebook}
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3h-3v-2c0-.6.4-1 1-1Z" />
                </svg>
              </a>
              <a
                href={clinic.linkedin}
                aria-label="LinkedIn"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.5 8H4v12h2.5V8ZM5.2 3.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20 13.3c0-3-1.6-4.5-3.8-4.5-1.5 0-2.3.8-2.7 1.4V8H11v12h2.5v-6.6c0-1.3.7-2.1 1.8-2.1s1.7.8 1.7 2.1V20H20v-6.7Z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-7 text-[0.85rem]">
          <span>© 2026 {clinic.name}. Tous droits réservés.</span>
          <span>Sousse, Tunisie</span>
        </div>

      </div>
    </footer>
  );
}