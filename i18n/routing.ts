import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ur", "ar"] as const,
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/dashboard": "/dashboard",

    "/auth/login": {
      en: "/auth/login",
      ur: "/auth/login",
      ar: "/auth/login",
    },
    "/auth/signup": {
      en: "/auth/signup",
      ur: "/auth/signup",
      ar: "/auth/signup",
    },
    "/auth/forgot": {
      en: "/auth/forgot",
      ur: "/auth/forgot",
      ar: "/auth/forgot",
    },
    "/auth/otp": {
      en: "/auth/otp",
      ur: "/auth/otp",
      ar: "/auth/otp",
    },
    "/auth/reset": {
      en: "/auth/reset",
      ur: "/auth/reset",
      ar: "/auth/reset",
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
