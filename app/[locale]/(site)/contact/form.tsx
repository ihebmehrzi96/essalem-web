"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "./actions";

const initial: ContactState = {};
const FIELD =
  "h-13 w-full border border-line bg-paper px-4 outline-none transition-colors focus:border-ink";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);

  if (state.success) {
    return (
      <div className="bg-leaf/10 p-8">
        <h2 className="text-[1.3rem]">Message envoyé</h2>
        <p className="mt-3 leading-relaxed text-stone">
          Nous avons bien reçu votre message et nous nous engageons à vous
          répondre dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      {/* Piège à robots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[0.88rem] font-medium">
          Votre nom *
        </label>
        <input id="name" name="name" required maxLength={120} className={FIELD} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[0.88rem] font-medium">
          E-mail *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={FIELD}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-[0.88rem] font-medium">
          Sujet
        </label>
        <input id="subject" name="subject" maxLength={160} className={FIELD} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[0.88rem] font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          className="w-full border border-line bg-paper p-4 outline-none transition-colors focus:border-ink"
        />
      </div>

      {state.error && (
        <p role="alert" className="bg-red-50 px-4 py-3 text-[0.9rem] text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group mt-2 inline-flex min-h-13 w-fit items-center gap-3 rounded-full bg-ink px-8 font-medium text-paper transition-colors hover:bg-leaf-deep disabled:opacity-50"
      >
        {pending ? "Envoi en cours…" : "Envoyer message"}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-1 rtl:-scale-x-100" aria-hidden="true">
          <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}