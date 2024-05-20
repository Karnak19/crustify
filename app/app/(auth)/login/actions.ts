"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { env } from "@/env";

const inputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(_: unknown, formData: FormData) {
  const supabase = createClient();

  const input = inputSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!input.success) {
    return { error: "Veuillez entrer un email et un mot de passe valides" };
  }

  const { error } = await supabase.auth.signInWithPassword(input.data);

  if (error) {
    return { error: "Email ou mot de passe invalide(s)" };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signup(_: unknown, formData: FormData) {
  const supabase = createClient();

  const data = inputSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!data.success) {
    return { error: "Veuillez entrer un email et un mot de passe valides" };
  }

  const { error } = await supabase.auth.signUp({
    ...data.data,
    options: {
      emailRedirectTo: `https://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}
