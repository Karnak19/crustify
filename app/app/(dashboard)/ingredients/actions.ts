"use server";

console.log("🚀 Actions file loaded");

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";
import { getCurrentWebsite } from "@/lib/supabase/get-current-website";
import { authedWithWebsiteProcedure } from "@/lib/procedures";

export const createIngridientAction = authedWithWebsiteProcedure
	.createServerAction()
	.input(
		z.object({
			name: z.string(),
			category_id: z.coerce.number().optional(),
		}),
		{ type: "formData" },
	)
	.handler(async ({ input, ctx }) => {
		try {
			console.log("🚀 Starting ingridient creation with input:", input);
			const { supabase, website } = ctx;

			const { error: ingridientError } = await supabase.from("ingredients").insert({
				name: input.name,
				category_id: input.category_id || null,
				website_id: website.id,
			});

			if (ingridientError) {
				console.error("🚀 Ingridient creation error:", ingridientError);
				throw new Error("Une erreur est survenue lors de la création de l'ingridient");
			}

			console.log("🚀 Ingridient created successfully!");
			revalidatePath("/app/ingredients");
			revalidatePath(`/${website.subdomain}`);
			revalidatePath(`/${website.subdomain}/menu`);

			return { success: true };
		} catch (error) {
			console.error("🚀 Error in createIngridientAction:", error);
			throw error;
		}
	});

export const editIngridientAction = createServerAction()
	.input(
		z.object({
			id: z.coerce.number(),
			name: z.string(),
			category_id: z.coerce.number().optional(),
		}),
		{ type: "formData" },
	)
	.handler(async ({ input }) => {
		try {
			console.log("🚀 Starting ingridient edit with input:", input);
			const supabase = createClient();
			const { data: userData } = await supabase.auth.getUser();
			console.log("🚀 User data:", userData);
			if (!userData.user) {
				throw new Error("Vous devez être connecté");
			}

			const website = await getCurrentWebsite(supabase);

			console.log("🚀 Website data:", website);
			if (!website) {
				throw new Error("Site web non rencontré");
			}

			const { error: ingridientError } = await supabase
				.from("ingredients")
				.update({
					name: input.name,
					category_id: input.category_id || null,
				})
				.eq("id", input.id)
				.eq("website_id", website.id);

			if (ingridientError) {
				console.error("🚀 Ingridient edit error:", ingridientError);
				throw new Error("Une erreur est survenue lors de l'édition de l'ingridient");
			}

			console.log("🚀 Ingridient edited successfully!");
			revalidatePath("/app/ingredients");
			revalidatePath(`/${website.subdomain}`);
			revalidatePath(`/${website.subdomain}/menu`);

			return { success: true };
		} catch (error) {
			console.error("🚀 Error in editIngridientAction:", error);
			throw error;
		}
	});

export const deleteIngridientAction = authedWithWebsiteProcedure
	.createServerAction()
	.input(
		z.object({
			id: z.coerce.number(),
		}),
		// { type: "formData" },
	)
	.handler(async ({ input, ctx }) => {
		try {
			const { supabase, website } = ctx;

			const { error } = await supabase
				.from("ingredients")
				.delete()
				.eq("id", input.id)
				.eq("website_id", website.id);

			if (error) {
				console.error("Error deleting ingredient:", error);
				throw new Error("Erreur lors de la suppression de l'ingrédient");
			}

			revalidatePath("/app/ingredients");
			return { success: true };
		} catch (error) {
			console.error("Error in deleteIngridient:", error);
			throw error;
		}
	});

export async function updateIngredientAction(data: {
	id: number;
	name: string;
	category: string;
}) {
	const supabase = createClient();

	await supabase
		.from("ingredients")
		.update({
			name: data.name,
			category: data.category,
		})
		.eq("id", data.id);

	revalidatePath("/ingredients");
}
