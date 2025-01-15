"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, LoaderIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { deleteCategoryAction } from "./actions";
import { EditCategoryForm } from "./edit-category-form";
import { useServerAction } from "zsa-react";
import type { Tables } from "@/lib/supabase/types";

type Category = Tables<"categories">;

export function CategoriesTable({ categories: initialCategories }: { categories: Category[] }) {
	const { executeFormAction: executeDelete } = useServerAction(deleteCategoryAction);
	const [deletingId, setDeletingId] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	const [sort, setSort] = useState<{
		direction: "asc" | "desc" | null;
	}>({
		direction: null,
	});

	const categories = useMemo(() => {
		if (!sort.direction) return initialCategories;

		return [...initialCategories].sort((a, b) => {
			if (sort.direction === "asc") {
				return a.name.localeCompare(b.name);
			}
			return b.name.localeCompare(a.name);
		});
	}, [initialCategories, sort.direction]);

	const handleDelete = async (id: number) => {
		setDeletingId(id);
		setError(null);
		try {
			console.log("Starting delete for category:", id);
			const formData = new FormData();
			formData.append("id", id.toString());
			const result = await executeDelete(formData);
			console.log("Delete result:", result);
		} catch (err) {
			console.error("Delete failed:", err);
			setError(err instanceof Error ? err.message : "Une erreur est survenue");
		} finally {
			setDeletingId(null);
		}
	};

	if (!initialCategories || initialCategories.length === 0) {
		return (
			<div className="py-6 text-center text-sm text-muted-foreground">
				Aucune catégorie n'a été créée. Créez votre première catégorie en cliquant sur le bouton ci-dessus.
			</div>
		);
	}

	return (
		<>
			{error && (
				<div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
					{error}
				</div>
			)}
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nom</TableHead>
						<TableHead>Type</TableHead>
						<TableHead className="w-[100px]">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{categories.map((category) => (
						<TableRow key={category.id}>
							<TableCell>{category.name}</TableCell>
							<TableCell>{category.website_id === null ? "Global" : "Personnalisé"}</TableCell>
							<TableCell className="flex items-center gap-2">
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

								{category.website_id !== null && (
									<Button
										onClick={() => handleDelete(category.id)}
										size="icon"
										variant="ghost"
										className="h-8 w-8"
										title="Supprimer"
										disabled={deletingId === category.id}
									>
										{deletingId === category.id ? (
											<LoaderIcon className="h-4 w-4 animate-spin" />
										) : (
											<Trash2 className="h-4 w-4" />
										)}
									</Button>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
