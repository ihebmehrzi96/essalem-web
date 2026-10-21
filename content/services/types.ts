export type Locale = "fr" | "ar" | "en";

/** Un texte dans les trois langues. */
export type Text = Record<Locale, string>;

export type Specialty = {
  slug: string;
  title: Text;
  body?: Text;
  image?: string;
  children?: Specialty[];
};

export type Category = {
  slug: string;
  title: Text;
  intro?: Text;
  image?: string;
  specialties: Specialty[];
};