"use server";

import { getSession } from "@/lib/supabase/get-session";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const pizzaInputSchema = z.object({
  name: z.string(),
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

  console.log("🚀 ~ createPizza ~ error:", error);
}
