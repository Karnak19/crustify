import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { CreateIngredientForm } from "../../../../features/dashboard/ingredients/forms/create-ingredient-form";
import { createClient } from "@/lib/supabase/server";
import { IngredientsTable } from "../../../../features/dashboard/ingredients/ingredients-table";
import TabsComponent from "@/features/dashboard/tabs/tabs";
import { getIngredients } from "@/lib/supabase/get-ingredients";
import { CategoriesTable } from "@/features/dashboard/categories/categories-table";

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
	const ingredients = await getIngredients();

	const tabs = [
		{
			value: "ingredients",
			label: "Ingredients",
			content: <IngredientsTable ingredients={ingredients} categories={categories || []} />,
		},
		{
			value: "categories",
			label: "Categories",
			content: <CategoriesTable ingredients={ingredients.filter((ing) => !ing.categories)} categories={categories || []} />,
		},
	];

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
				<TabsComponent tabs={tabs} defaultValue="ingredients" />
			</div>
		</>
	);
}
