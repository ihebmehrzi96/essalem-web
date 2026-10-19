"use client";

import { deleteMessage } from "./actions";

export default function DeleteMessageButton({ id }: { id: string }) {
  return (
    <form
      action={deleteMessage}
      onSubmit={(e) => {
        if (!confirm("Supprimer ce message ? Cette action est définitive.")) {
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