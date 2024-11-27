import type { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";
import type { Database } from "@/lib/supabase/types";
import { env } from "@/env";

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .maybeSingle();

  return subscription as Database["public"]["Tables"]["subscriptions"]["Row"];
});

export const getProducts = cache(async (supabase: SupabaseClient) => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  return products as Database["public"]["Tables"]["products"]["Row"][];
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
  const { data: userDetails } = await supabase
    .from("profiles")
    .select("*")
    .single();
  return userDetails as Database["public"]["Tables"]["profiles"]["Row"];
});

export const getMyWebsite = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase);

  const { data: website } = await supabase
    .from("websites")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  return website as Database["public"]["Tables"]["websites"]["Row"];
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

    return theme as Database["public"]["Tables"]["themes"]["Row"];
  }
);

export const getWebsiteData = cache(
  async (supabase: SupabaseClient, domain: string) => {
    const isSubdomain = domain.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    const eq = isSubdomain ? domain.split(".")[0] : domain;

    const { data: website } = await supabase
      .from("websites")
      .select("*, themes(*)")
      .eq("subdomain", eq)
      .single();

    return website as Database["public"]["Tables"]["websites"]["Row"] & {
      themes: Database["public"]["Tables"]["themes"]["Row"];
    };
  }
);

export const getThemes = cache(async (supabase: SupabaseClient) => {
  const { data: themes } = await supabase.from("themes").select("*");
  return themes as Database["public"]["Tables"]["themes"]["Row"][];
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
