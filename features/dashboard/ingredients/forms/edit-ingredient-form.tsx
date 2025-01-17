"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ToastText } from "@/features/dashboard/toasts/text-toast";
import { LoaderIcon } from "lucide-react";

import { useServerAction } from "zsa-react";
import { editIngridientAction } from "../../../../app/app/(dashboard)/ingredients/actions";
import type { Tables } from "@/lib/supabase/types";
import { useState } from "react";

type Ingredient = {
	id: number;
	name: string;
	website_id: number | null;
	categories: { id: number; name: string } | null;
};

interface EditIngredientFormProps {
	ingredient: Ingredient;
	categories: Tables<"categories">[];
}

export function EditIngredientForm({ ingredient, categories }: EditIngredientFormProps) {
	const { executeFormAction, error, isPending } = useServerAction(editIngridientAction, {
		onSuccess: () => {
			toast(ToastText.success.ingredient.update);
		},
	});
	const [categoryValue, setCategoryValue] = useState<string>(ingredient.categories?.id.toString() || "none");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const formData = new FormData(e.currentTarget);
			formData.append("id", ingredient.id.toString());

			const newCategoryId = categoryValue;
			if (newCategoryId !== (ingredient.categories?.id.toString() || "none")) {
				if (newCategoryId !== "none") {
					formData.append("category_id", newCategoryId);
				}
			}

			await executeFormAction(formData);
		} catch (error) {
			console.error("Error updating ingredient:", error);
			toast({
				variant: "destructive",
				...ToastText.error.ingredient.update,
			});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="grid gap-4">
			<div className="grid gap-2">
				<Label>Nom de l'ingredient:</Label>
				<Input type="text" name="name" defaultValue={ingredient.name} required />
			</div>

			<div className="grid gap-2">
				<Label>Catégorie (optionnel):</Label>
				<Select value={categoryValue} onValueChange={setCategoryValue}>
					<SelectTrigger>
						<SelectValue placeholder="Sélectionnez une catégorie">
							{categoryValue === "none" ? "Aucune catégorie" : categories.find((c) => c.id.toString() === categoryValue)?.name}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="none">Aucune catégorie</SelectItem>
						{categories.map((category) => (
							<SelectItem key={category.id} value={category.id.toString()}>
								{category.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{error && <p className="text-sm text-destructive">{error?.message}</p>}

			<div className="grid gap-2">
				<Button type="submit" disabled={isPending}>
					{isPending ? (
						<>
							<span className="mr-2">Mise à jour...</span>
							<LoaderIcon className="h-4 w-4 animate-spin" />
						</>
					) : (
						"Mettre à jour l'ingrédient"
					)}
				</Button>
			</div>
		</form>
	);
}
