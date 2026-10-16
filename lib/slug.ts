/**
 * Transforme un titre en identifiant d'URL :
 * "Appel d'offres 2026" → "appel-d-offres-2026"
 */
export function slugify(input: string) {
  return input
    .normalize("NFD")                  // sépare les lettres de leurs accents
    .replace(/[\u0300-\u036f]/g, "")   // supprime les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")       // tout le reste devient un tiret
    .replace(/^-+|-+$/g, "")           // pas de tiret au début ni à la fin
    .slice(0, 80);
}