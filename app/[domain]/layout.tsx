import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSiteData } from "@/lib/supabase/get-site-data";
import { getImageUrl } from "@/lib/supabase/get-image-url";
import Script from "next/script";
import { Contact } from "./contact";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const { data } = await getSiteData(domain);

  if (!data?.name) {
    return null;
  }

  const image = data.logo ? getImageUrl({ path: data.logo }) : undefined;

  return {
    title: data.name,
    description: "",
    openGraph: {
      title: data.name,
      description: "",
      ...(image && { images: [image] }),
    },
    twitter: {
      card: "summary_large_image",
      title: data.name,
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
  const { data } = await getSiteData(domain);

  if (!data) {
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
      <div className="absolute ease left-0 right-0 top-0 z-30 flex h-16 bg-transparent transition-all duration-150">
        <div className="flex h-full max-w-screen-xl items-center space-x-5 px-10 sm:px-20">
          <Link href="/" className="flex items-center justify-center">
            <div className="inline-block h-8 w-8 overflow-hidden rounded-full align-middle">
              {data.logo && (
                <img
                  alt={data.name || ""}
                  height={40}
                  src={getImageUrl({ path: data.logo })}
                  width={40}
                />
              )}
            </div>
            <span className="ml-3 inline-block truncate font-title font-medium">
              {data.name}
            </span>
          </Link>
        </div>
      </div>

      {children}
      <Contact
        name={data.name ?? ""}
        address={data.address}
        phone={data.phone}
      />

      <Script
        defer
        data-domain={domain}
        src="https://plausible.rover.vernouillet.dev/js/script.js"
      />

      {/* {domain === `demo.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
      domain === "platformize.co" ? (
        <CTA />
      ) : (
        <ReportAbuse />
      )} */}
    </>
  );
}
