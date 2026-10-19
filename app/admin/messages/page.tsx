import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { listMessages } from "@/lib/messages";
import AdminHeader from "@/components/admin-header";
import { toggleHandledMessage } from "./actions";
import DeleteMessageButton from "./delete-button";

export const instant = false;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function MessagesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const messages = await listMessages();
  const pending = messages.filter((m) => !m.handled).length;

  return (
    <>
      <AdminHeader name={session.name} />

      <div className="mx-auto max-w-[1400px] px-5 py-8">
        <div className="rounded border border-line bg-paper p-6 sm:p-10">

          <Link
            href="/admin"
            className="text-[0.9rem] text-stone transition-colors hover:text-ink"
          >
            ← Tableau de bord
          </Link>

          <h1 className="mt-2 text-[2.3rem] font-bold tracking-tight">
            Messages reçus
          </h1>

          <p className="mt-2 text-stone">
            {messages.length} message{messages.length > 1 ? "s" : ""}
            {pending > 0 && ` · ${pending} à traiter`}
          </p>

          {messages.length === 0 ? (
            <p className="mt-10 text-stone">Aucun message pour le moment.</p>
          ) : (
            <ul className="mt-8 flex flex-col gap-4">
              {messages.map((message) => (
                <li
                  key={message.id}
                  className={`rounded border p-6 ${
                    message.handled
                      ? "border-line bg-[#fafafa]"
                      : "border-amber-300 bg-amber-50/40"
                  }`}
                >
                  {/* En-tête du message */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="text-[1.05rem] font-semibold">
                        {message.name}
                      </span>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-[0.88rem]">
                        <a
                          href={`mailto:${message.email}`}
                          className="text-sky-600 hover:underline"
                        >
                          {message.email}
                        </a>
                        <span className="text-stone">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                    </div>

                    <form action={toggleHandledMessage}>
                      <input type="hidden" name="id" value={message.id} />
                      <button
                        type="submit"
                        title={
                          message.handled
                            ? "Marquer comme à traiter"
                            : "Marquer comme traité"
                        }
                        className={`inline-flex items-center gap-2 rounded px-3 py-2 text-[0.85rem] font-semibold transition-opacity hover:opacity-70 ${
                          message.handled
                            ? "bg-leaf/15 text-leaf-deep"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            message.handled ? "bg-leaf" : "bg-amber-500"
                          }`}
                          aria-hidden="true"
                        />
                        {message.handled ? "Traité" : "À traiter"}
                      </button>
                    </form>
                  </div>

                  {message.subject && (
                    <p className="mt-4 font-medium">{message.subject}</p>
                  )}

                  <p className="mt-3 whitespace-pre-wrap text-[0.95rem] leading-[1.7] text-stone">
                    {message.message}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                    <a
                      href={`mailto:${message.email}?subject=${encodeURIComponent(
                        message.subject
                          ? `Re : ${message.subject}`
                          : "Votre message — Clinique Essalem"
                      )}`}
                      className="rounded border border-sky-500 px-5 py-2.5 text-[0.9rem] font-semibold text-sky-600 transition-colors hover:bg-sky-50"
                    >
                      Répondre
                    </a>
                    <DeleteMessageButton id={message.id} />
                  </div>
                </li>
              ))}
            </ul>
          )}

        </div>
      </div>
    </>
  );
}