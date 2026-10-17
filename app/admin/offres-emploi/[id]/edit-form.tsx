"use client";

import Link from "next/link";
import { useActionState } from "react";
import { updateOffer, type OfferState } from "../actions";

const initial: OfferState = {};

type Props = {
  offer: {
    id: string;
    ref: string;
    title: string;
    body: string;
    active: boolean;
  };
};

export default function EditOfferForm({ offer }: Props) {
  const [state, action, pending] = useActionState(updateOffer, initial);

  return (
    <main className="mx-auto max-w-[800px] p-6 sm:p-10">

      <Link
        href="/admin/offres-emploi"
        className="text-[0.9rem] text-stone transition-colors hover:text-ink"
      >
        ← Offres d&apos;emploi
      </Link>

      <h1 className="mt-2 mb-8 text-3xl">Modifier l&apos;offre d&apos;emploi</h1>

      <form action={action} className="flex flex-col gap-6 rounded-2xl bg-paper p-6 sm:p-8">
        <input type="hidden" name="id" value={offer.id} />

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-[0.9rem] font-medium">
            Titre du poste
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={200}
            defaultValue={offer.title}
            className="h-13 rounded-xl border border-line px-4 outline-none transition-colors focus:border-ink"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="ref" className="text-[0.9rem] font-medium">
            Référence
          </label>
          <input
            id="ref"
            name="ref"
            maxLength={100}
            defaultValue={offer.ref}
            className="h-13 rounded-xl border border-line px-4 outline-none transition-colors focus:border-ink"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="body" className="text-[0.9rem] font-medium">
            Description du poste
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={12}
            defaultValue={offer.body}
            className="rounded-xl border border-line p-4 outline-none transition-colors focus:border-ink"
          />
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="active"
            defaultChecked={offer.active}
            className="h-5 w-5 rounded border-line"
          />
          <span className="text-[0.95rem]">Offre active sur le site</span>
        </label>

        {state.error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[0.9rem] text-red-700">
            {state.error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-12 items-center rounded-full bg-ink px-7 font-medium text-paper transition-colors hover:bg-leaf-deep disabled:opacity-50"
          >
            {pending ? "Enregistrement…" : "Enregistrer"}
          </button>
          <Link
            href="/admin/offres-emploi"
            className="inline-flex min-h-12 items-center rounded-full border border-line px-6 font-medium transition-colors hover:border-ink"
          >
            Annuler
          </Link>
        </div>

      </form>
    </main>
  );
}