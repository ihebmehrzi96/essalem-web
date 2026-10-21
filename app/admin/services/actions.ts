"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { saveImage } from "@/lib/upload";

export type ServiceState = { error?: string };

const LOCALES = ["fr", "ar", "en"] as const;

async function guard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

export async function updateCategory(
  _prev: ServiceState,
  formData: FormData
): Promise<ServiceState> {
  await guard();

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Pôle introuvable." };

  let image: string | undefined;
  try {
    const saved = await saveImage(formData.get("image") as File | null);
    if (saved) image = saved;
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image invalide." };
  }

  await prisma.serviceCategory.update({
    where: { id },
    data: {
      published: formData.get("published") === "on",
      ...(image ? { image } : {}),
    },
  });

  for (const locale of LOCALES) {
    const title = String(formData.get(`title_${locale}`) ?? "").trim();
    const intro = String(formData.get(`intro_${locale}`) ?? "").trim();
    if (!title) continue;

    await prisma.serviceCategoryTranslation.upsert({
      where: { categoryId_locale: { categoryId: id, locale } },
      update: { title, intro: intro || null },
      create: { categoryId: id, locale, title, intro: intro || null },
    });
  }

  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
  redirect("/admin/services");
}

export async function createSpecialty(
  _prev: ServiceState,
  formData: FormData
): Promise<ServiceState> {
  await guard();

  const categoryId = String(formData.get("categoryId") ?? "");
  const parentId = String(formData.get("parentId") ?? "") || null;
  const slug = String(formData.get("slug") ?? "").trim();
  const titleFr = String(formData.get("title_fr") ?? "").trim();

  if (!categoryId || !slug || !titleFr) {
    return { error: "Le slug et le titre français sont obligatoires." };
  }

  const exists = await prisma.specialty.findUnique({
    where: { categoryId_slug: { categoryId, slug } },
  });
  if (exists) return { error: "Ce slug existe déjà dans ce pôle." };

  let image: string | null = null;
  try {
    image = await saveImage(formData.get("image") as File | null);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image invalide." };
  }

  // L'ordre est calculé au sein de la fratrie, pas du pôle entier.
  const count = await prisma.specialty.count({ where: { categoryId, parentId } });

  const specialty = await prisma.specialty.create({
    data: {
      categoryId,
      parentId,
      slug,
      image,
      order: count + 1,
      published: formData.get("published") === "on",
    },
  });

  for (const locale of LOCALES) {
    const title = String(formData.get(`title_${locale}`) ?? "").trim();
    const body = String(formData.get(`body_${locale}`) ?? "").trim();
    if (!title) continue;

    await prisma.specialtyTranslation.create({
      data: { specialtyId: specialty.id, locale, title, body: body || null },
    });
  }

  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
  redirect(
    parentId
      ? `/admin/services/${categoryId}/${parentId}`
      : `/admin/services/${categoryId}`
  );
}

export async function updateSpecialty(
  _prev: ServiceState,
  formData: FormData
): Promise<ServiceState> {
  await guard();

  const id = String(formData.get("id") ?? "");
  const categoryId = String(formData.get("categoryId") ?? "");
  const parentId = String(formData.get("parentId") ?? "") || null;
  if (!id) return { error: "Spécialité introuvable." };

  let image: string | undefined;
  try {
    const saved = await saveImage(formData.get("image") as File | null);
    if (saved) image = saved;
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image invalide." };
  }

  await prisma.specialty.update({
    where: { id },
    data: {
      published: formData.get("published") === "on",
      ...(image ? { image } : {}),
    },
  });

  for (const locale of LOCALES) {
    const title = String(formData.get(`title_${locale}`) ?? "").trim();
    const body = String(formData.get(`body_${locale}`) ?? "").trim();
    if (!title) continue;

    await prisma.specialtyTranslation.upsert({
      where: { specialtyId_locale: { specialtyId: id, locale } },
      update: { title, body: body || null },
      create: { specialtyId: id, locale, title, body: body || null },
    });
  }

  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
  redirect(
    parentId
      ? `/admin/services/${categoryId}/${parentId}`
      : `/admin/services/${categoryId}`
  );
}

export async function toggleSpecialty(formData: FormData) {
  await guard();

  const id = String(formData.get("id") ?? "");
  const item = await prisma.specialty.findUnique({ where: { id } });
  if (!item) return;

  await prisma.specialty.update({
    where: { id },
    data: { published: !item.published },
  });

  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
}

export async function deleteSpecialty(formData: FormData) {
  await guard();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  // Les sous-spécialités sont supprimées en cascade (onDelete: Cascade).
  await prisma.specialty.delete({ where: { id } });

  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
}