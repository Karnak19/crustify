"use client";
import { LoaderIcon, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useServerAction } from "zsa-react";
import { createIngridientAction } from "./actions";
import type { Tables } from "@/lib/supabase/types";
import { Combobox } from "@/components/ui/combobox";
import { createCategoryAction } from "../categories-ingredients/actions";

export function CreateIngredientForm({ categories }: { categories: Tables<"categories">[] }) {
	const { executeFormAction, isSuccess, error, data, isPending } = useServerAction(createIngridientAction);
	const { execute: createCategory, isPending: isPendingCategory, data: newCategory } = useServerAction(createCategoryAction);
	const[inputValue, setInputValue] = useState("");
	
	// Find the category ID based on the selected name
	const selectedCategoryId = categories.find(cat => cat.name === inputValue)?.id;

	const handleCreateCategory = async (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent form submission
		const formData = new FormData();
		formData.append('name', inputValue);
		await createCategory(formData);
	};

	useEffect(() => {
		if (newCategory && newCategory.category) {
			setInputValue(newCategory.category.name);
		}
	}, [newCategory]);

	return (
		<div>
			{/* <pre>{JSON.stringify({ data, error }, null, 2)}</pre> */}
			<form action={executeFormAction} className="grid gap-4">
				<div className="grid gap-2">
					<Label>Nom de l'ingredient:</Label>
					<Input type="text" name="name" required />
				</div>

				<div className="grid gap-2">
					<Label>Catégorie (optionnel):</Label>
					<input type="hidden" name="category_id" value={selectedCategoryId || ''} />
					<p>Current Input Value: {inputValue}</p>
					<Combobox
						list={categories.map((category) => category.name)}
            inputValue={inputValue}
            onInputValueChange={setInputValue}
						empty={
							<div className="flex items-center gap-2 flex-col">
								La catégorie {} n'a pas ete trouvée
								<Button
									onClick={handleCreateCategory}
								>
									{isPendingCategory ? (
										<LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
									) : (
										<PlusCircle className="mr-2 h-4 w-4" />
									)}
									Ajouter
								</Button>
							</div>
						}
					/>
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
