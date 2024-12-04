"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Database } from "@/lib/supabase/types";


type SortDirection = "asc" | "desc" | null;
type FullIngredient = Database["public"]["Tables"]["ingredients"]["Row"];
type Ingredient = Omit<FullIngredient, 'created_at'| 'website_id'>;

export function IngredientsTable({ ingredients: initialIngredients }: { ingredients: Ingredient[] }) {
  const [sort, setSort] = useState<{
   
    direction: SortDirection;
  }>({
    
    direction: null,
  });

 

  const ingredients = [...initialIngredients].sort(() => {
    if ( !sort.direction) return 0;

    const direction = sort.direction === "asc" ? 1 : -1;

   
  });



  if (ingredients.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-muted-foreground">
        Aucune ingredient n'a été créé. Créez votre premièr ingredient en cliquant sur le bouton ci-dessus.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Nom</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ingredients.map((ingredient) => (
          <TableRow key={ingredient.id}>  
            <TableCell className="font-medium">{ingredient.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
