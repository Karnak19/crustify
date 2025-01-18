import "server-only";
import { env } from "@/env";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { z } from "zod";

export async function createWebsiteAnalytics(domain: string) {
  const token = env.PLAUSIBLE_API_KEY;

  if (!token) throw new Error("No Plausible token found");

  const fd = new FormData();
  fd.append("domain", domain);

  const response = await fetch("https://plausible.crustify.fr/api/v1/sites", {
    headers: { Authorization: `Bearer ${token}` },
    method: "POST",
    body: fd,
  });

  if (!response.ok) {
    const json = await response.json();

    throw new Error(
      json.error || "An error occurred while creating the website analytics"
    );
  }

  return response.json() as Promise<{ domain: string }>;
}

export async function putWebsiteSharedLink(domain: string) {
  const token = env.PLAUSIBLE_API_KEY;

  if (!token) throw new Error("No Plausible token found");

  const fd = new FormData();
  fd.append("site_id", domain);
  fd.append("name", "shared");

  const response = await fetch(
    "https://plausible.crustify.fr/api/v1/sites/shared-links",
    {
      headers: { Authorization: `Bearer ${token}` },
      method: "PUT",
      body: fd,
    }
  );

  if (!response.ok) {
    const json = await response.json();

    throw new Error(
      json.error || "An error occurred while creating the website shared link"
    );
  }

  return response.json() as Promise<{ name: string; url: string }>;
}

const schema = z.object({ subdomain: z.string() });

export async function createWebsiteAnalyticsAction(
  _: unknown,
  formData: FormData
) {
  try {
    // TODO: Check if the user is Pro

    const { subdomain } = schema.parse(Object.fromEntries(formData.entries()));

    const { domain } = await createWebsiteAnalytics(`${subdomain}.crustify.fr`);

    const { url } = await putWebsiteSharedLink(domain);

    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      return { error: "User not found" };
    }

    await supabase.from("websites").upsert({
      user_id: user.user.id,
      subdomain,
      plausible_shared_link: url,
    });

    revalidatePath("/app/analytics");
    return { success: true };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
