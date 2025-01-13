"use client";
import { ChefHat, LoaderIcon, PlusCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useState, useEffect, useRef, FormEvent } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useServerAction } from "zsa-react";
import { editIngridientAction } from "./actions";

type Ingredient = {
  id: number;
  name: string;
  category_id?: number | null;
};

export function EditIngredientForm({ ingredient }: { ingredient: Ingredient }) {
  const { executeFormAction, isSuccess, error, data } = useServerAction(editIngridientAction);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("id", ingredient.id.toString());
    await executeFormAction(formData);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label>Nom de l'ingredient:</Label>
        <Input type="text" name="name" defaultValue={ingredient.name} required />
      </div>
      
      <div className="grid gap-2">
        <Label>Catégorie (optionnel):</Label>
        <Select name="category_id" defaultValue={ingredient.category_id?.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Aucune</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <p className="text-sm text-destructive">
          {error?.message}
        </p>
      )}
      
      <div className="grid gap-2">
        <Button type="submit">
          Mettre à jour l'ingrédient
        </Button>
      </div>
    </form>
  );
}
