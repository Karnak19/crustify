"use client";

import type { Database } from "@/lib/supabase/types";

import { ColumnsIngredientsTable, SortableHeadersIngredients } from "./columns-ingredient-table";
import { DataTable } from "@/features/dashboard/data-table/data-table";

type FullIngredient = Database["public"]["Tables"]["ingredients"]["Row"];
type Ingredient = Omit<FullIngredient, "created_at">;
type SortableField = "name" | "category" | "type";
type SortDirection = "asc" | "desc" | null;
type Categories = Database["public"]["Tables"]["categories"]["Row"];

export type Item = {
	id: string;
	keyword: string;
	intents: Array<"Informational" | "Navigational" | "Commercial" | "Transactional">;
	volume: number;
	cpc: number;
	traffic: number;
	link: string;
};

export function IngredientsTable2({ ingredients: initialIngredients }: { ingredients: Ingredient[] }) {
	const items: Item[] = [
		{
			id: "1",
			keyword: "react components",
			intents: ["Informational", "Navigational"],
			volume: 2507,
			cpc: 2.5,
			traffic: 88,
			link: "https://www.originui.com",
		},
		{
			id: "2",
			keyword: "buy react templates",
			intents: ["Commercial", "Transactional"],
			volume: 1850,
			cpc: 4.75,
			traffic: 65,
			link: "https://www.originui.com/templates",
		},
		{
			id: "3",
			keyword: "react ui library",
			intents: ["Informational", "Commercial"],
			volume: 3200,
			cpc: 3.25,
			traffic: 112,
			link: "https://www.originui.com/docs",
		},
		{
			id: "4",
			keyword: "tailwind components download",
			intents: ["Transactional"],
			volume: 890,
			cpc: 1.95,
			traffic: 45,
			link: "https://www.originui.com/download",
		},
		{
			id: "5",
			keyword: "react dashboard template free",
			intents: ["Commercial", "Transactional"],
			volume: 4100,
			cpc: 5.5,
			traffic: 156,
			link: "https://www.originui.com/templates/dashboard",
		},
		{
			id: "6",
			keyword: "how to use react components",
			intents: ["Informational"],
			volume: 1200,
			cpc: 1.25,
			traffic: 42,
			link: "https://www.originui.com/tutorials",
		},
		{
			id: "7",
			keyword: "react ui kit premium",
			intents: ["Commercial", "Transactional"],
			volume: 760,
			cpc: 6.8,
			traffic: 28,
			link: "https://www.originui.com/pricing",
		},
		{
			id: "8",
			keyword: "react component documentation",
			intents: ["Informational", "Navigational"],
			volume: 950,
			cpc: 1.8,
			traffic: 35,
			link: "https://www.originui.com/docs/components",
		},
	];

	return (
		<div>
			ingredients table 2{/* <pre>{JSON.stringify(initialIngredients, null, 2)}</pre> */}
			{/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
			<DataTable sortableHeaders={SortableHeadersIngredients} data={items} columns={ColumnsIngredientsTable} />
		</div>
	);
}
