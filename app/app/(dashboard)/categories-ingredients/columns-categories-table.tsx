"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { Tables } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { EditIngredientForm } from "../../../../features/dashboard/ingredients/forms/edit-ingredient-form";
import { DeleteButton } from "@/features/dashboard/buttons/delete-button";
import { deleteCategoryAction } from "./actions";

export type Ingredient = Omit<Tables<"ingredients">, "created_at" | "category_id"> & {
	categories: { id: number; name: string } | null;
};

export const SortableHeadersIngredients = [
	// { id: "traffic", desc: false },

	{ id: "name", desc: false },
	// { id: "categories", desc: true },
	{ id: "type", desc: false },
];

export const SortableHeadersCategories = [
	{
		id: "name",
		desc: false,
	},
	{
		id: "type",
		desc: false,
	},
];

export const ColumnsCategoriesTable = ({ categories }: { categories: Tables<"categories">[] }) => [
	{
		header: "Nom de la categorie",
		accessorKey: "name",
		cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
	},

	{
		header: "Type",
		accessorKey: "website_id",
		cell: ({ row }) => {
			const websiteId = row.getValue("website_id") as number | null;
			return <div>{websiteId === null ? "Global" : "Personnalisé"}</div>;
		},
		meta: {
			filterVariant: "select",
		},
	},
	{
		header: "Actions",
		id: "actions",
		cell: ({ row }) => {
			const ingredient = row.original;

			return (
				<div className="flex items-center gap-2">
					{ingredient.website_id !== null && (
						<>
							<Dialog>
								<DialogTrigger asChild>
									<Button size="icon" variant="ghost" className="h-8 w-8" title="Modifier">
										<Pencil className="h-4 w-4" />
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>Modifier l'ingrédient</DialogHeader>
									<EditIngredientForm ingredient={ingredient} categories={categories} />
								</DialogContent>
							</Dialog>

							<DeleteButton id={ingredient.id} onDelete={deleteCategoryAction} />
						</>
					)}
				</div>
			);
		},
		enableSorting: false,
	},
];
