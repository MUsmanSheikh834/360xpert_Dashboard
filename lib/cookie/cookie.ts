import Cookies from "js-cookie";

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

export interface User {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
  role?: string;
}

const AUTH_COOKIES = {
  userId: "user_id",
  userName: "user_name",
  userEmail: "user_email",
  userAvatar: "user_avatar",
  userRole: "user_role",
  authToken: "auth_token",
} as const;

export type AuthCookies = typeof AUTH_COOKIES;

export const getUserFromCookies = (): Partial<User> | null => {
  const { userEmail, userId, userName, userAvatar, userRole } = AUTH_COOKIES;
  const email = Cookies.get(userEmail);
  if (!email) return null;

  return {
    id: Cookies.get(userId) || "",
    name: Cookies.get(userName) || "",
    email,
    avatar: Cookies.get(userAvatar) || "",
    role: Cookies.get(userRole) || "",
  };
};

export const removeAuthCookies = (): void => {
  Object.values(AUTH_COOKIES).forEach((cookieName) => {
    Cookies.remove(cookieName, { path: "/" });
  });
};
