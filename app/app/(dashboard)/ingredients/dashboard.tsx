import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, PlusCircle } from "lucide-react";
import { getMyPizzas } from "@/lib/supabase/get-pizzas";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Suspense } from "react";
import { getIngredients } from "@/lib/supabase/get-ingredients";
import { IngredientsTable } from "./ingredients-table";
import { CreateIngredientForm } from "./create-ingredient-form";
import { CategoriesTable } from "../categories-ingredients/categories-table";
import { createClient } from "@/lib/supabase/server";
import { DataTable } from "@/features/dashboard/data-table/data-table";
import type { Item } from "@/features/dashboard/data-table/data-table";
import {
	type Column,
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getSortedRowModel,
	type RowData,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { IngredientsTable2 } from "./ingredients-table2";

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
	// console.log("🚀 ~ Dashboard ~ ingredients:", ingredients)

	//this will show the arrow for sorting the table but can sort without it ?? weird

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
				<Card className="overflow-auto">
					<CardHeader>
						<CardTitle>Ingredients</CardTitle>
						<CardDescription>
							Gérez vos ingredients ici. Vous pouvez créer, modifier et supprimer des ingredients.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<IngredientsTable2 ingredients={ingredients ?? []} />
					</CardContent>
				</Card>
				{/* <Card className="overflow-auto">
					<CardHeader>
						<CardTitle>Ingredients</CardTitle>
						<CardDescription>
							Gérez vos ingredients ici. Vous pouvez créer, modifier et supprimer des ingredients.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<DataTable sortingHeaders={sortingHeadersIngredients} columnsData={columnsIngredients} />
					</CardContent>
				</Card> */}

				<Card className="overflow-auto">
					<CardHeader>
						<CardTitle>Ingredients</CardTitle>
						<CardDescription>
							Gérez vos ingredients ici. Vous pouvez créer, modifier et supprimer des ingredients.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<IngredientsTable ingredients={ingredients ?? []} categories={categories ?? []} />
					</CardContent>
				</Card>
				<Card className="overflow-auto">
					<CardHeader>
						<CardTitle>Catégories</CardTitle>
						<CardDescription>Gérez vos catégories ici. Vous pouvez créer, modifier et supprimer des catégories.</CardDescription>
					</CardHeader>
					<CardContent>
						<CategoriesTable categories={categories ?? []} />
					</CardContent>
				</Card>
			</div>
		</>
	);
}
