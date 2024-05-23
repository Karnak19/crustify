"use client";
import { LoaderIcon, PizzaIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createPizza } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function CreatePizzaForm() {
  return (
    <form action={createPizza} className="grid gap-4">
      <div className="grid gap-2">
        <Label>Name:</Label>
        <Input type="text" name="name" />
      </div>
      <div className="grid gap-2">
        <Label>Description:</Label>
        <Textarea name="description" />
      </div>
      <div className="grid gap-2">
        <Label>Prix:</Label>
        <Input type="number" name="price" />
      </div>
      <div>
        <Label>Base</Label>
        <RadioGroup name="base">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tomato" id="tomato" />
            <Label htmlFor="tomato">Tomate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cream" id="cream" />
            <Label htmlFor="cream">Crème</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid gap-2">
        <Label>Photo:</Label>
        <Input type="file" name="picture" />
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
        <PizzaIcon className="h-4 w-4 mr-2" />
      )}
      Créer la pizza
    </Button>
  );
}
