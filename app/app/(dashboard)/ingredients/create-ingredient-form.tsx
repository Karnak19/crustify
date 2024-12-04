"use client";
import { ChefHat, LoaderIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useServerAction } from "zsa-react";
import { createIngridientAction } from "./actions";

export function CreateIngredientForm() {

  const { executeFormAction, isSuccess, error } = useServerAction(createIngridientAction);


  return (
    <form action={executeFormAction} className="grid gap-4">
      <div className="grid gap-2">
        <Label>Nom de l'ingredient:</Label>
        <Input type="text" name="name" />
      </div>
      <div className="grid gap-2">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <ChefHat className="h-4 w-4 mr-2" />
      )}
      Créer l'ingredient
    </Button>
  );
}
