"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { authedWithWebsiteProcedure } from "@/lib/procedures";
import { createClient } from "@/lib/supabase/server";
import { getCurrentWebsite } from "@/lib/supabase/get-current-website";

export const createCategoryAction = authedWithWebsiteProcedure
	.createServerAction()
	.input(
		z.object({
			name: z.string(),
		}),
		{ type: "formData" },
	)
	.handler(async ({ input, ctx }) => {
		try {
			const { supabase, website } = ctx;

			const { data: category, error: categoryError } = await supabase
				.from("categories")
				.insert({
					name: input.name,
					website_id: website.id,
				})
				.select()
				.single();

			if (categoryError) {
				console.error("🚀 Category creation error:", categoryError);
				throw new Error("Une erreur est survenue lors de la création de la catégorie");
			}

			console.log("🚀 Category created successfully!");
			revalidatePath("/app/ingredients");
			revalidatePath("/app/categories-ingredients");

			return { category };
		} catch (error) {
			console.error("🚀 Error in createCategoryAction:", error);
			throw error;
		}
	});

export const editCategoryAction = authedWithWebsiteProcedure
	.createServerAction()
	.input(
		z.object({
			id: z.coerce.number(),
			name: z.string(),
		}),
		{ type: "formData" },
	)
	.handler(async ({ input, ctx }) => {
		try {
			const { supabase, website } = ctx;

			const { error: categoryError } = await supabase
				.from("categories")
				.update({
					name: input.name,
				})
				.eq("id", input.id)
				.eq("website_id", website.id);

			if (categoryError) {
				console.error("🚀 Category update error:", categoryError);
				throw new Error("Une erreur est survenue lors de la modification de la catégorie");
			}

			console.log("🚀 Category updated successfully!");
			revalidatePath("/app/ingredients");
			revalidatePath("/app/categories-ingredients");

			return { success: true };
		} catch (error) {
			console.error("🚀 Error in editCategoryAction:", error);
			throw error;
		}
	});

export const deleteCategoryAction = authedWithWebsiteProcedure
	.createServerAction()
	.input(
		z.object({
			id: z.coerce.number(),
		}),
		{ type: "formData" },
	)
	.handler(async ({ input, ctx }) => {
		try {
			console.log("Starting category deletion for id:", input.id);
			const { supabase, website } = ctx;

			// First, verify the category exists and belongs to this website
			const { data: category, error: categoryError } = await supabase
				.from("categories")
				.select("*")
				.eq("id", input.id)
				.eq("website_id", website.id)
				.single();

			console.log("Category lookup result:", { category, error: categoryError });

			if (!category) {
				console.error("Category not found or not owned by website");
				throw new Error("Catégorie non trouvée");
			}

			// Update ingredients
			const { error: updateError } = await supabase
				.from("ingredients")
				.update({ category_id: null })
				.eq("category_id", input.id)
				.eq("website_id", website.id);

			if (updateError) {
				console.error("Error updating ingredients:", updateError);
				throw new Error("Erreur lors de la mise à jour des ingrédients");
			}

			console.log("Successfully updated ingredients, proceeding to delete category");

			// Delete the category
			const { error: deleteError } = await supabase
				.from("categories")
				.delete()
				.eq("id", input.id)
				.eq("website_id", website.id);

			if (deleteError) {
				console.error("Error deleting category:", deleteError);
				throw new Error("Erreur lors de la suppression de la catégorie");
			}

			console.log("Successfully deleted category");

			// Revalidate all necessary paths
			revalidatePath("/app/ingredients");
			revalidatePath("/app/categories-ingredients");
		

			return { success: true };
		} catch (error) {
			console.error("Error in deleteCategoryAction:", error);
			throw error;
		}
	});
