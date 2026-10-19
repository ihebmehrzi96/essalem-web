"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function guard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

export async function toggleHandledMessage(formData: FormData) {
  await guard();

  const id = String(formData.get("id") ?? "");
  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) return;

  await prisma.contactMessage.update({
    where: { id },
    data: { handled: !message.handled },
  });

  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  await guard();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}