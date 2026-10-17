"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function guard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

export async function toggleHandled(formData: FormData) {
  await guard();

  const id = String(formData.get("id") ?? "");
  const application = await prisma.application.findUnique({ where: { id } });
  if (!application) return;

  await prisma.application.update({
    where: { id },
    data: { handled: !application.handled },
  });

  revalidatePath("/admin/candidatures");
}

export async function deleteApplication(formData: FormData) {
  await guard();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  // Les fichiers restent sur le disque : un nettoyage séparé les supprimera.
  await prisma.application.delete({ where: { id } });

  revalidatePath("/admin/candidatures");
  redirect("/admin/candidatures");
}