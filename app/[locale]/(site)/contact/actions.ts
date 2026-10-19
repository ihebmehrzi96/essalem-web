"use server";

import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

export type ContactState = { error?: string; success?: boolean };

export async function sendMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  const name = get("name");
  const email = get("email");
  const subject = get("subject");
  const message = get("message");

  if (!name || !email || !message) {
    return { error: "Nom, e-mail et message sont obligatoires." };
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "Adresse e-mail invalide." };
  }

  // Piège à robots : champ invisible qu'un humain ne remplit jamais.
  if (get("website")) return { success: true };

  // Le message est d'abord enregistré : même si l'envoi échoue, rien n'est perdu.
  await prisma.contactMessage.create({
    data: { name, email, subject: subject || null, message },
  });

  // Notification par e-mail, sans bloquer la réponse à l'utilisateur.
  try {
    const key = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL;

    if (key && to) {
      await new Resend(key).emails.send({
        from: "Site web <onboarding@resend.dev>",
        to,
        replyTo: email,
        subject: subject
          ? `Site web — ${subject}`
          : `Site web — message de ${name}`,
        text: [
          `Nom : ${name}`,
          `E-mail : ${email}`,
          subject ? `Sujet : ${subject}` : null,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    }
  } catch (e) {
    // L'échec d'envoi ne doit pas faire échouer le formulaire.
    console.error("Resend:", e);
  }

  return { success: true };
}