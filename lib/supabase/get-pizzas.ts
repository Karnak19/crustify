import "server-only";

import { env } from "@/env";

import { createClient } from "./server";
import { getCurrentUser } from "./get-current-user";

export async function getPizzas(domain: string) {
  const supabase = createClient();
  const isSubdomain = domain.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  const eq = isSubdomain ? domain.split(".")[0] : domain;

  const { data } = await supabase
    .from("pizzas")
    .select("id, name, price, picture, websites:website_id (subdomain)")
    .eq("website_id.subdomain", eq)
    .eq("status", "published");

  return data;
}

export async function getMyPizzas() {
  const supabase = createClient();
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data } = await supabase
    .from("pizzas")
    .select("id, name, price, status, picture, websites:website_id (user_id)")
    .eq("websites.user_id", user.id);

  return data;
}