"use client";

import Image from "next/image";
import { useState } from "react";

const MAX_SIZE = 4 * 1024 * 1024; // doit correspondre à lib/upload.ts
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export default function ImageField({
  current,
  onValidityChange,
}: {
  current?: string | null;
  onValidityChange?: (valid: boolean) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function fail(message: string) {
    setError(message);
    setPreview(null);
    onValidityChange?.(false);
  }

  function check(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setError(null);
    setPreview(null);

    if (!file) {
      onValidityChange?.(true);
      return;
    }

    if (!ALLOWED.includes(file.type)) {
      fail("Format non accepté. Utilisez JPG, PNG ou WebP.");
      return;
    }

    if (file.size > MAX_SIZE) {
      const mb = (file.size / 1024 / 1024).toFixed(1);
      fail(`Image trop lourde (${mb} Mo). Maximum 4 Mo — choisissez une autre image.`);
      return;
    }

    setPreview(URL.createObjectURL(file));
    onValidityChange?.(true);
  }

  const shown = preview ?? current;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="image" className="text-[0.9rem] font-medium">
        Image de couverture
      </label>

      {shown && !error && (
        <div className="relative mb-2 h-40 w-full max-w-sm overflow-hidden rounded-xl bg-mist">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <Image src={shown} alt="" fill sizes="384px" className="object-cover" />
          )}
        </div>
      )}

      <input
        id="image"
        name="image"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={check}
        className={`rounded-xl border p-3 text-[0.9rem] file:mr-4 file:rounded-full file:border-0 file:bg-mist file:px-4 file:py-2 file:font-medium ${
          error ? "border-red-400" : "border-line"
        }`}
      />

      {error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[0.85rem] text-red-700">
          {error}
        </p>
      ) : (
        <span className="text-[0.82rem] text-stone">
          JPG, PNG ou WebP — 4 Mo maximum.
          {current && " Laissez vide pour conserver l'image actuelle."}
        </span>
      )}
    </div>
  );
}