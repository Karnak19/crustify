"use client";

import { useState, useMemo } from "react";
import { ColumnsCategoriesTable, SortableHeadersCategories, type Category } from "./columns-categories-table";
import { DataTable } from "@/features/dashboard/data-table/data-table";

export function CategoriesTable({ categories: initialCategories }: { categories: Category[] }) {
	const [sort] = useState<{
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

	const filters = [
		{
			id: "name",
			width: "w-44",
		},
		{
			id: "website_id",
			width: "w-36",
		},
	];

	if (!initialCategories || initialCategories.length === 0) {
		return (
			<div className="py-6 text-center text-sm text-muted-foreground">
				Aucune catégorie n'a été créée. Créez votre première catégorie en cliquant sur le bouton ci-dessus.
			</div>
		);
	}

	return (
		<>
			<DataTable
				sortableHeaders={SortableHeadersCategories}
				data={categories}
				columns={ColumnsCategoriesTable({ categories })}
				filters={filters}
			/>
		</>
	);
}
