export const clinic = {
  name: "Clinique Essalem",
  address: "Place du Maghreb Arabe — 4000, Sousse, Tunisie",
  phone: "+216 73 210 375",
  phoneHref: "tel:+21673210375",
  facebook: "https://www.facebook.com/cliniqueEssalemSousse",
  linkedin: "https://www.linkedin.com/in/clinique-essalem-sousse-331a30171/",
    email: "contact@clinique-essalem.com",
  instagram: "https://www.instagram.com/cliniqueessalemsousse/?hl=fr",
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

/** Bandeau défilant : les 22 spécialités, dans les trois langues. */
export const specialties: Record<"fr" | "ar" | "en", string[]> = {
  fr: [
    "Cathétérisme cardiaque et cardiologie interventionnelle",
    "Électroporation pour le traitement de la fibrillation auriculaire",
    "Oxygénothérapie hyperbare monoplace à moyenne pression",
    "Réanimation polyvalente",
    "Hépato-gastro-entérologie",
    "Neurologie",
    "Maladies infectieuses",
    "Pédiatrie",
    "Carcinologie – Oncologie",
    "Maladies respiratoires",
    "Chirurgie cardiaque",
    "Chirurgie vasculaire",
    "Chirurgie thoracique",
    "Chirurgie neurologique",
    "Chirurgie orthopédique et traumatologique",
    "Chirurgie urologique",
    "Chirurgie digestive",
    "Chirurgie esthétique",
    "Chirurgie maxillo-faciale",
    "Chirurgie bariatrique",
    "Gynécologie",
    "Obstétrique",
  ],
  ar: [
    "قسطرة القلب وطب القلب التداخلي",
    "الكيّ الكهربائي لعلاج الرجفان الأذيني",
    "العلاج بالأكسجين عالي الضغط",
    "الإنعاش متعدد الاختصاصات",
    "أمراض الكبد والجهاز الهضمي",
    "طب الأعصاب",
    "الأمراض المعدية",
    "طب الأطفال",
    "طب الأورام",
    "أمراض الجهاز التنفسي",
    "جراحة القلب",
    "جراحة الأوعية الدموية",
    "جراحة الصدر",
    "جراحة الأعصاب",
    "جراحة العظام والكسور",
    "جراحة المسالك البولية",
    "جراحة الجهاز الهضمي",
    "جراحة التجميل",
    "جراحة الوجه والفكين",
    "جراحة السمنة",
    "طب النساء",
    "التوليد",
  ],
  en: [
    "Cardiac Catheterization and Interventional Cardiology",
    "Electroporation for the Treatment of Atrial Fibrillation",
    "Hyperbaric Oxygen Therapy",
    "Multidisciplinary Intensive Care",
    "Hepatology and Gastroenterology",
    "Neurology",
    "Infectious Diseases",
    "Pediatrics",
    "Oncology",
    "Respiratory Diseases",
    "Cardiac Surgery",
    "Vascular Surgery",
    "Thoracic Surgery",
    "Neurosurgery",
    "Orthopedic and Trauma Surgery",
    "Urological Surgery",
    "Digestive Surgery",
    "Cosmetic Surgery",
    "Maxillofacial Surgery",
    "Bariatric Surgery",
    "Gynecology",
    "Obstetrics",
  ],
};

export const figures = [
  { value: 20, suffix: "+", key: "years" },
  { value: 0, suffix: "", key: "specialties", todo: true },
  { value: 0, suffix: "", key: "beds", todo: true },
  { value: 24, suffix: "h/24", key: "emergency" },
];

/** Contenu détaillé de chaque service, en français (non traduit). */
export const serviceDetails: Record<
  string,
  { intro: string; sections: { title: string; body: string }[] }
> = {
  "specialites-chirurgicales": {
    intro: "[TEXTE À REPRENDRE DU SITE ACTUEL — présentation des spécialités chirurgicales]",
    sections: [
      { title: "Chirurgie générale", body: "[TEXTE]" },
      { title: "Chirurgie esthétique", body: "[TEXTE]" },
      { title: "Orthopédie", body: "[TEXTE]" },
    ],
  },
  "specialites-medicales": {
    intro: "[TEXTE À REPRENDRE — présentation des spécialités médicales]",
    sections: [
      { title: "Cardiologie", body: "[TEXTE]" },
      { title: "Gastro-entérologie", body: "[TEXTE]" },
    ],
  },
  "gynecologie-obstetrique": {
    intro: "[TEXTE À REPRENDRE — gynécologie et obstétrique]",
    sections: [
      { title: "Suivi de grossesse", body: "[TEXTE]" },
      { title: "Maternité", body: "[TEXTE]" },
    ],
  },
  "plateau-technique": {
    intro: "[TEXTE À REPRENDRE — plateau technique]",
    sections: [
      { title: "Imagerie médicale", body: "[TEXTE]" },
      { title: "Laboratoire", body: "[TEXTE]" },
    ],
  },
  urgences: {
    intro: "[TEXTE À REPRENDRE — service des urgences]",
    sections: [
      { title: "Accueil permanent", body: "[TEXTE]" },
      { title: "Prise en charge", body: "[TEXTE]" },
    ],
  },
};

