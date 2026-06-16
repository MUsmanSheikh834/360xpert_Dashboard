import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ur", "ar"] as const,
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/dashboard": "/dashboard",
    "/flightbooking": "/flightbooking",
    "/hotelbooking": "/hotelbooking",

    "/login": {
      en: "/login",
      ur: "/login",
      ar: "/login",
    },
    "/signup": {
      en: "/signup",
      ur: "/signup",
      ar: "/signup",
    },
    "/forgot": {
      en: "/forgot",
      ur: "/forgot",
      ar: "/forgot",
    },
    "/otp": {
      en: "/otp",
      ur: "/otp",
      ar: "/otp",
    },
    "/reset": {
      en: "/reset",
      ur: "/reset",
      ar: "/reset",
    },
    "/privacy": {
      en: "/privacy",
      ur: "/privacy",
      ar: "/privacy",
    },
    "/terms": {
      en: "/terms",
      ur: "/terms",
      ar: "/terms",
    },
    "/contact": {
      en: "/contact",
      ur: "/contact",
      ar: "/contact",
    },
    "/about": {
      en: "/about",
      ur: "/about",
      ar: "/about",
    },
    "/docs": {
      en: "/docs",
      ur: "/docs",
      ar: "/docs",
    },
    "/support": {
      en: "/support",
      ur: "/support",
      ar: "/support",
    },
    "/changelog": {
      en: "/changelog",
      ur: "/changelog",
      ar: "/changelog",
    },
  },
} as const);

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
