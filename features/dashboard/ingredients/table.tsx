"use client";

import { DataTable } from "@/components/data-table";
import type { Tables } from "@/lib/supabase/types";
import { columns, type Ingredient, sortableHeaders } from "./columns";

export function IngredientsTable({
	ingredients,
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

	return <DataTable {...{ sortableHeaders, data: ingredients, columns: columns(categories), filters }} />;
}
