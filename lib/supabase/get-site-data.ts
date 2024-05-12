import "server-only";

import { env } from "@/env";

import { createClient } from "./server";

export function getSiteData(domain: string) {
  const isSubdomain = domain.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  const eq = isSubdomain ? domain.split(".")[0] : domain;

  return createClient().from("websites").select().eq("subdomain", eq).single();
}
