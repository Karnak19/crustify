import { z } from "zod";
import { revalidatePath } from "next/cache";
import { authedWithWebsiteProcedure } from "@/lib/procedures";

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

			return { category };
		} catch (error) {
			console.error("🚀 Error in createCategoryAction:", error);
			throw error;
		}
	});
