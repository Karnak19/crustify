import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getMyPizzas } from "@/lib/supabase/get-pizzas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Suspense } from "react";
import { getIngredients } from "@/lib/supabase/get-ingredients";
import { IngredientsTable } from "./ingredients-table";
import { CreateIngredientForm } from "./create-ingredient-form";
import { createClient } from "@/lib/supabase/server";

export async function Dashboard() {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("Unauthorized");
  }

  const website = await supabase
    .from("websites")
    .select("id")
    .eq("user_id", userData.user.id)
    .single();

  if (!website.data) {
    throw new Error("Website not found");
  }

  const ingredients = await getIngredients(website.data.id);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="ml-auto flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Ajouter un ingredient
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Ajouter un ingredient</DialogHeader>
              <CreateIngredientForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-4">
        <Card className="overflow-auto">
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
            <CardDescription>
              Gérez vos ingredients ici. Vous pouvez créer, modifier et supprimer des
              ingredients.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <IngredientsTable ingredients={ingredients ?? []} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}