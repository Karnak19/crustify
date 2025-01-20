"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { ZsaDeleteButtonWithToast } from "@/components/zsa-delete-button-with-toast";
import { Button } from "@/components/ui/button";
import type { Tables } from "@/lib/supabase/types";
import { deleteCategoryAction } from "./actions";
import { EditCategoryForm } from "./edit-form";

export type Category = Tables<"categories">;
export type Ingredient = Omit<Tables<"ingredients">, "created_at" | "category_id"> & {
	categories: { id: number; name: string } | null;
};

export const sortableHeaders = [
	{
		id: "name",
		desc: false,
	},
	{
		id: "type",
		desc: false,
	},
];

export const columns: ColumnDef<Category>[] = [
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
			const category = row.original;

			return (
				<div className="flex items-center gap-2">
					{category.website_id && (
						<>
							<Dialog>
								<DialogTrigger asChild>
									<Button size="icon" variant="ghost" className="h-8 w-8" title="Modifier">
										<Pencil className="h-4 w-4" />
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>Modifier la catégorie</DialogHeader>
									<EditCategoryForm category={category} />
								</DialogContent>
							</Dialog>

							<ZsaDeleteButtonWithToast id={category.id} onDeleteAction={deleteCategoryAction} />
						</>
					)}
				</div>
			);
		},
		enableSorting: false,
	},
];
