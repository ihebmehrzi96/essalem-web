import { notFound } from "next/navigation";

/** Toute adresse inconnue sous une langue valide déclenche la page 404. */
export default function CatchAll() {
  notFound();
}