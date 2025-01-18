"use client";

import { DataTable } from "@/components/data-table";
import type { Tables } from "@/lib/supabase/types";
import { columns, sortableHeaders } from "./columns";

interface CategoriesTableProps {
	categories: Tables<"categories">[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
	const filters = [
		{
			id: "name",
			width: "w-44",
		},
	];

	return <DataTable {...{ sortableHeaders, data: categories, columns, filters }} />;
}
