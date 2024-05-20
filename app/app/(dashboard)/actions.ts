"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createWebsiteSchema = z.object({
  name: z.string(),
  subdomain: z.string(),
});

export async function createWebsite(formData: FormData) {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("Unauthorized");
  }

  const data = createWebsiteSchema.parse(
    Object.fromEntries(formData.entries())
  );

  const upserted = await supabase
    .from("profiles")
    .upsert({ id: userData.user.id });
  console.log("🚀 ~ createWebsite ~ upserted:", upserted);

  const { error } = await supabase
    .from("websites")
    .insert({ ...data, user_id: userData.user.id });
  console.log("🚀 ~ createWebsite ~ error:", error);

  revalidatePath("/");

  // const { data: imgData, error } = await supabase.storage
  //   .from("websites")
  //   .upload(
  //     `${userData.user.id}/${website.data?.id}/${data.logo.name.replace(
  //       /\s/g,
  //       "-"
  //     )}`,
  //     data.logo
  //   );

  // const { logo, ...toInsert } = data;

  // await supabase.from("websites").insert({
  //   ...toInsert,
  //   logo: imgData?.path,
  // });

  // revalidatePath("/websites");
}

export async function update() {}
