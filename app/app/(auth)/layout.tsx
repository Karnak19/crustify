import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import PizzaImage from "./pizza.jpg";

export const metadata: Metadata = {
  title: "Connexion | Crustify",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="w-full h-full min-h-screen lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">{children}</div>
        <div className="hidden bg-muted lg:block relative">
          <Image
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={PizzaImage}
            alt="Image"
            className="inset-0 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
