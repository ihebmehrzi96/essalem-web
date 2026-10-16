import "server-only";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 4 * 1024 * 1024; // 4 Mo

/**
 * Enregistre une image envoyée par un formulaire et renvoie son chemin public.
 * Renvoie null si aucun fichier n'a été joint.
 */
export async function saveImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  if (!ALLOWED.includes(file.type)) {
    throw new Error("Format non accepté. Utilisez JPG, PNG ou WebP.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("Image trop lourde. Maximum 4 Mo.");
  }

  // Nom aléatoire : évite les collisions et ne fait pas confiance
  // au nom de fichier envoyé par le navigateur.
  const ext = file.type === "image/png" ? "png"
            : file.type === "image/webp" ? "webp"
            : "jpg";
  const name = `${crypto.randomUUID()}.${ext}`;

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), bytes);

  return `/uploads/${name}`;
}