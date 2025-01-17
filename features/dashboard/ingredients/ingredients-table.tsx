"use client";

import {
	ColumnsIngredientsTable,
	type Ingredient,
	SortableHeadersIngredients,
} from "../../../app/app/(dashboard)/ingredients/columns-ingredient-table";
import { DataTable } from "@/features/dashboard/data-table/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function IngredientsTable({ 
	ingredients: initialIngredients,
	categories 
}: { 
	ingredients: Ingredient[];
	categories: Tables<"categories">[]; 
}) {
	return (
		<Card className="overflow-auto">
			<CardHeader>
				<CardTitle>Ingredients</CardTitle>
				<CardDescription>Gérez vos ingredients ici. Vous pouvez créer, modifier et supprimer des ingredients.</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable 
					sortableHeaders={SortableHeadersIngredients} 
					data={initialIngredients} 
					columns={ColumnsIngredientsTable({ categories })} 
				/>
			</CardContent>
		</Card>
	);
}
