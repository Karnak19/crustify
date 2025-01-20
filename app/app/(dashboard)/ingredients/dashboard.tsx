import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CardWithTabs } from "@/components/card-with-tabs";
import { createClient } from "@/lib/supabase/server";
import { getIngredients } from "@/lib/supabase/get-ingredients";
import { CreateIngredientForm } from "@/features/dashboard/ingredients/create-form";
import { IngredientsTable } from "@/features/dashboard/ingredients/table";
import { CreateCategoryForm } from "@/features/dashboard/categories/create-form";
import { CategoriesTable } from "@/features/dashboard/categories/table";

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

	const { data: fetchedCategories } = await supabase.from("categories").select("*");
	const categories: Array<{ created_at: string; id: number; name: string; updated_at: string; website_id: number | null }> =
		fetchedCategories ?? [];
	const ingredients = await getIngredients();

	const tabs = [
		{
			value: "ingredients" as const,
			label: "Ingredients",
			description: "Gérez vos ingredients ici. Vous pouvez créer, modifier et supprimer des ingredients.",
			content: <IngredientsTable ingredients={ingredients} categories={categories} />,
		},
		{
			value: "categories" as const,
			label: "Categories",
			description: "Gérez vos catégories ici. Vous pouvez créer, modifier et supprimer des catégories.",
			content: <CategoriesTable categories={categories} />,
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
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Ingredient</span>
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogTitle>Ajouter un ingredient</DialogTitle>
							{categories && <CreateIngredientForm categories={categories} />}
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger asChild>
							<Button size="sm" className="h-7 gap-1">
								<PlusCircle className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Categorie</span>
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogTitle>Ajouter une categorie</DialogTitle>
							<CreateCategoryForm categories={categories} />
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<CardWithTabs tabs={tabs} defaultValue="ingredients" title="Gestion des ingredients et catégories" />
		</>
	);
}
