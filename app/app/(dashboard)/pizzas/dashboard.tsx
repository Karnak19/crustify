import Image from "next/image";
import { PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyPizzas } from "@/lib/supabase/get-pizzas";
import { getImageUrl } from "@/lib/supabase/get-image-url";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePizzaForm } from "./create-pizza-form";
import { cn } from "@/lib/utils";
import Dropdown from "./dropdown";

export async function Dashboard() {
  const pizzas = await getMyPizzas();

  const status = (status: string) => {
    switch (status) {
      case "draft":
        return "Brouillon";
      case "published":
        return "Publiée";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <div className="flex items-center">
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
      <Card>
        <CardHeader>
          <CardTitle>Pizzas</CardTitle>
          <CardDescription>
            Gérez vos pizzas ici. Vous pouvez créer, modifier et supprimer des
            pizzas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Base</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pizzas?.map((pizza) => {
                return (
                  <TableRow key={pizza.id}>
                    <TableCell className="hidden sm:table-cell">
                      {pizza.picture && (
                        <Image
                          alt={pizza.name}
                          className="aspect-square rounded-md object-cover"
                          src={getImageUrl({ path: pizza.picture })}
                          height="100"
                          width="100"
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-base flex flex-col">
                      {pizza.name}
                      <p className="text-xs font-light mt-2">
                        {pizza.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn({
                          "bg-yellow-100 text-yellow-800":
                            pizza.status === "draft",
                          "bg-green-100 text-green-800":
                            pizza.status === "published",
                        })}
                      >
                        {status(pizza.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {pizza.price.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </TableCell>
                    <TableCell>{pizza.base}</TableCell>
                    <TableCell>
                      <Dropdown {...pizza} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
