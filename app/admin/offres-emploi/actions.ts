"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export type OfferState = { error?: string };

async function guard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

export async function createOffer(
  _prev: OfferState,
  formData: FormData
): Promise<OfferState> {
  await guard();

  const ref = String(formData.get("ref") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const active = formData.get("active") === "on";

  if (!title || !body) {
    return { error: "Le titre et la description sont obligatoires." };
  }

  await prisma.jobOffer.create({
    data: { ref: ref || title, title, body, active },
  });

  revalidatePath("/admin/offres-emploi");
  revalidatePath("/recrutement");
  redirect("/admin/offres-emploi");
}

export async function updateOffer(
  _prev: OfferState,
  formData: FormData
): Promise<OfferState> {
  await guard();

  const id = String(formData.get("id") ?? "");
  const ref = String(formData.get("ref") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const active = formData.get("active") === "on";

  if (!id) return { error: "Offre introuvable." };
  if (!title || !body) {
    return { error: "Le titre et la description sont obligatoires." };
  }

  await prisma.jobOffer.update({
    where: { id },
    data: { ref: ref || title, title, body, active },
  });

  revalidatePath("/admin/offres-emploi");
  revalidatePath("/recrutement");
  redirect("/admin/offres-emploi");
}

export async function toggleOffer(formData: FormData) {
  await guard();

  const id = String(formData.get("id") ?? "");
  const offer = await prisma.jobOffer.findUnique({ where: { id } });
  if (!offer) return;

  await prisma.jobOffer.update({
    where: { id },
    data: { active: !offer.active },
  });

  revalidatePath("/admin/offres-emploi");
  revalidatePath("/recrutement");
}

export async function deleteOffer(formData: FormData) {
  await guard();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  // Les candidatures ne sont pas supprimées : leur jobOfferId passe à null.
  await prisma.jobOffer.delete({ where: { id } });

  revalidatePath("/admin/offres-emploi");
  revalidatePath("/recrutement");
}