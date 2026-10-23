import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // L'administration, les API et les fichiers statiques ne sont pas traduits.
  matcher: ["/((?!admin|api|_next|_vercel|.*\\..*).*)"],
};