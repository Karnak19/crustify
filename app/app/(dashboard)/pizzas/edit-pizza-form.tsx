"use client";

import { LoaderIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Database } from "@/lib/supabase/types";

import { editPizza } from "./actions";

type PizzaEditFields = Pick<
  Database["public"]["Tables"]["pizzas"]["Row"],
  "id" | "name" | "description" | "price" | "base" | "picture"
>;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
      Save Changes
    </Button>
  );
}

export function EditPizzaForm({ pizza }: { pizza: PizzaEditFields }) {
  return (
    <form action={editPizza} className="grid gap-4">
      <input type="hidden" name="id" value={pizza.id} />
      
      <div className="grid gap-2">
        <Label>Name:</Label>
        <Input type="text" name="name" defaultValue={pizza.name} />
      </div>
      
      <div className="grid gap-2">
        <Label>Description:</Label>
        <Textarea name="description" defaultValue={pizza.description || ""} />
      </div>
      
      <div className="grid gap-2">
        <Label>Prix:</Label>
        <Input type="number" name="price" defaultValue={pizza.price} />
      </div>
      
      <div>
        <Label>Base</Label>
        <RadioGroup name="base" defaultValue={pizza.base}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tomato" id="edit-tomato" />
            <Label htmlFor="edit-tomato">Tomate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cream" id="edit-cream" />
            <Label htmlFor="edit-cream">Crème</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="grid gap-2">
        <Label>Photo:</Label>
        <Input type="file" name="picture" />
        {pizza.picture && (
          <p className="text-sm text-muted-foreground">
            Leave empty to keep current image
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <SubmitButton />
      </div>
    </form>
  );
}
