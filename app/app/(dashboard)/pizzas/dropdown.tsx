"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { Database } from "@/lib/supabase/types";
import { publishPizza, unpublishPizza } from "./actions";

export default function Dropdown(
  props: Pick<Database["public"]["Tables"]["pizzas"]["Row"], "id" | "status">
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={props.status === "published"}
          onCheckedChange={(checked) => {
            const form = new FormData();
            form.append("id", props.id.toString());

            if (checked) {
              publishPizza(form);
            } else {
              unpublishPizza(form);
            }
          }}
        >
          {props.status === "published" ? "Dépublier" : "Publier"}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
