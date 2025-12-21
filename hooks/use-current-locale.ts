import { usePathname } from "next/navigation";

/**
 * Custom hook to extract the current locale from the pathname.
 * Supports en, ur, and ar locales with fallback to "en".
 *
 * @returns The current locale string ("en" | "ur" | "ar")
 *
 * @example
 * const locale = useCurrentLocale();
 * // For pathname "/en/login" returns "en"
 * // For pathname "/ur/signup" returns "ur"
 * // For pathname "/invalid" returns "en"
 */
export const useCurrentLocale = (): string => {
  const pathname = usePathname() || "";
  return pathname.match(/^\/(en|ur|ar)/)?.[1] || "en";
};
