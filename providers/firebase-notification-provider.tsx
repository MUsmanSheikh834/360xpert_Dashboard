"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useNotifications, type UseNotificationsReturn } from "@/hooks/use-notifications";

const FirebaseNotificationContext = createContext<UseNotificationsReturn | null>(null);

export interface FirebaseNotificationProviderProps {
  children: ReactNode;
  autoRequest?: boolean;
}

export function FirebaseNotificationProvider({
  children,
  autoRequest = false,
}: FirebaseNotificationProviderProps) {
  const notifications = useNotifications();

  // Auto-request if enabled
  if (autoRequest && notifications.permission === "default" && !notifications.isLoading) {
    notifications.requestPermission();
  }

  return (
    <FirebaseNotificationContext.Provider value={notifications}>
      {children}
    </FirebaseNotificationContext.Provider>
  );
}

export function useFirebaseNotifications(): UseNotificationsReturn {
  const context = useContext(FirebaseNotificationContext);
  if (!context) {
    throw new Error("useFirebaseNotifications must be used within FirebaseNotificationProvider");
  }
  return context;
}
