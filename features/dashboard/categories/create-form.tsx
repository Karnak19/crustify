"use client";

import type React from "react";
import { useRef, useState } from "react";
import { useServerAction } from "zsa-react";
import { LoaderIcon, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastText } from "@/lib/toasts/text-toast";
import { toast } from "@/hooks/use-toast";
import type { Tables } from "@/lib/supabase/types";
import { createCategoryAction } from "./actions";

export function CreateCategoryForm({ categories }: { categories: Tables<"categories">[] }) {
	const formRef = useRef<HTMLFormElement>(null);
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);

	const { executeFormAction, isPending } = useServerAction(createCategoryAction, {
		onSuccess: () => {
			toast(ToastText.success.category.create);
			formRef.current?.reset();
			setName("");
			setError(null);
		},
		onError: () => {
			toast({
				variant: "destructive",
				...ToastText.error.category.create,
			});
		},
	});

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setName(value);

		// Check for duplicate category name
		const isDuplicate = categories.some((category) => category.name.toLowerCase() === value.toLowerCase());

		if (isDuplicate) {
			setError("Cette catégorie existe déjà");
		} else {
			setError(null);
		}
	};

	return (
		<div>
			<form ref={formRef} action={executeFormAction} className="grid gap-4">
				<div className="grid gap-2">
					<Label>Nom de la catégorie:</Label>
					<Input type="text" name="name" value={name} onChange={handleNameChange} required />
					{error && <p className="text-sm text-destructive">{error}</p>}
				</div>
				<div>
					<Button type="submit" disabled={isPending || !!error}>
						{isPending ? <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
						Ajouter
					</Button>
				</div>
			</form>
		</div>
	);
}
