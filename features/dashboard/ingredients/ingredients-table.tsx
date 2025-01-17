"use client";

import {
	ColumnsIngredientsTable,
	SortableHeadersIngredients,
} from "../../../app/app/(dashboard)/ingredients/columns-ingredient-table";
import { DataTable } from "@/features/dashboard/data-table/data-table";
import type { Tables } from "@/lib/supabase/types";

export function IngredientsTable({
	ingredients: initialIngredients,
	categories,
}: {
	ingredients: Ingredient[];
	categories: Tables<"categories">[];
}) {
	const filters = [
		{
			id: "name",
			width: "w-44",
		},
		{
			id: "categories",
			width: "w-36",
		},
	];

	return (
		<DataTable
			sortableHeaders={SortableHeadersIngredients}
			data={initialIngredients}
			columns={ColumnsIngredientsTable({ categories })}
			filters={filters}
		/>
	);
}
