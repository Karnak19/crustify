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
    .select(
      "id, name, description, price, base, picture, website_id!inner (subdomain)"
    )
    .eq("website_id.subdomain", eq)
    .eq("status", "published")
    .returns<
      {
        id: number;
        name: string;
        description: string;
        price: number;
        base: "tomato" | "cream";
        picture: string;
      }[]
    >();

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
    .select(
      "id, name, price, description, base, status, picture, websites!inner (user_id)"
    )
    .eq("websites.user_id", user.id)
    .returns<
      {
        id: number;
        name: string;
        description: string;
        price: number;
        base: "tomato" | "cream";
        status: "draft" | "published";
        picture: string;
      }[]
    >();

  return data;
}
