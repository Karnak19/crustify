import Script from "next/script";
import type { ReactNode } from "react";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
{/*       <Script
        defer
        data-domain="crustify.fr"
        src="https://plausible.rover.vernouillet.dev/js/script.js"
      /> */}
      <Script
        defer
        data-domain="crustify.fr"
        src="https://plausible.crustify.fr/js/script.outbound-links.pageview-props.tagged-events.js"
      />
      <Script>
        {`
        window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) 
        `}
      </Script>
    </>
  );
}
