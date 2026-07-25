import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JUNO | Modern Commerce Infrastructure",
  description: "The world's most advanced encrypted ecosystem for vendors and suppliers.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JUNO",
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { Providers } from "@/components/providers";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PWARegistration } from "@/components/PWARegistration";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased selection:bg-indigo-500/30"
      >
        <ErrorBoundary>
          <Providers>
            <PWARegistration />
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
