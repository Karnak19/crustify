import type { ReactNode } from "react";
import Script from "next/script";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        defer
        data-domain="crustify.fr"
        src="https://plausible.rover.vernouillet.dev/js/script.js"
      />
    </>
  );
}
