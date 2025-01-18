import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Lobster, Taviraj } from "next/font/google";
import type React from "react";

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
		<html lang="fr" className={cn(lobster.variable, taviraj.variable)}>
			<body className={cn("min-h-screen antialiased", lobster.variable, taviraj.variable)}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
