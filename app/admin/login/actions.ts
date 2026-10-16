"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Veuillez remplir tous les champs." };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Message volontairement identique dans les deux cas : ne pas révéler
  // si l'adresse existe ou non.
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return { error: "Identifiants incorrects." };
  }

  await createSession({ userId: user.id, name: user.name });
  redirect("/admin");
}