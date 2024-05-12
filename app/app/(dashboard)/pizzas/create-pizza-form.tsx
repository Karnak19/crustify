import { Label } from "@/components/ui/label";
import { createPizza } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PizzaIcon } from "lucide-react";

export async function CreatePizzaForm() {
  return (
    <form action={createPizza} className="grid gap-4">
      <div className="grid gap-2">
        <Label>Name:</Label>
        <Input type="text" name="name" />
      </div>
      <div className="grid gap-2">
        <Label>Description:</Label>
        <Input type="text" name="description" />
      </div>
      <div className="grid gap-2">
        <Label>Price:</Label>
        <Input type="number" name="price" />
      </div>
      <div className="grid gap-2">
        <Label>Image:</Label>
        <Input type="file" name="picture" />
      </div>

      <div className="grid gap-2">
        <Button type="submit">
          <PizzaIcon className="h-4 w-4 mr-2" />
          Create Pizza
        </Button>
      </div>
    </form>
  );
}
