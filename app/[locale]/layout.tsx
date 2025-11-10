import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { urduFont } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Providers from "@/providers/providers";
import Loader from "@/components/shared/loader";
import ScrollToTop from "@/components/shared/scroll-to-top";
import { Suspense } from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: "NextJS Boilerplate",
  description: "Created By Muhammad Zahid",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const resolvedParams = await params; // Await the full params object
  const { locale } = resolvedParams;

  // Load localized messages and fall back to an empty object on error to avoid client chunk failures
  let messages: any = {};
  try {
    messages = await getMessages({ locale });
  } catch (e) {
    messages = {};
  }

  const isRtl = locale === "ur" || locale === "ar";
  const bodyClasses = isRtl
    ? `font-urdu ${urduFont.variable} ${GeistSans.variable} ${GeistMono.variable} antialiased`
    : `font-sans ${GeistSans.variable} ${GeistMono.variable} ${urduFont.variable} antialiased`;

  return (
    <html lang={locale} suppressHydrationWarning dir={isRtl ? "rtl" : "ltr"}>
      <body className={bodyClasses}>
        <NextIntlClientProvider messages={messages}>
          <Suspense
            fallback={<Loader isLoading text="Next Boiler..." variant="default" size="lg" />}
          >
            <Providers>{children}</Providers>
          </Suspense>
          <ScrollToTop />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
