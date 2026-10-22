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
    body?: Text;
  /** Image affichée à côté du texte, pour un pôle à page simple. */
  bodyImage?: string;
  specialties: Specialty[];
};