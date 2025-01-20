"use client";

import Image from "next/image";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPublicUrl } from "@/lib/supabase/get-public-url";
import { cn } from "@/lib/utils";
import Dropdown from "./dropdown";
import { SortableHeader } from "./sortable-header";
import type { Database } from "@/lib/supabase/types";

type FullPizza = Database["public"]["Tables"]["pizzas"]["Row"];
type Pizza = Omit<FullPizza, 'created_at' | 'website_id'>;
type SortableField = "price" | "status" | "base";
type SortDirection = "asc" | "desc" | null;



export function PizzaTable({ pizzas: initialPizzas }: { pizzas: Pizza[] }) {
  const [sort, setSort] = useState<{
    field: SortableField | null;
    direction: SortDirection;
  }>({
    field: null,
    direction: null,
  });

  const handleSort = (field: SortableField) => {
    setSort((prev) => {
      // If clicking the same field and direction is desc, clear the sort
      if (prev.field === field && prev.direction === "desc") {
        return {
          field: null,
          direction: null,
        };
      }
      // If clicking the same field, toggle direction asc -> desc
      if (prev.field === field) {
        return {
          field,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      // If clicking a new field, start with asc
      return {
        field,
        direction: "asc",
      };
    });
  };

  const pizzas = [...initialPizzas].sort((a, b) => {
    if (!sort.field || !sort.direction) return 0;

    const direction = sort.direction === "asc" ? 1 : -1;

    switch (sort.field) {
      case "price":
        return (a.price - b.price) * direction;
      case "status":
        return a.status.localeCompare(b.status) * direction;
      case "base":
        return a.base.localeCompare(b.base) * direction;
      default:
        return 0;
    }
  });

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

  const base = (base: string) => {
    switch (base) {
      case "tomato":
        return "Tomate";
      case "cream":
        return "Crème";
      default:
        return "Unknown";
    }
  };

  if (pizzas.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-muted-foreground">
        Aucune pizza n'a été créée. Créez votre première pizza en cliquant sur le bouton ci-dessus.
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
          <SortableHeader
            field="status"
            currentSort={sort}
            onSort={handleSort}
          >
            Statut
          </SortableHeader>
          <SortableHeader
            field="price"
            currentSort={sort}
            onSort={handleSort}
          >
            Prix
          </SortableHeader>
          <SortableHeader
            field="base"
            currentSort={sort}
            onSort={handleSort}
          >
            Base
          </SortableHeader>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pizzas.map((pizza) => (
          <TableRow key={pizza.id}>
            <TableCell className="hidden sm:table-cell">
              {pizza.picture && (
                <div className="relative h-12 w-12 overflow-hidden rounded">
                  <Image
                    src={getPublicUrl(pizza.picture)}
                    alt={pizza.name}
                    className="object-cover"
                    fill
                    sizes="48px"
                  />
                </div>
              )}
            </TableCell>
            <TableCell className="font-medium">{pizza.name}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={cn(
                  pizza.status === "published" &&
                    "border-green-700 bg-green-50 text-green-700",
                  pizza.status === "draft" &&
                    "border-orange-700 bg-orange-50 text-orange-700"
                )}
              >
                {status(pizza.status)}
              </Badge>
            </TableCell>
            <TableCell>{pizza.price}€</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={cn(
                  pizza.base === "tomato" &&
                    "border-red-700 bg-red-50 text-red-700",
                  pizza.base === "cream" &&
                    "border-yellow-700 bg-yellow-50 text-yellow-700"
                )}
              >
                {base(pizza.base)}
              </Badge>
            </TableCell>
            <TableCell>
              <Dropdown {...pizza} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
