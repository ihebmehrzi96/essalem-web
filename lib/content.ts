export const clinic = {
  name: "Clinique Essalem",
  address: "Place du Maghreb Arabe — 4000, Sousse, Tunisie",
  phone: "+216 73 210 375",
  phoneHref: "tel:+21673210375",
  facebook: "https://www.facebook.com/cliniqueEssalemSousse",
  linkedin: "https://www.linkedin.com/in/clinique-essalem-sousse-331a30171/",
};

export type NavItem = {
  key: string;
  href: string;
  children?: { key: string; href: string }[];
};

export const nav: NavItem[] = [
  {
    key: "clinic",
    href: "/presentation",
    children: [
      { key: "presentation", href: "/presentation" },
      { key: "quality", href: "/demarche-qualite" },
    ],
  },
  {
    key: "services",
    href: "/services",
    children: [
      { key: "surgical", href: "/services/specialites-chirurgicales" },
      { key: "medical", href: "/services/specialites-medicales" },
      { key: "gyneco", href: "/services/gynecologie-obstetrique" },
      { key: "technical", href: "/services/plateau-technique" },
      { key: "emergency", href: "/services/urgences" },
    ],
  },
  { key: "stay", href: "/votre-sejour" },
  { key: "news", href: "/actualites" },
  { key: "career", href: "/recrutement" },
];

export type Service = {
  slug: string;
  /** Clé dans messages/*.json → section "services". */
  key: string;
  image?: string;
};

export const services: Service[] = [
  { slug: "specialites-chirurgicales", key: "surgical", image: "/images/services/chirurgie.jpg" },
  { slug: "specialites-medicales", key: "medical", image: "/images/services/medecine.jpg" },
  { slug: "gynecologie-obstetrique", key: "gyneco", image: "/images/services/gynecologie.jpg" },
  { slug: "plateau-technique", key: "technical", image: "/images/services/plateau-technique.jpg" },
  { slug: "urgences", key: "emergency", image: "/images/services/urgences.jpg" },
];

/** Bandeau défilant — remplacez par la vraie liste des spécialités. */
export const specialties = [
  "Cardiologie",
  "Chirurgie générale",
  "Orthopédie",
  "Gynécologie",
  "Obstétrique",
  "Radiologie",
  "Anesthésie-Réanimation",
  "Gastro-entérologie",
  "Urologie",
  "Ophtalmologie",
  "ORL",
  "Pédiatrie",
];

export const figures = [
  { value: 20, suffix: "+", key: "years" },
  { value: 0, suffix: "", key: "specialties", todo: true },
  { value: 0, suffix: "", key: "beds", todo: true },
  { value: 24, suffix: "h/24", key: "emergency" },
];