"use client";
import { LoaderIcon, PlusCircle } from "lucide-react";
import { useRef, FormEvent } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useServerAction } from "zsa-react";
import { createIngridientAction } from "./actions";
import { CategoryIngredientForm } from "../categories-ingredients/category-ingredient-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Tables } from "@/lib/supabase/types";
import { Combo } from "next/font/google";
import { ComboboxDemo } from "@/components/ui/combobox";

export function CreateIngredientForm({ categories }: { categories: Tables<"categories">[] }) {
	const { executeFormAction, isSuccess, error, data, isPending } = useServerAction(createIngridientAction);

	return (
		<div>
			<pre>{JSON.stringify({ data, error }, null, 2)}</pre>
			<form action={executeFormAction} className="grid gap-4">
				<div className="grid gap-2">
					<Label>Nom de l'ingredient:</Label>
					<Input type="text" name="name" required />
				</div>

				<div className="grid gap-2">
					<Label>Catégorie (optionnel):</Label>
					<ComboboxDemo categories={categories} />
					{/* <Select name="category_id">
						<SelectTrigger>
							<SelectValue placeholder="Sélectionnez une catégorie" />
						</SelectTrigger>
						<SelectContent>
							{categories.map((category) => (
								<SelectItem key={category.id} value={category.id.toString()}>
									{category.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select> */}
				</div>
				<div>
					<Button type="submit">
						{isPending ? <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
						Ajouter
					</Button>
				</div>
			</form>
		</div>
	);
}
