import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { privateFilePath } from "@/lib/private-upload";
export const instant = false;
const TYPES: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  png: "image/png",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  // Seule une session administrateur valide peut lire ces fichiers.
  const session = await getSession();
  if (!session) {
    return new NextResponse("Non autorisé", { status: 401 });
  }

  const { name } = await params;
  const filePath = privateFilePath(name);
  if (!filePath) {
    return new NextResponse("Fichier introuvable", { status: 404 });
  }

  try {
    const data = await readFile(filePath);
    const ext = name.split(".").pop()?.toLowerCase() ?? "";

    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": TYPES[ext] ?? "application/octet-stream",
        "Content-Disposition": `inline; filename="${name}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new NextResponse("Fichier introuvable", { status: 404 });
  }
}