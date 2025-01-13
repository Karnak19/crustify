"use client";

import { useState, useMemo } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteIngridient } from "./actions";
import { EditIngredientForm } from "./edit-ingredient-form";

import type { Database } from "@/lib/supabase/types";

type SortDirection = "asc" | "desc" | null;
type FullIngredient = Database["public"]["Tables"]["ingredients"]["Row"] & {
  categories?: {
    id: number;
    name: string;
  } | null;
};
type Ingredient = Omit<FullIngredient, 'created_at'>;

export function IngredientsTable({ ingredients: initialIngredients }: { ingredients: Ingredient[] }) {
  console.log("🚀 IngredientsTable initialIngredients:", initialIngredients);
  
  const [sort, setSort] = useState<{
    direction: SortDirection;
  }>({
    direction: null,
  });

  const ingredients = useMemo(() => {
    if (!sort.direction) return initialIngredients;

    return [...initialIngredients].sort((a, b) => {
      if (sort.direction === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
  }, [initialIngredients, sort.direction]);

  if (!initialIngredients || initialIngredients.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-muted-foreground">
        Aucun ingredient n'a été créé. Créez votre premièr ingredient en cliquant sur le bouton ci-dessus.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ingredients.map((ingredient) => (
          <TableRow key={ingredient.id}>
            <TableCell>{ingredient.name}</TableCell>
            <TableCell>
              {ingredient.categories?.name || '-'}
            </TableCell>
            <TableCell>
              {ingredient.website_id === null ? "Global" : "Personnalisé"}
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    title="Modifier"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>Modifier l'ingrédient</DialogHeader>
                  <EditIngredientForm ingredient={ingredient} />
                </DialogContent>
              </Dialog>

              {ingredient.website_id !== null && (
                <form action={deleteIngridient}>
                  <input type="hidden" name="id" value={ingredient.id} />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
