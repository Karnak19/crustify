"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { ZSAError, createServerAction } from "zsa";

const createWebsiteSchema = z.object({
  name: z.string(),
  subdomain: z.string(),
});

export const createWebsiteAction = createServerAction()
  .input(createWebsiteSchema)
  .handler(async ({ input }) => {
    const supabase = createClient();

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      throw new ZSAError(
        "NOT_AUTHORIZED",
        "Vous n'êtes pas autorisé à effectuer cette action"
      );
    }

    await supabase.from("profiles").upsert({ id: userData.user.id });

    await supabase
      .from("websites")
      .insert({ ...input, user_id: userData.user.id });

    revalidatePath("/app");
  });

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
  street_address: z.string(),
  zip_code: z.string(),
  city: z.string(),
});

export const addContactAction = createServerAction()
  .input(
    z.object({
      websiteId: z.string(),
      phone: z.string().regex(/^(\+33|0)(6|7|9)\d{8}$/),
      street_address: z.string(),
      zip_code: z.string(),
      city: z.string(),
    }),
    {
      type: "formData",
    }
  )
  .handler(async ({ input }) => {
    const supabase = createClient();

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      throw new ZSAError(
        "NOT_AUTHORIZED",
        "Vous n'êtes pas autorisé à effectuer cette action"
      );
    }

    const { phone, websiteId, ...addressData } = addContactSchema.parse(input);

    const { error } = await supabase
      .from("websites")
      .update({
        phone,
        street_address: addressData.street_address.trim(),
        zip_code: addressData.zip_code.trim(),
        city: addressData.city.trim(),
      })
      .eq("id", websiteId);

    if (error) {
      throw new ZSAError(
        "ERROR",
        "Une erreur est survenue lors de la mise à jour de vos coordonnées"
      );
    }

    return null;
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

  const address = `${data.street_address.trim()}, ${data.zip_code.trim()} ${data.city.trim()}`;

  const { error } = await supabase
    .from("websites")
    .update({ phone, address })
    .eq("id", data.websiteId);

  if (error) {
    return { success: false, error };
  }

  return { success: true };
}
