"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { env } from "@/env";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  console.log("🚀 ~ login ~ data:", data);

  const { error } = await supabase.auth.signInWithPassword(data);
  console.log("🚀 ~ login ~ error:", error);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  console.log("🚀 ~ signup ~ data:", data);

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo: `http://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    },
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
