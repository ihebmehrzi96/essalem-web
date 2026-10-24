import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  // cacheComponents et partialPrefetching désactivés : le site lit la session,
  // la base de données et la langue de la requête.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  /**
   * Redirections 301 depuis les adresses de l'ancien site.
   * Les règles spécifiques doivent rester AVANT les règles génériques.
   */
  async redirects() {
    return [
      // ── Pages simples : seul le préfixe de langue change ──
      { source: "/presentation", destination: "/fr/presentation", permanent: true },
      { source: "/demarche-qualite", destination: "/fr/demarche-qualite", permanent: true },
      { source: "/votre-sejour", destination: "/fr/votre-sejour", permanent: true },
      { source: "/contact", destination: "/fr/contact", permanent: true },
      { source: "/recrutement", destination: "/fr/recrutement", permanent: true },

      // ── Pôles dont l'adresse change ──
      { source: "/urgence", destination: "/fr/services/urgences", permanent: true },
      { source: "/gynecologie-obstretrie", destination: "/fr/services/gynecologie-obstetrique", permanent: true },
      { source: "/plateau-technique", destination: "/fr/services/plateau-technique", permanent: true },
      { source: "/specialites-medicales", destination: "/fr/services/specialites-medicales", permanent: true },
      { source: "/specialites-chirurgicales", destination: "/fr/services/specialites-chirurgicales", permanent: true },

      // ── Spécialités dont l'adresse change (SPÉCIFIQUES, avant les génériques) ──
      { source: "/specialites-medicales/electroporation_traitement", destination: "/fr/services/specialites-medicales/electroporation", permanent: true },
      { source: "/specialites-medicales/carcinologie", destination: "/fr/services/specialites-medicales/carcinologie-oncologie", permanent: true },
      { source: "/specialites-medicales/gynecologie", destination: "/fr/services/gynecologie-obstetrique/gynecologie", permanent: true },
      { source: "/specialites-medicales/obstetrique", destination: "/fr/services/gynecologie-obstetrique/obstetrique", permanent: true },

      // ── Sous-spécialités de la chirurgie esthétique ──
      { source: "/specialites-chirurgicales/chirurgies-esthetiques/chirurgie-visage", destination: "/fr/services/specialites-chirurgicales/chirurgie-du-visage", permanent: true },
      { source: "/specialites-chirurgicales/chirurgies-esthetiques/chirurgie-silhouette", destination: "/fr/services/specialites-chirurgicales/chirurgie-de-la-silhouette", permanent: true },
      { source: "/specialites-chirurgicales/chirurgies-esthetiques/dermatologie-esthetique-soins-anti-age", destination: "/fr/services/specialites-chirurgicales/dermatologie-esthetique", permanent: true },

      // ── Règles génériques : même nom, nouvelle structure ──
      { source: "/specialites-medicales/:slug", destination: "/fr/services/specialites-medicales/:slug", permanent: true },
      { source: "/specialites-chirurgicales/:slug", destination: "/fr/services/specialites-chirurgicales/:slug", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);