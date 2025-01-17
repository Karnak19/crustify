"use client";
import type React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tab {
	value: string;
	label: string;
	content: React.ReactNode;
}

interface TabsProps {
	tabs: Tab[];
	defaultValue?: string;
}

export default function TabsComponent({ tabs, defaultValue }: TabsProps) {
	return (
		<Tabs defaultValue={defaultValue || tabs[0]?.value}>
			<TabsList className="justify-start relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border">
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className="overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
					>
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>
			{tabs.map((tab) => (
				<TabsContent key={tab.value} value={tab.value}>
					{tab.content}
				</TabsContent>
			))}
		</Tabs>
	);
}
