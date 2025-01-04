import { env } from "@/env";
import type { Tables } from "@/lib/supabase/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

type Product = Tables<"products">;
type Price = Tables<"prices">;
type Subscription = Tables<"subscriptions">;
type Profile = Tables<"profiles">;
type Website = Tables<"websites">;
type Theme = Tables<"themes">;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}
interface WebsiteWithTheme extends Website {
  themes: Theme;
}

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .maybeSingle();

  return subscription as SubscriptionWithProduct;
});

export const getProducts = cache(async (supabase: SupabaseClient) => {
  const { data: products } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  return products as ProductWithPrices[];
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
  const { data: userDetails } = await supabase
    .from("profiles")
    .select("*")
    .single();
  return userDetails as Profile;
});

export const getMyWebsite = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase);

  const { data: website } = await supabase
    .from("websites")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  return website as Website;
});

export const getTheme = cache(
  async (supabase: SupabaseClient, domain: string) => {
    const isSubdomain = domain.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    const eq = isSubdomain ? domain.split(".")[0] : domain;

    const { data: theme } = await supabase
      .from("themes")
      .select("*")
      .eq("subdomain", eq)
      .single();

    return theme as Theme;
  }
);

export const getWebsiteData = cache(
  async (supabase: SupabaseClient, domain: string) => {
    const isSubdomain = domain.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);
    const eq = isSubdomain ? domain.split(".")[0] : domain;

    const { data: website } = await supabase
      .from("websites")
      .select(
        "*, user_id(plan), themes(*), homepage_description, menu_button_text, contact_button_text"
      )
      .eq("subdomain", eq)
      .single();

    return website as WebsiteWithTheme;
  }
);

export const getThemes = cache(async (supabase: SupabaseClient) => {
  const { data: themes } = await supabase.from("themes").select("*");
  return themes as Theme[];
});

export const getCurrentTheme = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase);
  if (!user) return null;

  const { data: website } = await supabase
    .from("websites")
    .select("theme_id")
    .eq("user_id", user.id)
    .single();

  if (!website?.theme_id) return null;

  const { data: currentTheme } = await supabase
    .from("themes")
    .select("*")
    .eq("id", website.theme_id)
    .single();

  return currentTheme;
});
