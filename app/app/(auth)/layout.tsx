import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | Platforms Starter Kit",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
