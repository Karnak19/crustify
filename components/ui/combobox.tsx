"use client";

import * as React from "react";
import { Check, ChevronsUpDown, LoaderIcon, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Tables } from "@/lib/supabase/types";
import { CommandList, CommandSeparator } from "cmdk";

interface ComboboxProps {
	list?: string[];
	empty: React.ReactNode;
    inputValue?: string;
    placeholder?: string;
    onInputValueChange?: (value: string) => void;
}

export function Combobox({ list = [], empty, inputValue, placeholder, onInputValueChange }: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
					{inputValue
						? list.find((item) => item === inputValue)
						: "Select an item..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full">
				<Command>
					<CommandInput 
						placeholder={placeholder ??  "Rechercher..." }
						value={inputValue} 
						onValueChange={(value) => onInputValueChange?.(value)}
					/>
					<CommandList>
						<CommandEmpty>{empty}</CommandEmpty>
						<CommandGroup>
							{list.map((item) => (
								<CommandItem
									key={item}
									onSelect={() => {
										onInputValueChange?.(item === inputValue ? "" : item);
										setOpen(false);
									}}
								>
									<Check className={cn(" h-4 w-4", inputValue === item ? "opacity-100" : "opacity-0")} />
									{item}
								</CommandItem>
							))}
						</CommandGroup>
						<CommandSeparator />
					</CommandList>
				</Command>
			</PopoverContent>
			<input type="hidden" name="selected_value" value={inputValue} />
		</Popover>
	);
}
