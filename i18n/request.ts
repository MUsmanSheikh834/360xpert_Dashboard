import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import enMessages from "./messages/en/index";
import urMessages from "./messages/ur/index";
import arMessages from "./messages/ar/index";
import { logger } from "@/logger/logger";

const messagesMap = {
  en: enMessages,
  ur: urMessages,
  ar: arMessages,
} as const;

type LocaleKey = keyof typeof messagesMap;

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedLocale = await requestLocale;
  const fallbackLocale = routing.defaultLocale;

  const locale = routing.locales.includes(resolvedLocale as any)
    ? (resolvedLocale as LocaleKey)
    : fallbackLocale;

  const messages = messagesMap[locale] ?? messagesMap[fallbackLocale as LocaleKey];

  if (!messages) {
    logger.error({ locale }, "Missing messages for locale. Falling back to empty dictionary.");
  }

  return {
    locale,
    messages: messages ?? {},
  };
});
