"use client";

import { useEffect } from "react";
import { debugServiceWorker } from "@/lib/firebase/firebase";

export function DebugFirebase() {
  useEffect(() => {
    const runDiagnostics = async () => {
      console.log("===== FIREBASE DIAGNOSTICS =====");

      // Check service worker file
      const swOk = await debugServiceWorker();

      // Check browser support
      console.log("🔍 Service Worker supported:", "serviceWorker" in navigator);
      console.log("🔍 Notifications supported:", "Notification" in window);
      console.log("🔍 Push supported:", "PushManager" in window);

      // Check permission
      console.log("🔍 Notification permission:", Notification.permission);

      // Check SW registration
      const registration = await navigator.serviceWorker.getRegistration(
        "/firebase-messaging-sw.js"
      );
      console.log("🔍 SW Registered:", !!registration);
      if (registration) {
        console.log("🔍 SW Scope:", registration.scope);
        console.log("🔍 SW State:", registration.active?.state);
      }

      console.log("===== END DIAGNOSTICS =====");
    };

    runDiagnostics();
  }, []);

  return null;
}
