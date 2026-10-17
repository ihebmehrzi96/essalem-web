import "server-only";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const DIR = path.join(process.cwd(), "private", "candidatures");

const ALLOWED = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo par fichier

const EXT: Record<string, string> = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

/**
 * Enregistre un document de candidature HORS du dossier public.
 * Renvoie un identifiant de fichier, jamais une URL : l'accès passe
 * obligatoirement par une route protégée par la session.
 */
export async function savePrivateFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  if (!ALLOWED.includes(file.type)) {
    throw new Error("Format non accepté. Utilisez PDF, JPG, PNG, DOC ou DOCX.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error(`Le fichier « ${file.name} » dépasse 5 Mo.`);
  }

  const name = `${crypto.randomUUID()}.${EXT[file.type]}`;
  await mkdir(DIR, { recursive: true });
  await writeFile(path.join(DIR, name), Buffer.from(await file.arrayBuffer()));

  return name;
}

/** Chemin disque d'un fichier stocké. Le nom est validé pour empêcher
 *  toute remontée de répertoire (« ../../.env »). */
export function privateFilePath(name: string): string | null {
  if (!/^[a-f0-9-]{36}\.(pdf|jpg|png|doc|docx)$/i.test(name)) return null;
  return path.join(DIR, name);
}