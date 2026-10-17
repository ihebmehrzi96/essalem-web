"use client";

import { deleteOffer } from "./actions";

export default function DeleteOfferButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <form
      action={deleteOffer}
      onSubmit={(e) => {
        if (
          !confirm(
            `Supprimer l'offre « ${title} » ? Les candidatures reçues sont conservées.`
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="w-full rounded border border-red-500 px-5 py-2.5 text-[0.9rem] font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        Supprimer
      </button>
    </form>
  );
}