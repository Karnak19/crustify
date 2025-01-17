"use client";

import type { Tables } from "@/lib/supabase/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/features/dashboard/data-table/data-table";
import { ColumnsCategoriesTable, SortableHeadersCategories } from "@/app/app/(dashboard)/categories-ingredients/columns-categories-table";
import type { Ingredient } from "@/lib/supabase/types";

interface CategoriesTableProps {
	ingredients: Ingredient[];
	categories: Tables<"categories">[];
}

export function CategoriesTable({ ingredients, categories }: CategoriesTableProps) {
	const filters = [
		{
			id: "name",
			width: "w-44",
		},
	];

	return (
		<Card className="overflow-auto">
			<CardHeader>
				<CardTitle>Categories</CardTitle>
				<CardDescription>Gérez vos catégories ici. Vous pouvez créer, modifier et supprimer des catégories.</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable
					sortableHeaders={SortableHeadersCategories}
					data={categories}
					columns={ColumnsCategoriesTable({ ingredients })}
					filters={filters}
				/>
			</CardContent>
		</Card>
	);
}
