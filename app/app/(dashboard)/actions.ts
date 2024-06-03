"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

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

// ------------------------------------------------------------
// Add logo form
// ------------------------------------------------------------

const addLogoSchema = z.object({
  file: z.instanceof(File),
});

export async function addLogo(_: unknown, formData: FormData) {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return { success: false, error: "Unauthorized" };
  }

  const { data: website } = await supabase
    .from("websites")
    .select("id")
    .eq("user_id", userData.user.id)
    .single();

  if (!website) {
    return { success: false, error: "Website not found" };
  }

  const data = addLogoSchema.parse(Object.fromEntries(formData.entries()));

  const { data: imgData, error } = await supabase.storage
    .from("pizzas")
    .upload(
      `${userData.user.id}/${website.id}/${data.file.name.replace(
        /\s/g,
        "-"
      )}-${Date.now()}`,
      data.file
    );

  // upsert website with logo path
  await supabase
    .from("websites")
    .update({ logo: imgData?.path })
    .eq("id", website.id);

  if (error) {
    return { success: false, error };
  }

  return { success: true };
}

// ------------------------------------------------------------
// Add contact form
// ------------------------------------------------------------

const addContactSchema = z.object({
  websiteId: z.string(),
  phone: z.string(),
  address: z.string(),
  zip: z.string(),
  city: z.string(),
});

export async function addContact(_: unknown, formData: FormData) {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return { success: false, error: "Unauthorized" };
  }

  const { phone, ...data } = addContactSchema.parse(
    Object.fromEntries(formData.entries())
  );

  const address = `${data.address.trim()}, ${data.zip.trim()} ${data.city.trim()}`;

  const { error } = await supabase
    .from("websites")
    .update({ phone, address })
    .eq("id", data.websiteId);

  if (error) {
    return { success: false, error };
  }

  return { success: true };
}
