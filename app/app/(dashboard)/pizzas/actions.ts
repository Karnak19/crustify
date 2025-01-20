"use server";

console.log("🚀 Actions file loaded");

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ZSAError, createServerAction } from "zsa";

const pizzaSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  description: z.string().optional(),
  price: z.coerce.number(),
  base: z.enum(["tomato", "cream"]),
  picture: z.custom<File>((file) => file instanceof Blob || file instanceof File).optional(),
  website_id: z.coerce.number()
});

const pizzaInputSchema = pizzaSchema.omit({
  id: true,
});

const pizzaEditSchema = pizzaSchema.partial();

export const createPizzaAction = createServerAction()
  .input(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      price: z.coerce.number(),
      base: z.enum(["tomato", "cream"]),
      picture: z.custom<File>((file) => file instanceof Blob || file instanceof File).optional(),
    }),
    { type: "formData" }
  )
  .handler(async ({ input }) => {
    try {
      console.log("🚀 Starting pizza creation with input:", input);
      const supabase = createClient();

      const { data: userData } = await supabase.auth.getUser();
      console.log("🚀 User data:", userData);

      if (!userData.user) {
        throw new ZSAError("NOT_AUTHORIZED", "Vous devez être connecté");
      }

      const website = await supabase
        .from("websites")
        .select("id, subdomain")
        .eq("user_id", userData.user?.id)
        .single();

      console.log("🚀 Website data:", website);

      if (!website.data) {
        throw new ZSAError("NOT_FOUND", "Site web non trouvé");
      }

      const { picture, ...toInsert } = input;
      console.log("🚀 Picture and data:", { picture, toInsert });

      let imgPath = null;
      
      // Only attempt upload if picture exists and is a valid File object
      if (picture && picture instanceof File && picture.size > 0) {
        const { data: imgData, error: imgError } = await supabase.storage
          .from("pizzas")
          .upload(
            `${userData.user.id}/${website.data.id}/${picture.name.replace(/\s/g, "-")}`,
            picture
          );

        if (imgError) {
          console.error("🚀 Image upload error:", imgError);
          throw new ZSAError("ERROR", "Erreur lors de l'upload de l'image");
        }

        console.log("🚀 Image uploaded:", imgData);
        imgPath = imgData?.path;
      }

      const { error: pizzaError } = await supabase.from("pizzas").insert({
        ...toInsert,
        picture: imgPath,
        website_id: website.data.id,
        status: "draft"
      });

      if (pizzaError) {
        console.error("🚀 Pizza creation error:", pizzaError);
        throw new ZSAError("ERROR", "Erreur lors de la création de la pizza");
      }

      console.log("🚀 Pizza created successfully!");

      revalidatePath("/app/pizzas");
      revalidatePath(`/${website.data.subdomain}`);
      revalidatePath(`/${website.data.subdomain}/menu`);

      return { success: true };
    } catch (error) {
      console.error("🚀 Error in createPizzaAction:", error);
      if (error instanceof ZSAError) throw error;
      throw new ZSAError("ERROR", "Une erreur est survenue lors de la création de la pizza");
    }
  });



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