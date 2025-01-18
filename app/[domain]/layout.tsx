import { getImageUrl } from "@/lib/supabase/get-image-url";
import { getWebsiteData } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { ReactNode } from "react";
import { Contact } from "./contact";

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
          --background: ${theme?.background ?? "179 68% 100%"};
          --foreground: ${theme?.foreground ?? "179 79% 0%"};
          --muted: ${theme?.muted ?? "179 21% 85%"};
          --muted-foreground: ${theme?.foreground_muted ?? "179 3% 39%"};
          --popover: ${theme?.popover ?? "179 68% 100%"};
          --popover-foreground: ${theme?.popover_foreground ?? "179 79% 0%"};
          --card: ${theme?.card ?? "0 0% 99%"};
          --card-foreground: ${theme?.card_foreground ?? "0 0% 0%"};
          --border: ${theme?.border ?? "179 9% 90%"};
          --input: ${theme?.input ?? "179 9% 85%"};
          --primary: ${theme?.primary_color ?? "179 64% 14%"};
          --primary-foreground: ${theme?.primary_foreground ?? "179 64% 54%"};
          --secondary: ${theme?.secondary_color ?? "179 2% 89%"};
          --secondary-foreground: ${
            theme?.secondary_foreground ?? "179 2% 29%"
          };
          --accent: ${theme?.accent ?? "179 2% 89%"};
          --accent-foreground: ${theme?.accent_foreground ?? "179 2% 29%"};
          --destructive: ${theme?.destructive ?? "7 95% 28%"};
          --destructive-foreground: ${
            theme?.destructive_foreground ?? "7 95% 88%"
          };
          --ring: ${theme?.ring ?? "179 64% 14%"};
          --radius: ${theme?.radius ?? "0.5rem"};

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
        street_address={website.street_address}
        zip_code={website.zip_code}
        city={website.city}
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
        src="https://plausible.crustify.fr/js/script.js"
      />
    </>
  );
}
