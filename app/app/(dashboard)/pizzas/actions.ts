"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const pizzaSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  description: z.string().optional(),
  price: z.coerce.number(),
  base: z.enum(["tomato", "cream"]),
  picture: z.instanceof(File),
  website_id: z.coerce.number()
});

const pizzaInputSchema = pizzaSchema.omit({
  id: true,
});

const pizzaEditSchema = pizzaSchema.partial();





export async function createPizza(formData: FormData) {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("Unauthorized");
  }

  const website = await supabase
    .from("websites")
    .select("id, subdomain")
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

  revalidatePath("/app/pizzas");
  revalidatePath(`/${website.data?.subdomain}`);
  revalidatePath(`/${website.data?.subdomain}/menu`);

  console.log("🚀 ~ createPizza ~ error:", error);
}

export async function publishPizza(formData: FormData) {
  const supabase = createClient();

  const id = formData.get("id");

  if (!id) {
    throw new Error("No id provided");
  }

  await supabase.from("pizzas").update({ status: "published" }).eq("id", +id);

  revalidatePath("/app/pizzas");
}

export async function unpublishPizza(formData: FormData) {
  const supabase = createClient();

  const id = formData.get("id");

  if (!id) {
    throw new Error("No id provided");
  }

  await supabase.from("pizzas").update({ status: "draft" }).eq("id", +id);

  revalidatePath("/app/pizzas");
}

export async function editPizza(formData: FormData) {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("Unauthorized");
  }

  const website = await supabase
    .from("websites")
    .select("id, subdomain")
    .eq("user_id", userData.user?.id)
    .single();

  if (!website) {
    throw new Error("Website not found");
  }

  const rawData = {
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    base: formData.get("base"),
    picture: formData.get("picture"),
  };

  const data = pizzaEditSchema.parse(rawData);
  let imgPath = undefined;

  const picture = formData.get("picture");
  if (picture && typeof picture !== "string") {
    const { data: imgData } = await supabase.storage
      .from("pizzas")
      .upload(
        `${userData.user.id}/${website.data?.id}/${picture.name.replace(/\s/g, "-")}`,
        picture
      );
    imgPath = imgData?.path;
  }

  const { picture: _, id, ...updateData } = data;
  
  await supabase
    .from("pizzas")
    .update({
      ...updateData,
      ...(imgPath && { picture: imgPath }),
    })
    .eq("id", id);

  revalidatePath("/app/pizzas");
  revalidatePath(`/${website.data?.subdomain}`);
  revalidatePath(`/${website.data?.subdomain}/menu`);
}

export async function deletePizza(formData: FormData) {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id");
  if (!id) return;

  const website = await supabase
    .from("websites")
    .select("subdomain")
    .eq("user_id", userData.user?.id)
    .single();

  // Get the pizza to find its picture path
  const { data: pizza } = await supabase
    .from("pizzas")
    .select("picture")
    .eq("id", +id)
    .single();

  // Delete the picture from storage if it exists
  if (pizza?.picture) {
    await supabase.storage.from("pizzas").remove([pizza.picture]);
  }

  // Delete the pizza record
  await supabase.from("pizzas").delete().eq("id", +id);

  revalidatePath("/app/pizzas");
  if (website?.data?.subdomain) {
    revalidatePath(`/${website.data.subdomain}`);
    revalidatePath(`/${website.data.subdomain}/menu`);
  }
}
