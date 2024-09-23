"use server";

import { env } from "@/env";
import { putWebsiteSharedLink } from "@/lib/plausible";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const configureAnalytics = createServerAction()
  .input(
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("domain"),
        domain: z.string(),
      }),
      z.object({
        type: z.literal("subdomain"),
        subdomain: z.string(),
      }),
    ]),
    { type: "formData" }
  )
  .handler(async ({ input }) => {
    const supabase = createClient();
    const { type } = input;
    console.log("🚀 ~ .handler ~ input:", input);

    // Create the website on Plausible
    const response = await fetch(
      "https://plausible.rover.vernouillet.dev/api/v1/sites",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.PLAUSIBLE_API_KEY}`,
        },
        body: JSON.stringify({
          domain:
            type === "domain" ? input.domain : `${input.subdomain}.crustify.fr`,
          timezone: "Europe/Paris",
        }),
      }
    );
    console.log("🚀 ~ .handler ~ response:", response);

    if (!response.ok) {
      throw new Error("Failed to create website on Plausible");
    }

    const plausibleData = await response.json();
    console.log("🚀 ~ .handler ~ plausibleData:", plausibleData);

    const sharedLink = await putWebsiteSharedLink(
      type === "domain" ? input.domain : `${input.subdomain}.crustify.fr`
    );
    console.log("🚀 ~ .handler ~ sharedLink:", sharedLink);

    // Update the website on Supabase
    const { data, error } = await supabase
      .from("websites")
      .update({ plausible_shared_link: sharedLink.url })
      .eq(
        type === "domain" ? "domain" : "subdomain",
        type === "domain" ? input.domain : `${input.subdomain}`
      );

    console.log("🚀 ~ .handler ~ data:", data);

    if (error) {
      throw new Error("Failed to update website on Supabase");
    }

    revalidatePath("/app/analytics");

    return { success: true };
  });
