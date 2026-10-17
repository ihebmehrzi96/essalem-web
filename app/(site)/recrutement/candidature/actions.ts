"use server";

import { prisma } from "@/lib/prisma";
import { savePrivateFile } from "@/lib/private-upload";

export type ApplicationState = { error?: string; success?: boolean };

export async function submitApplication(
  _prev: ApplicationState,
  formData: FormData
): Promise<ApplicationState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  const lastName = get("lastName");
  const firstName = get("firstName");
  const email = get("email");
  const phone = get("phone");

  if (!lastName || !firstName || !email || !phone) {
    return { error: "Nom, prénom, e-mail et téléphone sont obligatoires." };
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "Adresse e-mail invalide." };
  }

  const offerId = get("jobOfferId");
  const birth = get("birthDate");

  try {
    const [cv, motivation, diploma, baccalaureat] = await Promise.all([
      savePrivateFile(formData.get("cv") as File | null),
      savePrivateFile(formData.get("motivation") as File | null),
      savePrivateFile(formData.get("diploma") as File | null),
      savePrivateFile(formData.get("baccalaureat") as File | null),
    ]);

    // Relevés de notes : jusqu'à trois fichiers.
    const transcripts: string[] = [];
    for (const entry of formData.getAll("transcripts")) {
      if (transcripts.length >= 3) break;
      const saved = await savePrivateFile(entry as File);
      if (saved) transcripts.push(saved);
    }

    await prisma.application.create({
      data: {
        jobOfferId: offerId || null,
        lastName,
        firstName,
        maritalStatus: get("maritalStatus") || "Non précisé",
        email,
        phone,
        birthDate: birth ? new Date(birth) : null,
        address: get("address") || null,
        city: get("city") || null,
        postalCode: get("postalCode") || null,
        qualification: get("qualification") || null,
        promoYear: get("promoYear") || null,
        cv,
        motivation,
        diploma,
        baccalaureat,
        transcripts,
      },
    });

    return { success: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Erreur lors de l'envoi.",
    };
  }
}