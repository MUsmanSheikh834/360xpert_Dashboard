import Cookies from "js-cookie";
import { UserModuleUser } from "@/app/[locale]/users/types/user";

const TOKEN_KEY = "auth_token";

export const getToken = (): string | undefined => {
  if (typeof window === "undefined") return undefined;
  return Cookies.get(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }); // 7 days
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY);
};

const AUTH_COOKIES = {
  userId: "user_id",
  userName: "user_name",
  userEmail: "user_email",
  userAvatar: "user_avatar",
  authToken: "auth_token",
} as const;

export type AuthCookies = typeof AUTH_COOKIES;

// Read a minimal Partial<UserModuleUser> from cookies for client-side fallback
export const getUserFromCookies = (): Partial<UserModuleUser> | null => {
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

export const removeAuthCookies = (): void => {
  Object.values(AUTH_COOKIES).forEach((cookieName) => {
    Cookies.remove(cookieName, { path: "/" });
  });
};
