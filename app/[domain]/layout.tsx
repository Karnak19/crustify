import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getImageUrl } from "@/lib/supabase/get-image-url";
import Script from "next/script";
import { Contact } from "./contact";
import { getTheme, getWebsiteData } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const supabase = createClient();
  const website = await getWebsiteData(supabase, domain);

  if (!website?.name) {
    return null;
  }

  const image = website.logo ? getImageUrl({ path: website.logo }) : undefined;

  return {
    title: website.name,
    description: "",
    openGraph: {
      title: website.name,
      description: "",
      ...(image && { images: [image] }),
    },
    twitter: {
      card: "summary_large_image",
      title: website.name,
      description: "",
      ...(image && { image: [image] }),
    },
    ...(image && { icons: [image] }),
    metadataBase: new URL(`https://${domain}`),
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   data.customDomain && {
    //     alternates: {
    //       canonical: `https://${data.customDomain}`,
    //     },
    //   }),
  };
}

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const domain = decodeURIComponent(params.domain);
  const supabase = createClient();
  const website = await getWebsiteData(supabase, domain);

  const { themes: theme } = website;

  if (!website) {
    notFound();
  }

  // Optional: Redirect to custom domain if it exists
  // if (
  //   domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
  //   data.customDomain &&
  //   process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
  // ) {
  //   return redirect(`https://${data.customDomain}`);
  // }

  return (
    <>
      <style global>{`
        :root {
          --background: ${theme.background};
          --foreground: ${theme.foreground};
          --muted-foreground: ${theme.foreground_muted};
          --primary: ${theme.primary_color};
          --secondary: ${theme.secondary};
        }
      `}</style>
      <div className="absolute ease left-0 right-0 top-0 z-30 flex h-16 transition-all duration-150">
        <div className="flex h-full max-w-screen-xl items-center space-x-5 px-10 sm:px-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              {website.logo && (
                <img
                  alt={website.name || ""}
                  height={40}
                  width={40}
                  src={getImageUrl({ path: website.logo })}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            {website.name && (
              <span className="text-lg font-medium">{website.name}</span>
            )}
          </Link>
        </div>
      </div>

      {children}
      <Contact
        name={website.name ?? ""}
        address={website.address}
        phone={website.phone}
      />

      <footer className="p-4 bg-card flex justify-between items-center text-muted-foreground">
        <div className="italic text-sm tracking-wider">
          Powered by{" "}
          <a
            className="not-italic font-semibold font-brand tracking-normal text-foreground"
            href="https://crustify.fr"
          >
            Crustify
          </a>
        </div>
      </footer>

      <Script
        defer
        data-domain={domain}
        src="https://plausible.rover.vernouillet.dev/js/script.js"
      />
    </>
  );
}
