import Cookies from "js-cookie";
import { UserModuleUser } from "@/app/[locale]/users/types/user";

const TOKEN_KEY = "auth_token";

// Determine if we're in production (HTTPS)
const isProduction = typeof window !== "undefined" && window.location.protocol === "https:";

// Secure cookie options for production
const SECURE_COOKIE_OPTIONS: Cookies.CookieAttributes = {
  expires: 7, // 7 days
  path: "/",
  secure: isProduction, // Only send over HTTPS in production
  sameSite: "strict", // Protect against CSRF attacks
};

// Options for auth token (more restrictive)
const TOKEN_COOKIE_OPTIONS: Cookies.CookieAttributes = {
  ...SECURE_COOKIE_OPTIONS,
  sameSite: "strict",
};

// Options for user info cookies (can be slightly less restrictive for SSR)
const USER_COOKIE_OPTIONS: Cookies.CookieAttributes = {
  ...SECURE_COOKIE_OPTIONS,
  sameSite: "lax", // Allow top-level navigations
};

export const getToken = (): string | undefined => {
  if (typeof window === "undefined") return undefined;
  return Cookies.get(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, TOKEN_COOKIE_OPTIONS);
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY, { path: "/" });
};

const AUTH_COOKIES = {
  userId: "user_id",
  userName: "user_name",
  userEmail: "user_email",
  userAvatar: "user_avatar",
  authToken: "auth_token",
} as const;

export type AuthCookies = typeof AUTH_COOKIES;

/**
 * Sets user information in cookies for client-side hydration and SSR.
 * This allows the app to display user info before Redux state is hydrated.
 */
export const setUserCookies = (user: Partial<UserModuleUser>): void => {
  if (user._id) {
    Cookies.set(AUTH_COOKIES.userId, user._id, USER_COOKIE_OPTIONS);
  }
  if (user.name) {
    Cookies.set(AUTH_COOKIES.userName, user.name, USER_COOKIE_OPTIONS);
  }
  if (user.email) {
    Cookies.set(AUTH_COOKIES.userEmail, user.email, USER_COOKIE_OPTIONS);
  }
  if (user.avatar) {
    Cookies.set(AUTH_COOKIES.userAvatar, user.avatar, USER_COOKIE_OPTIONS);
  }
};

/**
 * Reads a minimal Partial<UserModuleUser> from cookies for client-side fallback.
 * Useful for displaying user info before Redux hydration completes.
 */
export const getUserFromCookies = (): Partial<UserModuleUser> | null => {
  if (typeof window === "undefined") return null;

  const { userEmail, userId, userName, userAvatar } = AUTH_COOKIES;
  const email = Cookies.get(userEmail);
  if (!email) return null;

  const _id = Cookies.get(userId) || undefined;

  return {
    _id,
    name: Cookies.get(userName) || undefined,
    email,
    avatar: Cookies.get(userAvatar) || undefined,
  } as Partial<UserModuleUser>;
};

/**
 * Removes all authentication-related cookies.
 * Should be called on logout to ensure complete cleanup.
 */
export const removeAuthCookies = (): void => {
  Object.values(AUTH_COOKIES).forEach((cookieName) => {
    Cookies.remove(cookieName, { path: "/" });
  });
};

/**
 * Checks if the user has a valid authentication token cookie.
 * Useful for quick auth checks without Redux state.
 */
export const hasAuthToken = (): boolean => {
  return !!getToken();
};
