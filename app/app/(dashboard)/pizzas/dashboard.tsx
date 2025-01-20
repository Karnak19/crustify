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
import { CreatePizzaForm } from "./create-pizza-form";
import { PizzaTable } from "./pizza-table";
import { Suspense } from "react";

export  async function Dashboard() {
  const pizzas = await getMyPizzas();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="ml-auto flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Creér une pizza
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Créer une pizza</DialogHeader>
              <CreatePizzaForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-4">
        <Card className="overflow-auto">
          <CardHeader>
            <CardTitle>Pizzas</CardTitle>
            <CardDescription>
              Gérez vos pizzas ici. Vous pouvez créer, modifier et supprimer des
              pizzas.
            </CardDescription>
          </CardHeader>
          <CardContent>
           
            <Suspense fallback={<div>Loading...</div>}>
              <PizzaTable pizzas={pizzas ?? []} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
