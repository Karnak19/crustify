import type React from "react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Lobster, Taviraj } from "next/font/google";

import "./globals.css";

export const metadata: Metadata = {
  title: "Crustify",
  description: "Votre pizzeria en ligne préférée.",
};

const lobster = Lobster({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lobster",
  weight: ["400"],
});

const taviraj = Taviraj({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-taviraj",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen antialiased",
          lobster.variable,
          taviraj.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
