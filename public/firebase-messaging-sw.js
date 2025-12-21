/* eslint-disable no-undef */
// Service workers CANNOT use ES modules - must use importScripts with compat versions
importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js");

// Use SAME config as client
const firebaseConfig = {
  apiKey: "AIzaSyB6v4N-Fr7r606M78SgLFpqrmfYKupenx8",
  authDomain: "next-boiler-7ea7c.firebaseapp.com",
  projectId: "next-boiler-7ea7c",
  storageBucket: "next-boiler-7ea7c.firebasestorage.app",
  messagingSenderId: "962836123176",
  appId: "1:962836123176:web:c6d20fb50c2ad45b22af1d",
  measurementId: "G-4SJ2LZCZR1",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("🔔 BACKGROUND MESSAGE:", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: payload.notification?.icon || "/placeholder-logo.png",
    image: payload.notification?.image,
    badge: "/placeholder-logo.png",
    data: payload.data || {},
    tag: payload.fcmMessageId || "default-tag",
    requireInteraction: false,
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Check if app is already open
      for (const client of clientList) {
        if (client.url.includes(url) && "focus" in client) {
          return client.focus();
        }
      }
      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

console.log("[firebase-messaging-sw.js] ✅ Service worker ready");
