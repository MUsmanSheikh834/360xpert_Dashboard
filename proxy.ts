import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const LOCALES = routing.locales.join("|"); // "en|ur|ar" — auto-synced with routing config
const LOCALE_RE = `(${LOCALES})`;

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPath(pathname);

  const authToken = request.cookies.get("auth_token");
  const userLoggedIn = request.cookies.get("user_logged_in");
  const isAuthenticated = authToken || userLoggedIn;

  const publicRoutes = [new RegExp(`^/${LOCALE_RE}/(login|signup|forgot|otp|reset)$`)];

  const isPublicRoute = publicRoutes.some((route) => route.test(pathname));

  // Root redirect
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${routing.defaultLocale}/${isAuthenticated ? "" : "login"}`, request.url)
    );
  }

  // Home page protection
  if (
    new RegExp(`^/${LOCALE_RE}/?$`).test(pathname) ||
    new RegExp(`^/${LOCALE_RE}/home$`).test(pathname)
  ) {
    // if (!isAuthenticated) {
    //   return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    // }
  }

  // OTP page protection
  // if (new RegExp(`^/${LOCALE_RE}/otp$`).test(pathname)) {
  //   const authFlowData = request.cookies.get("auth_flow");
  //   let authFlow = null;
  //   try {
  //     authFlow = authFlowData ? JSON.parse(authFlowData.value) : null;
  //   } catch {
  //     authFlow = null;
  //   }
  //   if (!authFlow || authFlow.step !== "awaiting-otp") {
  //     return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  //   }
  // }

  // Reset page protection
  // if (new RegExp(`^/${LOCALE_RE}/reset$`).test(pathname)) {
  //   const authFlowData = request.cookies.get("auth_flow");
  //   let authFlow = null;
  //   try {
  //     authFlow = authFlowData ? JSON.parse(authFlowData.value) : null;
  //   } catch {
  //     authFlow = null;
  //   }
  //   if (!authFlow || authFlow.step !== "reset-password" || !authFlow.resetToken) {
  //     return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  //   }
  // }

  // Protected routes
  // if (!isPublicRoute && !isAuthenticated) {
  //   const protectedRoutes = new RegExp(
  //     `^/${LOCALE_RE}/(dashboard|profile|settings|analytics|users)(/|$)`
  //   );
  //   if (protectedRoutes.test(pathname)) {
  //     return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  //   }
  // }

  // Redirect authenticated users away from auth pages
  // if (isAuthenticated && new RegExp(`^/${LOCALE_RE}/(login|signup|forgot)$`).test(pathname)) {
  //   return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  // }

  return intlMiddleware(request);
}

function getLocaleFromPath(pathname: string): string {
  const locales = routing.locales.join("|");
  const match = pathname.match(new RegExp(`^/(${locales})`));
  return match?.[1] || routing.defaultLocale;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|trpc|.*\\..*).*)"],
};
