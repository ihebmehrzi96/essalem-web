"use client";

import Image from "next/image";
import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initial: LoginState = {};

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, initial);

  return (
    <main className="flex min-h-screen items-center justify-center bg-mist px-5">
      <div className="w-full max-w-md rounded-3xl bg-paper p-8 shadow-xl shadow-ink/5 sm:p-10">

        <Image
          src="/logo-essalem.png"
          alt="Clinique Essalem"
          width={675}
          height={372}
          className="mb-8 h-12 w-auto"
        />

        <h1 className="text-3xl">Espace administration</h1>
        <p className="mt-2 text-[0.95rem] text-stone">
          Connectez-vous pour gérer le contenu du site.
        </p>

        <form action={action} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[0.9rem] font-medium">
              Adresse e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="h-13 rounded-xl border border-line px-4 outline-none transition-colors focus:border-ink"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[0.9rem] font-medium">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="h-13 rounded-xl border border-line px-4 outline-none transition-colors focus:border-ink"
            />
          </div>

          {state.error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-[0.9rem] text-red-700"
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 h-13 rounded-full bg-ink font-medium text-paper transition-colors hover:bg-leaf-deep disabled:opacity-50"
          >
            {pending ? "Connexion…" : "Se connecter"}
          </button>
        </form>

      </div>
    </main>
  );
}