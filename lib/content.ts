export const clinic = {
  name: "Clinique Essalem",
  address: "Place du Maghreb Arabe — 4000, Sousse, Tunisie",
  phone: "+216 73 210 375",
  phoneHref: "tel:+21673210375",
  intro:
    "Active depuis plus de 20 ans, la Clinique Essalem est un établissement multidisciplinaire privé de soins offrant des prestations et des services médicaux et chirurgicaux qui répondent aux besoins de santé de nos patients.",
  facebook: "https://www.facebook.com/cliniqueEssalemSousse",
  linkedin: "https://www.linkedin.com/in/clinique-essalem-sousse-331a30171/",
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  {
    label: "La clinique",
    href: "/presentation",
    children: [
      { label: "Présentation", href: "/presentation" },
      { label: "Démarche qualité", href: "/demarche-qualite" },
    ],
  },
  {
    label: "Nos services",
    href: "/services",
    children: [
      { label: "Spécialités chirurgicales", href: "/services/specialites-chirurgicales" },
      { label: "Spécialités médicales", href: "/services/specialites-medicales" },
      { label: "Gynécologie-Obstétrique", href: "/services/gynecologie-obstetrique" },
      { label: "Plateau technique", href: "/services/plateau-technique" },
      { label: "Chirurgie esthétique", href: "/services/chirurgie-esthetique" },
      { label: "Urgences", href: "/services/urgences" },
    ],
  },
  { label: "Hospitalisation", href: "/votre-sejour" },
  { label: "Actualités", href: "/actualites" },
  { label: "Carrière", href: "/recrutement" },
];


export const services: Service[] = [
  {
    slug: "specialites-chirurgicales",
    title: "Spécialités chirurgicales",
    blurb: "Blocs opératoires et équipes chirurgicales pour un large éventail d'interventions.",
    image: "/images/services/chirurgie.jpg",
  },
  {
    slug: "specialites-medicales",
    title: "Spécialités médicales",
    blurb: "Consultations, diagnostic et suivi assurés par des médecins spécialistes.",
    image: "/images/services/medecine.jpg",
  },
  {
    slug: "gynecologie-obstetrique",
    title: "Gynécologie-Obstétrique",
    blurb: "Suivi de grossesse, maternité et prise en charge gynécologique.",
    image: "/images/services/gynecologie.jpg",
  },
  {
    slug: "plateau-technique",
    title: "Plateau technique",
    blurb: "Imagerie, laboratoire et équipements au service du diagnostic.",
    image: "/images/services/plateau-technique.jpg",
  },
  {
    slug: "chirurgie-esthetique",
    title: "Chirurgie esthétique",
    blurb: "[TEXTE À REPRENDRE DU SITE ACTUEL]",
    image: "/images/services/esthetique.jpg",
  },
  {
    slug: "urgences",
    title: "Service des urgences",
    blurb: "Une équipe disponible 24 heures sur 24, 7 jours sur 7.",
    image: "/images/services/urgences.jpg",
  },
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
  { value: 20, suffix: "+", label: "années d'activité" },
  { value: 0, suffix: "", label: "spécialités", todo: true },
  { value: 0, suffix: "", label: "lits d'hospitalisation", todo: true },
  { value: 24, suffix: "h/24", label: "service des urgences" },
];



export const stay = [
  {
    step: "Avant",
    title: "L'admission",
    body: "[TEXTE — documents à préparer, démarches administratives]",
  },
  {
    step: "Pendant",
    title: "Le séjour",
    body: "[TEXTE — chambres, horaires de visite, restauration]",
  },
  {
    step: "Après",
    title: "La sortie",
    body: "[TEXTE — formalités de sortie, suivi post-opératoire]",
  },
];

export type Post = {
  slug: string;
  date: string;
  kind: string;
  title: string;
};

export const posts: Post[] = [
  {
    slug: "appel-offres-2026",
    date: "[DATE]",
    kind: "Appel d'offres",
    title: "La société clinique Essalem lance un appel d'offres 2026",
  },
  {
    slug: "congres-association-latine",
    date: "[DATE]",
    kind: "Événement",
    title:
      "Participation au Congrès de l'Association Latine pour l'Analyse des Systèmes de Santé",
  },
  {
    slug: "appel-offres-2025",
    date: "[DATE]",
    kind: "Appel d'offres",
    title: "La société clinique Essalem lance un appel d'offres 2025",
  },
];