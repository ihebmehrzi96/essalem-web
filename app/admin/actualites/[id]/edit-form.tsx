"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { updatePost, type PostState } from "../actions";
import ImageField from "@/components/image-field";

const initial: PostState = {};

type Props = {
  post: {
    id: string;
    title: string;
    body: string;
    kind: string;
    image: string | null;
    published: boolean;
  };
};

export default function EditForm({ post }: Props) {
  const [state, action, pending] = useActionState(updatePost, initial);
  const [imageOk, setImageOk] = useState(true);

  return (
    <main className="mx-auto max-w-[800px] p-6 sm:p-10">

      <Link
        href="/admin/actualites"
        className="text-[0.9rem] text-stone transition-colors hover:text-ink"
      >
        ← Actualités
      </Link>

      <h1 className="mt-2 mb-8 text-3xl">Modifier l&apos;actualité</h1>

      <form action={action} className="flex flex-col gap-6 rounded-2xl bg-paper p-6 sm:p-8">
        <input type="hidden" name="id" value={post.id} />

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-[0.9rem] font-medium">
            Titre de l&apos;actualité
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={200}
            defaultValue={post.title}
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
            defaultValue={post.kind}
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
            defaultValue={post.body}
            className="rounded-xl border border-line p-4 outline-none transition-colors focus:border-ink"
          />
        </div>

        <ImageField current={post.image} onValidityChange={setImageOk} />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post.published}
            className="h-5 w-5 rounded border-line"
          />
          <span className="text-[0.95rem]">Publiée sur le site</span>
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
            {pending ? "Enregistrement…" : "Enregistrer"}
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