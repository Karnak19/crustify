"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ZSAError, createServerAction } from "zsa";

import { createClient } from "@/lib/supabase/server";
import { env } from "@/env";
import { redirect } from "next/navigation";

export const loginAction = createServerAction()
  .input(
    z.object({
      email: z.string(),
      password: z.string().min(6, "Minimum 6 caractères"),
    }),
    {
      type: "formData",
    }
  )
  .handler(async ({ input }) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(input);

    if (error) {
      throw new ZSAError("ERROR", "Email ou mot de passe incorrect");
    }

    revalidatePath("/", "layout");
    return null;
  });

export const signUpAction = createServerAction()
  .input(z.object({ email: z.string(), password: z.string() }), {
    type: "formData",
  })
  .handler(async ({ input }) => {
    const supabase = createClient();

    const { error, data } = await supabase.auth.signUp({
      ...input,
      options: {
        emailRedirectTo: `${
          process.env.NODE_ENV === "development" ? "http" : "https"
        }://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
    });

    if (error) {
      throw new ZSAError("INTERNAL_SERVER_ERROR", error.message);
    }

    console.log("🚀 ~ .handler ~ data:", data);

    revalidatePath("/app", "layout");
    return null;
  });
