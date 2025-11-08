"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";
import { useAppSelector } from "@/redux/store";
import { logger } from "@/logger/logger";
import { UserModuleUser } from "@/app/[locale]/users/types/user";

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: UserModuleUser | null;
  isLoading: boolean;
  refreshAuth: () => void;
}

// Cookie keys for type safety
const COOKIE_KEYS = {
  USER_LOGGED_IN: "user_logged_in",
  AUTH_TOKEN: "auth_token",
  USER_EMAIL: "user_email",
  USER_ID: "user_id",
  USER_NAME: "user_name",
  USER_AVATAR: "user_avatar",
  // user role removed from cookies; no server-side role cookie expected
} as const;

/**
 * Optimized custom auth hook that combines Redux state and cookie-based authentication
 * Ensures consistent authentication state across the application with proper error handling
 */
export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [cookieUser, setCookieUser] = useState<Partial<UserModuleUser> | null>(null);

  // Get Redux auth state with memoization
  const { reduxUser, reduxToken } = useAppSelector(
    (state) => ({
      reduxUser: state.auth.user,
      reduxToken: state.auth.token,
    }),
    (left, right) => left.reduxUser === right.reduxUser && left.reduxToken === right.reduxToken
  );

  // Optimized auth state checker with error handling
  const checkAuthState = useCallback(() => {
    try {
      const userLoggedIn = Cookies.get(COOKIE_KEYS.USER_LOGGED_IN);
      const authToken = Cookies.get(COOKIE_KEYS.AUTH_TOKEN);
      const userEmail = Cookies.get(COOKIE_KEYS.USER_EMAIL);
      const userId = Cookies.get(COOKIE_KEYS.USER_ID);

      if (userLoggedIn && authToken && userEmail && userId) {
        const userData: Partial<UserModuleUser> = {
          _id: userId,
          email: userEmail,
          name: Cookies.get(COOKIE_KEYS.USER_NAME) || undefined,
          avatar: Cookies.get(COOKIE_KEYS.USER_AVATAR) || undefined,
        };
        setCookieUser(userData);
        // Client-side logging only
        if (typeof window !== "undefined" && typeof process === "undefined") {
          logger.debug({ userId, email: userEmail }, "Cookie-based auth state updated");
        }
      } else {
        setCookieUser(null);
      }
    } catch (error) {
      // Client-side logging only
      if (typeof window !== "undefined" && typeof process === "undefined") {
        logger.error(
          { error: error instanceof Error ? error.message : String(error) },
          "Error checking auth state"
        );
      }
      setCookieUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Manual refresh function for components that need to trigger auth refresh
  const refreshAuth = useCallback(() => {
    checkAuthState();
  }, [checkAuthState]);

  // Initialize auth state and set up monitoring
  useEffect(() => {
    checkAuthState();

    // Optimized interval - only check if document is visible
    const interval = setInterval(() => {
      if (!document.hidden) {
        checkAuthState();
      }
    }, 2000); // Reduced frequency to 2 seconds for better performance

    // Listen for visibility changes to immediately check when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAuthState();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkAuthState]);

  // Memoized computed values for optimal performance
  const authState = useMemo(() => {
    const isAuthenticated = Boolean(cookieUser?.email) || Boolean(reduxToken && reduxUser);
    // prefer reduxUser (full object) otherwise use cookieUser cast as UserModuleUser
    const user = (reduxUser as UserModuleUser) || (cookieUser as UserModuleUser | null);

    return {
      isAuthenticated,
      user,
      isLoading,
      refreshAuth,
    };
  }, [cookieUser, reduxToken, reduxUser, isLoading, refreshAuth]);

  return authState;
}
