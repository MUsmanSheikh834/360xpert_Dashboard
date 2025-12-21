import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getMessaging, getToken, onMessage, type Messaging } from "firebase/messaging";
import { createLogger } from "@/logger/logger";

const log = createLogger("firebase");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
let messaging: Messaging | null = null;

/**
 * DEBUG: Check if service worker is accessible
 */
export const debugServiceWorker = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false;

  try {
    const response = await fetch("/firebase-messaging-sw.js");
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Wait for service worker to be ready with timeout
 */
const waitForServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!("serviceWorker" in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    return registration;
  } catch (error) {
    return null;
  }
};

export const getMessagingInstance = (): Messaging | null => {
  if (typeof window === "undefined") return null;

  if (
    !("serviceWorker" in navigator) ||
    !("Notification" in window) ||
    !("PushManager" in window)
  ) {
    log.warn("Push notifications not supported");
    return null;
  }

  return messaging;
};

/**
 * Request permission and get token (with enhanced debugging)
 */
export const requestNotificationPermission = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null;

  // Debug service worker file first
  const swExists = await debugServiceWorker();
  if (!swExists) {
    return null;
  }

  try {
    log.info("Requesting notification permission...");

    const permission = await Notification.requestPermission();
    log.info({ permission }, "Permission response");

    if (permission !== "granted") {
      log.warn("Permission denied");
      return null;
    }

    // Register service worker
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
      scope: "/",
    });

    // Wait for activation
    if (registration.installing || registration.waiting) {
      await new Promise<void>((resolve) => {
        const sw = registration.installing || registration.waiting;
        if (sw) {
          sw.addEventListener("statechange", () => {
            if (sw.state === "activated") resolve();
          });
        } else {
          resolve();
        }
      });
    }

    const messagingInstance = getMessagingInstance();
    if (!messagingInstance) return null;

    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
    if (!vapidKey) {
      log.error("VAPID key missing");
      return null;
    }

    const token = await getToken(messagingInstance, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });

    return token;
  } catch (error) {
    log.error({ error }, "Error requesting permission");
    return null;
  }
};

/**
 * Get current FCM token without requesting permission
 */
export const getCurrentFCMToken = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null;

  if (Notification.permission !== "granted") {
    log.debug("Permission not granted");
    return null;
  }

  try {
    const messagingInstance = getMessagingInstance();
    if (!messagingInstance) return null;

    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
    if (!vapidKey) {
      log.error("VAPID key not configured");
      return null;
    }

    // Wait for service worker to be ready
    await waitForServiceWorker();

    // Get existing registration
    const registration = await navigator.serviceWorker.getRegistration("/firebase-messaging-sw.js");
    if (!registration) {
      return null;
    }

    const token = await getToken(messagingInstance, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });

    return token;
  } catch (error) {
    log.error({ error }, "Error getting current token");
    return null;
  }
};

export const onForegroundMessage = (callback: (payload: any) => void) => {
  const messagingInstance = getMessagingInstance();
  if (!messagingInstance) return () => {};

  return onMessage(messagingInstance, callback);
};

export const isNotificationSupported = (): boolean => {
  if (typeof window === "undefined") return false;
  return "serviceWorker" in navigator && "Notification" in window && "PushManager" in window;
};

export const getNotificationPermission = (): NotificationPermission | null => {
  if (typeof window === "undefined") return null;
  if (!("Notification" in window)) return null;
  return Notification.permission;
};

export { app };
