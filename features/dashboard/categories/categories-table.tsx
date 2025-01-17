"use client";

import { DataTable } from "@/features/dashboard/data-table/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tables } from "@/lib/supabase/types";
import { ColumnsCategoriesTable } from "@/app/app/(dashboard)/categories-ingredients/columns-categories-table";
import { SortableHeadersIngredients } from "@/app/app/(dashboard)/ingredients/columns-ingredient-table";

export function CategoriesTable({
	ingredients: initialIngredients,
	categories,
}: {
	ingredients: Ingredient[];
	categories: Tables<"categories">[];
}) {
	return (
		<Card className="overflow-auto">
			<CardHeader>
				<CardTitle>Categories</CardTitle>
				<CardDescription>
					Gérez vos categories d'ingredients ici. Vous pouvez créer, modifier et supprimer des categories.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable
					sortableHeaders={SortableHeadersIngredients}
					data={initialIngredients}
					columns={ColumnsCategoriesTable({ categories })}
				/>
			</CardContent>
		</Card>
	);
}
