"use client";
import type React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";

interface Tab {
	value: string;
	label: string;
	content: React.ReactNode;
	description?: string;
}

interface TabsProps {
	tabs: Tab[];
	defaultValue?: string;
	title: string;
}

export default function TabsComponent({ tabs, defaultValue }: TabsProps) {
	return (
		<Tabs defaultValue={defaultValue || tabs[0]?.value}>
			<CardHeader className="space-y-0">
				<TabsList className="justify-start relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border">
					{tabs.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="overflow-hidden rounded-b-none border-x border-t border-border py-2 [&:not([data-state=active])]:bg-muted [&[data-state=active]]:bg-card data-[state=active]:z-10 data-[state=active]:shadow-none"
						>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
				{tabs.map((tab) => (
					<TabsContent key={tab.value} value={tab.value} className=" border-b border-border border-l border-r  bg-card shadow">
						<CardContent className="pt-6 gap-2 flex flex-col">
							{tab.description && <CardDescription>{tab.description}</CardDescription>}
							{tab.content}
						</CardContent>
					</TabsContent>
				))}
			</CardHeader>
		</Tabs>
	);
}
