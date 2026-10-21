"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { updateCategory, type ServiceState } from "../../actions";
import LocaleTabs from "@/components/locale-tabs";
import ImageField from "@/components/image-field";

const initial: ServiceState = {};
const FIELD =
  "h-13 w-full rounded-xl border border-line px-4 outline-none transition-colors focus:border-ink";

type Props = {
  category: {
    id: string;
    slug: string;
    image: string | null;
    published: boolean;
    translations: Record<"fr" | "ar" | "en", { title: string; intro: string }>;
  };
};

export default function CategoryForm({ category }: Props) {
  const [state, action, pending] = useActionState(updateCategory, initial);
  const [imageOk, setImageOk] = useState(true);

  return (
    <main className="mx-auto max-w-[860px] p-6 sm:p-10">
      <Link
        href="/admin/services"
        className="text-[0.9rem] text-stone transition-colors hover:text-ink"
      >
        ← Nos services
      </Link>

      <h1 className="mt-2 mb-8 text-3xl">Modifier le pôle</h1>

      <form action={action} className="flex flex-col gap-7 rounded-2xl bg-paper p-6 sm:p-8">
        <input type="hidden" name="id" value={category.id} />

        <p className="text-[0.9rem] text-stone">
          Adresse : <code className="text-ink">/services/{category.slug}</code>
        </p>

        <LocaleTabs
          render={(locale) => (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor={`title_${locale}`} className="text-[0.88rem] font-medium">
                  Titre
                </label>
                <input
                  id={`title_${locale}`}
                  name={`title_${locale}`}
                  defaultValue={category.translations[locale].title}
                  maxLength={160}
                  className={FIELD}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor={`intro_${locale}`} className="text-[0.88rem] font-medium">
                  Introduction
                </label>
                <textarea
                  id={`intro_${locale}`}
                  name={`intro_${locale}`}
                  defaultValue={category.translations[locale].intro}
                  rows={4}
                  className="rounded-xl border border-line p-4 outline-none transition-colors focus:border-ink"
                />
              </div>
            </div>
          )}
        />

        <ImageField current={category.image} onValidityChange={setImageOk} />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="published"
            defaultChecked={category.published}
            className="h-5 w-5 rounded border-line"
          />
          <span className="text-[0.95rem]">Visible sur le site</span>
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
            href="/admin/services"
            className="inline-flex min-h-12 items-center rounded-full border border-line px-6 font-medium transition-colors hover:border-ink"
          >
            Annuler
          </Link>
        </div>
      </form>
    </main>
  );
}