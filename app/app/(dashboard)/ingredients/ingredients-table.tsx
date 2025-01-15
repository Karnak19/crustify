"use client";

import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, LoaderIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { deleteIngridientAction } from "./actions";
import { EditIngredientForm } from "./edit-ingredient-form";
import { useServerAction } from "zsa-react";
import type { Database } from "@/lib/supabase/types";
import { SortableHeader } from "./sortable-header";

type FullIngredient = Database["public"]["Tables"]["ingredients"]["Row"];
type Ingredient = Omit<FullIngredient, "created_at">;
type SortableField = "name" | "category" | "type";
type SortDirection = "asc" | "desc" | null;
type Categories = Database["public"]["Tables"]["categories"]["Row"];

export function IngredientsTable({
	ingredients: initialIngredients,
	categories,
}: { ingredients: Ingredient[]; categories: Categories[] }) {
	const [sort, setSort] = useState<{
		field: SortableField | null;
		direction: SortDirection;
	}>({
		field: null,
		direction: null,
	});

	const handleSort = (field: SortableField) => {
		setSort((prev) => {
			// If clicking the same field and direction is desc, clear the sort
			if (prev.field === field && prev.direction === "desc") {
				return {
					field: null,
					direction: null,
				};
			}
			// If clicking the same field, toggle direction asc -> desc
			if (prev.field === field) {
				return {
					field,
					direction: prev.direction === "asc" ? "desc" : "asc",
				};
			}
			// If clicking a new field, set it to asc
			return {
				field,
				direction: "asc",
			};
		});
	};

	console.log(categories);

	const ingredients = useMemo(() => {
		if (!sort.direction || !sort.field) return initialIngredients;

		return [...initialIngredients].sort((a, b) => {
			const direction = sort.direction === "asc" ? 1 : -1;

			switch (sort.field) {
				case "name":
					return direction * a.name.localeCompare(b.name);
				case "category": {
					const categoryA = categories.find((cat) => cat.id === a.category_id)?.name ?? "";
					const categoryB = categories.find((cat) => cat.id === b.category_id)?.name ?? "";
					return direction * categoryA.localeCompare(categoryB);
				}
				case "type": {
					const typeA = a.website_id ?? 0;
					const typeB = b.website_id ?? 0;
					return direction * (typeA - typeB);
				}
				default:
					return 0;
			}
		});
	}, [initialIngredients, sort.field, sort.direction, categories]);

	if (!initialIngredients || initialIngredients.length === 0) {
		return (
			<div className="py-6 text-center text-sm text-muted-foreground">
				Aucun ingrédient n'a été créé. Créez votre premier ingrédient en cliquant sur le bouton ci-dessus.
			</div>
		);
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<SortableHeader field="name" currentSort={sort} onSort={handleSort}>
						Nom
					</SortableHeader>
					<SortableHeader field="category" currentSort={sort} onSort={handleSort}>
						Catégorie
					</SortableHeader>
					<SortableHeader field="type" currentSort={sort} onSort={handleSort}>
						Type
					</SortableHeader>
					<TableHead className="w-[100px]">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{ingredients.map((ingredient) => (
					<TableRow key={ingredient.id}>
						<TableCell>{ingredient.name}</TableCell>
						<TableCell>{categories.find((cat) => cat.id === ingredient.category_id)?.name ?? " - "}</TableCell>
						<TableCell>{ingredient.website_id === null ? "Global" : "Personnalisé"}</TableCell>
						<TableCell className="flex items-center gap-2">
							<Dialog>
								<DialogTrigger asChild>
									<Button size="icon" variant="ghost" className="h-8 w-8" title="Modifier">
										<Pencil className="h-4 w-4" />
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>Modifier l'ingrédient</DialogHeader>
									<EditIngredientForm ingredient={ingredient} />
								</DialogContent>
							</Dialog>

							{ingredient.website_id !== null && <DeleteButton id={ingredient.id} />}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

function DeleteButton({ id }: { id: number }) {
	const { execute, status } = useServerAction(deleteIngridientAction);

	return (
		<Button
			onClick={() => execute({ id })}
			size="icon"
			variant="ghost"
			className="h-8 w-8"
			title="Supprimer"
			disabled={status === "pending"}
		>
			{status === "pending" ? <LoaderIcon className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
		</Button>
	);
}
