"use client";
import { type PropsWithChildren, useMemo, useState, Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store, persistor } from "@/redux/store";
import { ThemeProvider } from "@/providers/theme-provider";
import { LayoutProvider } from "@/contexts/layout-context";
import { GlobalLoadingProvider } from "@/contexts/global-loading-context";
import { FirebaseNotificationProvider } from "@/providers/firebase-notification-provider";
import Loader from "@/components/shared/loader";
import GlobalLoader from "@/components/shared/global-loader";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const fallback = useMemo(
    () => <Loader isLoading={true} text="Next Boilerplate" variant="default" size="md" />,
    []
  );

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={fallback} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
            <ThemeProvider themes={["light", "dark", "ocean"]}>
              <GlobalLoadingProvider>
                <LayoutProvider>
                  <FirebaseNotificationProvider autoRequest={false}>
                    <Suspense fallback={fallback}>
                      {children}
                      <GlobalLoader />
                      <Toaster />
                    </Suspense>
                  </FirebaseNotificationProvider>
                </LayoutProvider>
              </GlobalLoadingProvider>
            </ThemeProvider>
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
