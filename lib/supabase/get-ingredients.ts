"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentWebsite } from "./get-current-website";

export async function getIngredients() {
	const supabase = createClient();
	const website = await getCurrentWebsite(supabase);

	const { data: ingredients, error } = await supabase
		.from("ingredients")
		.select(`
      id,
      name,
      website_id,
      categories (
        id,
        name
      )
    `)
		.or(`website_id.is.null,website_id.eq.${website?.id}`)
		.order("name");

	if (error) {
		console.error("Error fetching ingredients:", error);
		return [];
	}

	return ingredients;
}

export async function getCategories() {
	const supabase = createClient();
	const website = await getCurrentWebsite(supabase);

	const { data: categories, error } = await supabase
		.from("categories")
		.select("id, name")
		.or(`website_id.is.null,website_id.eq.${website?.id}`)
		.order("name");

	if (error) {
		console.error("Error fetching categories:", error);
		return [];
	}

	return categories.map((category) => ({ id: category.id, name: category.name }));
}
