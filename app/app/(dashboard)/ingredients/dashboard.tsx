import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { getIngredients } from "@/lib/supabase/get-ingredients";
import { CreateIngredientForm } from "../../../../features/dashboard/ingredients/forms/create-ingredient-form";
import { createClient } from "@/lib/supabase/server";
import { IngredientsTable } from "../../../../features/dashboard/ingredients/ingredients-table";

export async function Dashboard() {
	const supabase = createClient();
	const { data: userData } = await supabase.auth.getUser();

	if (!userData.user) {
		throw new Error("Unauthorized");
	}

	const website = await supabase.from("websites").select("id").eq("user_id", userData.user.id).single();

	if (!website.data) {
		throw new Error("Website not found");
	}

	const { data: categories } = await supabase.from("categories").select("*");
	console.log("Categories:", categories);

	const ingredients = await getIngredients();

	return (
		<>
			<div className="flex items-center justify-between">
				<div className="ml-auto flex items-center gap-2">
					<Dialog>
						<DialogTrigger asChild>
							<Button size="sm" className="h-7 gap-1">
								<PlusCircle className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Ajouter un ingredient</span>
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogTitle>Ajouter un ingredient</DialogTitle>
							{categories && <CreateIngredientForm categories={categories} />}
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<div className="mt-4 grid gap-4">
				<IngredientsTable ingredients={ingredients} categories={categories || []} />
			</div>
		</>
	);
}
