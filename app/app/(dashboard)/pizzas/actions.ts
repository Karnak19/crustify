"use server";

import { getSession } from "@/lib/supabase/get-session";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const pizzaInputSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.coerce.number(),
  picture: z.instanceof(File),
  website_id: z.coerce.number(),
});

export async function createPizza(formData: FormData) {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("Unauthorized");
  }

  const website = await supabase
    .from("websites")
    .select("id")
    .eq("user_id", userData.user?.id)
    .single();

  if (!website) {
    throw new Error("Website not found");
  }

  const data = pizzaInputSchema.parse({
    ...Object.fromEntries(formData.entries()),
    website_id: website.data?.id,
  });

  console.log("🚀 ~ createPizza ~ data:", data);

  const { data: imgData, error } = await supabase.storage
    .from("pizzas")
    .upload(
      `${userData.user.id}/${website.data?.id}/${data.picture.name.replace(
        /\s/g,
        "-"
      )}`,
      data.picture
    );

  const { picture, ...toInsert } = data;

  await supabase.from("pizzas").insert({
    ...toInsert,
    picture: imgData?.path,
  });

  revalidatePath("/pizzas");

  console.log("🚀 ~ createPizza ~ error:", error);
}

export async function publishPizza(formData: FormData) {
  const supabase = createClient();

  const id = formData.get("id");

  if (!id) {
    throw new Error("No id provided");
  }

  await supabase.from("pizzas").update({ status: "published" }).eq("id", +id);

  revalidatePath("/pizzas");
}

export async function unpublishPizza(formData: FormData) {
  const supabase = createClient();

  const id = formData.get("id");

  if (!id) {
    throw new Error("No id provided");
  }

  await supabase.from("pizzas").update({ status: "draft" }).eq("id", +id);

  revalidatePath("/pizzas");
}
