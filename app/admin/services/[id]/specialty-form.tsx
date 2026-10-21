"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  createSpecialty,
  updateSpecialty,
  type ServiceState,
} from "../actions";
import LocaleTabs from "@/components/locale-tabs";
import ImageField from "@/components/image-field";

const initial: ServiceState = {};
const FIELD =
  "h-13 w-full rounded-xl border border-line px-4 outline-none transition-colors focus:border-ink";

type Translations = Record<"fr" | "ar" | "en", { title: string; body: string }>;

const EMPTY: Translations = {
  fr: { title: "", body: "" },
  ar: { title: "", body: "" },
  en: { title: "", body: "" },
};

type Props = {
  mode: "create" | "edit";
  categoryId: string;
  categoryTitle: string;
  /** Si défini, la spécialité est rattachée à une spécialité parente. */
  parentId?: string;
  parentTitle?: string;
  specialty?: {
    id: string;
    slug: string;
    image: string | null;
    published: boolean;
    translations: Translations;
  };
};

export default function SpecialtyForm({
  mode,
  categoryId,
  categoryTitle,
  parentId,
  parentTitle,
  specialty,
}: Props) {
  const action = mode === "create" ? createSpecialty : updateSpecialty;
  const [state, formAction, pending] = useActionState(action, initial);
  const [imageOk, setImageOk] = useState(true);

  const t = specialty?.translations ?? EMPTY;
  const backHref = parentId
    ? `/admin/services/${categoryId}/${parentId}`
    : `/admin/services/${categoryId}`;

  return (
    <main className="mx-auto max-w-[860px] p-6 sm:p-10">
      <Link
        href={backHref}
        className="text-[0.9rem] text-stone transition-colors hover:text-ink"
      >
        ← {parentTitle ?? categoryTitle}
      </Link>

      <h1 className="mt-2 mb-8 text-3xl">
        {mode === "create"
          ? parentId
            ? "Ajouter une sous-spécialité"
            : "Ajouter une spécialité"
          : "Modifier la spécialité"}
      </h1>

      <form
        action={formAction}
        className="flex flex-col gap-7 rounded-2xl bg-paper p-6 sm:p-8"
      >
        <input type="hidden" name="categoryId" value={categoryId} />
        {parentId && <input type="hidden" name="parentId" value={parentId} />}
        {specialty && <input type="hidden" name="id" value={specialty.id} />}

        {/* Slug */}
        <div className="flex flex-col gap-2">
          <label htmlFor="slug" className="text-[0.88rem] font-medium">
            Adresse (slug)
          </label>
          {mode === "create" ? (
            <>
              <input
                id="slug"
                name="slug"
                required
                maxLength={100}
                pattern="[a-z0-9\-]+"
                placeholder="chirurgie-du-visage"
                className={FIELD}
              />
              <span className="text-[0.82rem] text-stone">
                Lettres minuscules, chiffres et tirets uniquement. Non
                modifiable par la suite.
              </span>
            </>
          ) : (
            <p className="text-[0.95rem]">
              <code>/services/…/{specialty?.slug}</code>
            </p>
          )}
        </div>

        {/* Traductions */}
        <LocaleTabs
          render={(locale) => (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={`title_${locale}`}
                  className="text-[0.88rem] font-medium"
                >
                  Titre {locale === "fr" && "*"}
                </label>
                <input
                  id={`title_${locale}`}
                  name={`title_${locale}`}
                  defaultValue={t[locale].title}
                  maxLength={160}
                  className={FIELD}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor={`body_${locale}`}
                  className="text-[0.88rem] font-medium"
                >
                  Description
                </label>
                <textarea
                  id={`body_${locale}`}
                  name={`body_${locale}`}
                  defaultValue={t[locale].body}
                  rows={12}
                  className="rounded-xl border border-line p-4 outline-none transition-colors focus:border-ink"
                />
              </div>
            </div>
          )}
        />

        <ImageField
          current={specialty?.image ?? null}
          onValidityChange={setImageOk}
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="published"
            defaultChecked={specialty?.published ?? true}
            className="h-5 w-5 rounded border-line"
          />
          <span className="text-[0.95rem]">Visible sur le site</span>
        </label>

        {state.error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 px-4 py-3 text-[0.9rem] text-red-700"
          >
            {state.error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={pending || !imageOk}
            className="inline-flex min-h-12 items-center rounded-full bg-ink px-7 font-medium text-paper transition-colors hover:bg-leaf-deep disabled:opacity-50"
          >
            {pending
              ? "Enregistrement…"
              : mode === "create"
                ? "Valider"
                : "Enregistrer"}
          </button>
          <Link
            href={backHref}
            className="inline-flex min-h-12 items-center rounded-full border border-line px-6 font-medium transition-colors hover:border-ink"
          >
            Annuler
          </Link>
        </div>
      </form>
    </main>
  );
}