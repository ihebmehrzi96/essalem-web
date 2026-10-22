import type { Category } from "./types";
import { chirurgicales } from "./chirurgicales";
import { medicales } from "./medicales";
import { gynecologie } from "./gynecologie";
import { plateauTechnique } from "./plateau-technique";
import { urgences } from "./urgence";

export type { Locale, Text, Specialty, Category } from "./types";

export const categories: Category[] = [
  chirurgicales,
  medicales,
  gynecologie,
  plateauTechnique,
 urgences,
];

/* ───────── Helpers ───────── */

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

/** Cherche une spécialité à n'importe quel niveau d'un pôle. */
export function findSpecialty(categorySlug: string, specialtySlug: string) {
  const category = getCategory(categorySlug);
  if (!category) return null;

  for (const specialty of category.specialties) {
    if (specialty.slug === specialtySlug) {
      return { category, specialty, parent: null };
    }
    for (const child of specialty.children ?? []) {
      if (child.slug === specialtySlug) {
        return { category, specialty: child, parent: specialty };
      }
    }
  }
  return null;
}

/** Tous les chemins, pour generateStaticParams. */
export function allSpecialtyPaths() {
  const paths: { slug: string; specialty: string }[] = [];
  for (const category of categories) {
    for (const specialty of category.specialties) {
      paths.push({ slug: category.slug, specialty: specialty.slug });
      for (const child of specialty.children ?? []) {
        paths.push({ slug: category.slug, specialty: child.slug });
      }
    }
  }
  return paths;
}