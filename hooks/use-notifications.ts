"use client";

import { useEffect, useState, useCallback } from "react";
import {
  requestNotificationPermission,
  getCurrentFCMToken,
  onForegroundMessage,
  isNotificationSupported,
  getNotificationPermission,
} from "@/lib/firebase/firebase";
import { createLogger } from "@/logger/logger";
import { toast } from "sonner";

const log = createLogger("use-notifications");

export type NotificationPermissionState = "default" | "granted" | "denied" | "unsupported";

export interface UseNotificationsReturn {
  fcmToken: string | null;
  permission: NotificationPermissionState;
  isSupported: boolean;
  isLoading: boolean;
  error: string | null;
  requestPermission: () => Promise<string | null>;
  refreshToken: () => Promise<string | null>;
}

export function useNotifications(): UseNotificationsReturn {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermissionState>("default");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSupported = isNotificationSupported();

  const checkPermission = useCallback(() => {
    if (!isSupported) {
      setPermission("unsupported");
      return;
    }
    const currentPermission = getNotificationPermission();
    setPermission((currentPermission || "default") as NotificationPermissionState);
  }, [isSupported]);

  const requestPermission = useCallback(async (): Promise<string | null> => {
    if (!isSupported) {
      setError("Notifications not supported");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = await requestNotificationPermission();
      if (token) {
        setFcmToken(token);
        setPermission("granted");
      } else {
        checkPermission();
      }
      return token;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed";
      setError(errorMessage);
      log.error({ error: err }, "Error requesting permission");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, checkPermission]);

  const refreshToken = useCallback(async (): Promise<string | null> => {
    if (!isSupported || permission !== "granted") return null;

    setIsLoading(true);
    setError(null);

    try {
      const token = await getCurrentFCMToken();
      setFcmToken(token);
      return token;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed";
      setError(errorMessage);
      log.error({ error: err }, "Error refreshing token");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, permission]);

  // Initialize token on mount
  useEffect(() => {
    checkPermission();

    if (isSupported && Notification.permission === "granted") {
      // Small delay to ensure SW is ready
      setTimeout(() => {
        getCurrentFCMToken().then((token) => {
          if (token) {
            setFcmToken(token);
            console.log("📋 Initial token:", token);
          }
        });
      }, 500);
    }
  }, [checkPermission, isSupported]);

  // Set up foreground listener
  useEffect(() => {
    if (!isSupported || permission !== "granted") return;

    console.log("👂 Setting up foreground listener...");

    const unsubscribe = onForegroundMessage((payload) => {
      console.log("🔔 FOREGROUND:", payload);

      toast.success(payload.notification?.title || "Notification", {
        description: payload.notification?.body,
        duration: 5000,
        icon: "🔔",
      });
    });

    return () => {
      console.log("🔕 Removing foreground listener");
      unsubscribe && unsubscribe();
    };
  }, [isSupported, permission]);

  return {
    fcmToken,
    permission,
    isSupported,
    isLoading,
    error,
    requestPermission,
    refreshToken,
  };
}
