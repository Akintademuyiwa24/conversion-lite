import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/store/ReduxProvider";
import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700']
})


export const metadata: Metadata = {
  title: "Converxio Lite",
  description: "A lightweight version of Converxio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter} antialiased`}
      >
        <ClerkProvider
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
      >
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
