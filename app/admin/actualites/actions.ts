"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { saveImage } from "@/lib/upload";

export type PostState = { error?: string };

export async function createPost(
  _prev: PostState,
  formData: FormData
): Promise<PostState> {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const kind = String(formData.get("kind") ?? "Actualité");
  const published = formData.get("published") === "on";

  if (!title || !body) {
    return { error: "Le titre et le contenu sont obligatoires." };
  }

  let image: string | null = null;
  try {
    image = await saveImage(formData.get("image") as File | null);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image invalide." };
  }

  const base = slugify(title);
  let slug = base;
  let n = 2;
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${base}-${n++}`;
  }

  await prisma.post.create({
    data: {
      title,
      body,
      kind,
      slug,
      published,
      image,
      excerpt: body.slice(0, 180),
    },
  });

  revalidatePath("/admin/actualites");
  revalidatePath("/");
  redirect("/admin/actualites");
}

export async function updatePost(
  _prev: PostState,
  formData: FormData
): Promise<PostState> {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const kind = String(formData.get("kind") ?? "Actualité");
  const published = formData.get("published") === "on";

  if (!id) return { error: "Actualité introuvable." };
  if (!title || !body) {
    return { error: "Le titre et le contenu sont obligatoires." };
  }

  // Nouvelle image seulement si l'utilisateur en a joint une.
  let image: string | undefined;
  try {
    const saved = await saveImage(formData.get("image") as File | null);
    if (saved) image = saved;
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Image invalide." };
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      body,
      kind,
      published,
      excerpt: body.slice(0, 180),
      ...(image ? { image } : {}),
    },
  });

  revalidatePath("/admin/actualites");
  revalidatePath("/");
  redirect("/admin/actualites");
}

export async function deletePost(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.post.delete({ where: { id } });

  revalidatePath("/admin/actualites");
  revalidatePath("/");
}

export async function togglePublished(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return;

  await prisma.post.update({
    where: { id },
    data: { published: !post.published },
  });

  revalidatePath("/admin/actualites");
  revalidatePath("/");
}