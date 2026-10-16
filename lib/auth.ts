import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE = "essalem_session";
const MAX_AGE = 60 * 60 * 8; // 8 heures

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("AUTH_SECRET manquant dans .env");
  return new TextEncoder().encode(value);
}

export type Session = { userId: string; name: string };

/** Crée le cookie de session après une connexion réussie. */
export async function createSession(session: Session) {
  const token = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,                                 // inaccessible au JavaScript du navigateur
    secure: process.env.NODE_ENV === "production",  // HTTPS uniquement en production
    sameSite: "lax",                                // protège contre le CSRF
    path: "/",
    maxAge: MAX_AGE,
  });
}

/** Lit la session courante, ou null si absente ou invalide. */
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret());
    return { userId: payload.userId as string, name: payload.name as string };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}