"use client";

import { useRef, type FormEvent } from "react";
import { useServerAction } from "zsa-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Tables } from "@/lib/supabase/types";
import { editCategoryAction } from "./actions";

type Category = Tables<"categories">;

export function EditCategoryForm({ category }: { category: Category }) {
	const { executeFormAction, error } = useServerAction(editCategoryAction);
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		formData.append("id", category.id.toString());
		await executeFormAction(formData);
	};

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
			<div className="grid gap-2">
				<Label>Nom de la catégorie:</Label>
				<Input type="text" name="name" defaultValue={category.name} required />
			</div>

			{error && <p className="text-sm text-destructive">{error?.message}</p>}

			<div className="grid gap-2">
				<Button type="submit">Mettre à jour la catégorie</Button>
			</div>
		</form>
	);
}
