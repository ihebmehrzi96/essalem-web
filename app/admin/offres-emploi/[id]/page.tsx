import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getOfferById } from "@/lib/jobs";
import EditOfferForm from "./edit-form";

export const instant = false;

export default async function EditOfferPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const offer = await getOfferById(id);
  if (!offer) notFound();

  return (
    <EditOfferForm
      offer={{
        id: offer.id,
        ref: offer.ref,
        title: offer.title,
        body: offer.body,
        active: offer.active,
      }}
    />
  );
}