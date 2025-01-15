"use client";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export type Item = {
	id: string;
	keyword: string;
	intents: Array<"Informational" | "Navigational" | "Commercial" | "Transactional">;
	volume: number;
	cpc: number;
	traffic: number;
	link: string;
};

export const SortableHeadersIngredients = [
	{ id: "traffic", desc: false },
	{ id: "volume", desc: false },
];

export const ColumnsIngredientsTable: ColumnDef<Item>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
		),
	},
	{
		header: "Keyword",
		accessorKey: "keyword",
		cell: ({ row }) => <div className="font-medium">{row.getValue("keyword")}</div>,
	},
	{
		header: "Intents",
		accessorKey: "intents",
		cell: ({ row }) => {
			const intents = row.getValue("intents") as string[];
			return (
				<div className="flex gap-1">
					{intents.map((intent) => {
						const styles = {
							Informational: "bg-indigo-400/20 text-indigo-500",
							Navigational: "bg-emerald-400/20 text-emerald-500",
							Commercial: "bg-amber-400/20 text-amber-500",
							Transactional: "bg-rose-400/20 text-rose-500",
						}[intent];

						return (
							<div key={intent} className={cn("flex size-5 items-center justify-center rounded text-xs font-medium", styles)}>
								{intent.charAt(0)}
							</div>
						);
					})}
				</div>
			);
		},
		enableSorting: false,
		meta: {
			filterVariant: "select",
		},
		filterFn: (row, id, filterValue) => {
			const rowValue = row.getValue(id);
			return Array.isArray(rowValue) && rowValue.includes(filterValue);
		},
	},
	{
		header: "Volume",
		accessorKey: "volume",
		cell: ({ row }) => {
			const volume = Number.parseInt(row.getValue("volume"));
			return new Intl.NumberFormat("en-US", {
				notation: "compact",
				maximumFractionDigits: 1,
			}).format(volume);
		},
		meta: {
			filterVariant: "range",
		},
	},
	{
		header: "CPC",
		accessorKey: "cpc",
		cell: ({ row }) => <div>${row.getValue("cpc")}</div>,
		meta: {
			filterVariant: "range",
		},
	},
	{
		header: "Traffic",
		accessorKey: "traffic",
		cell: ({ row }) => {
			const traffic = Number.parseInt(row.getValue("traffic"));
			return new Intl.NumberFormat("en-US", {
				notation: "compact",
				maximumFractionDigits: 1,
			}).format(traffic);
		},
		meta: {
			filterVariant: "range",
		},
	},
	{
		header: "Link",
		accessorKey: "link",
		cell: ({ row }) => (
			<a className="inline-flex items-center gap-1 hover:underline" href={row.getValue("link")} target="_blank" rel="noreferrer">
				{row.getValue("link")} <ExternalLink size={12} strokeWidth={2} aria-hidden="true" />
			</a>
		),
		enableSorting: false,
	},
];
