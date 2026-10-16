"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { createPost, type PostState } from "../actions";
import ImageField from "@/components/image-field";

const initial: PostState = {};

export default function NewPostPage() {
  const [state, action, pending] = useActionState(createPost, initial);
  const [imageOk, setImageOk] = useState(true);

  return (
    <main className="mx-auto max-w-[800px] p-6 sm:p-10">

      <Link
        href="/admin/actualites"
        className="text-[0.9rem] text-stone transition-colors hover:text-ink"
      >
        ← Actualités
      </Link>

      <h1 className="mt-2 mb-8 text-3xl">Ajouter une actualité</h1>

      <form action={action} className="flex flex-col gap-6 rounded-2xl bg-paper p-6 sm:p-8">

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-[0.9rem] font-medium">
            Titre de l&apos;actualité
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={200}
            placeholder="Entrez le titre de l'actualité"
            className="h-13 rounded-xl border border-line px-4 outline-none transition-colors focus:border-ink"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="kind" className="text-[0.9rem] font-medium">
            Catégorie
          </label>
          <select
            id="kind"
            name="kind"
            defaultValue="Actualité"
            className="h-13 rounded-xl border border-line px-4 outline-none transition-colors focus:border-ink"
          >
            <option>Actualité</option>
            <option>Appel d&apos;offres</option>
            <option>Événement</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="body" className="text-[0.9rem] font-medium">
            Contenu de l&apos;actualité
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={12}
            placeholder="Entrez le contenu de l'actualité"
            className="rounded-xl border border-line p-4 outline-none transition-colors focus:border-ink"
          />
        </div>

        <ImageField onValidityChange={setImageOk} />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="published"
            className="h-5 w-5 rounded border-line"
          />
          <span className="text-[0.95rem]">
            Publier immédiatement sur le site
          </span>
        </label>

        {state.error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[0.9rem] text-red-700">
            {state.error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={pending || !imageOk}
            className="inline-flex min-h-12 items-center rounded-full bg-ink px-7 font-medium text-paper transition-colors hover:bg-leaf-deep disabled:opacity-50"
          >
            {pending ? "Enregistrement…" : "Valider"}
          </button>
          <Link
            href="/admin/actualites"
            className="inline-flex min-h-12 items-center rounded-full border border-line px-6 font-medium transition-colors hover:border-ink"
          >
            Annuler
          </Link>
        </div>

      </form>
    </main>
  );
}