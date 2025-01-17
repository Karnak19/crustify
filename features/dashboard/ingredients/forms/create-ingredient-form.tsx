"use client";
import { LoaderIcon, PlusCircle } from "lucide-react";
import { useRef, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ToastText } from "@/features/dashboard/toasts/text-toast";

import { useServerAction } from "zsa-react";
import { createIngridientAction } from "@/app/app/(dashboard)/ingredients/actions";
import type { Tables } from "@/lib/supabase/types";
import { Combobox } from "@/components/ui/combobox";
import { createCategoryAction } from "@/app/app/(dashboard)/categories-ingredients/actions";

export function CreateIngredientForm({ categories }: { categories: Tables<"categories">[] }) {
	const [inputValue, setInputValue] = useState("");
	const formRef = useRef<HTMLFormElement>(null);

	const { executeFormAction, isPending } = useServerAction(createIngridientAction, {
		onSuccess: () => {
			formRef.current?.reset();
			toast(ToastText.success.ingredient.create);
		},
		onError: () => {
			toast({
				variant: "destructive",
				...ToastText.error.ingredient.create,
			});
		},
	});
	const { execute: createCategory, isPending: isPendingCategory } = useServerAction(createCategoryAction, {
		onSuccess: ({ data }) => {
			toast(ToastText.success.category.create);
			setInputValue(data.category.name);
		},
		onError: () => {
			toast({
				variant: "destructive",
				...ToastText.error.category.create,
			});
		},
	});

	const selectedCategoryId = categories.find((cat) => cat.name === inputValue)?.id;

	return (
		<div>
			<form ref={formRef} action={executeFormAction} className="grid gap-4">
				<div className="grid gap-2">
					<Label>Nom de l'ingredient:</Label>
					<Input type="text" name="name" required />
				</div>

				<div className="grid gap-2">
					<Label>Catégorie (optionnel):</Label>
					<input type="hidden" name="category_id" value={selectedCategoryId || ""} />
					<Combobox
						list={categories.map((category) => category.name)}
						inputValue={inputValue}
						onInputValueChange={setInputValue}
						empty={
							<div className="flex items-center gap-2 flex-col">
								La catégorie {} n'a pas ete trouvée
								<Button
									type="button"
									onClick={async () => {
										const formData = new FormData();
										formData.append("name", inputValue);
										await createCategory(formData);
									}}
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
