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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/supabase/types";
import { publishPizza, unpublishPizza, deletePizza } from "./actions";
import { EditPizzaForm } from "./edit-pizza-form";
import { useState } from "react";

type PizzaDropdownProps = Pick<
  Database["public"]["Tables"]["pizzas"]["Row"],
  "id" | "status" | "name" | "description" | "price" | "base" | "picture"
>;

export default function Dropdown(props: PizzaDropdownProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

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
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Éditer
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Modifier la pizza</DialogHeader>
            <EditPizzaForm pizza={props} />
          </DialogContent>
        </Dialog>
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-600 focus:text-red-600"
            >
              Supprimer
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Supprimer la pizza</DialogHeader>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette pizza ? Cette action est irréversible.
            </DialogDescription>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  const form = new FormData();
                  form.append("id", props.id.toString());
                  deletePizza(form);
                  setDeleteDialogOpen(false);
                }}
              >
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
