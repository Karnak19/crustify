"use client";

import { useServerAction } from "zsa-react";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToastText } from "@/lib/toasts/text-toast";
import type { Tables } from "@/lib/supabase/types";
import { editIngridientAction } from "./actions";

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
			toast.success(...ToastText.success.ingredient.update);
		},
		onError: () => {
			toast.error(...ToastText.error.ingredient.update);
		},
	});

	return (
		<form action={executeFormAction} className="grid gap-4">
			<input type="hidden" name="id" value={ingredient.id} />
			<div className="grid gap-2">
				<Label>Nom de l'ingredient:</Label>
				<Input type="text" name="name" defaultValue={ingredient.name} required />
			</div>

			<div className="grid gap-2">
				<Label>Catégorie (optionnel):</Label>
				<Select name="category_id" defaultValue={ingredient.categories?.id.toString() || "none"}>
					<SelectTrigger>
						<SelectValue placeholder="Sélectionnez une catégorie" />
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
