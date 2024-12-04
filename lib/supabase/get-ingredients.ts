import "server-only";

import { createClient } from "./server";

export async function getIngredients(websiteId: number) {
  const supabase = createClient();

  const { data: ingredients } = await supabase
    .from("ingredients")
   .select("id, name")
    .or(`website_id.is.null,website_id.eq.${websiteId}`)
    .order('name');

  return ingredients;
}
