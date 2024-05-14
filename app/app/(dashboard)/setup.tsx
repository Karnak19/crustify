"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createWebsite } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SearchCheckIcon } from "lucide-react";

export function Setup() {
  const [name, setName] = useState("");
  const [subdomain, setSubdomain] = useState("");

  const handleSubdomainChange = (str: string) => {
    setSubdomain(
      str
        .toLowerCase()
        .replace(/[^A-z0-9-]/g, " ")
        .replace(/\s+/g, "-")
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handleSubdomainChange(name);
  }, [name]);

  return (
    <>
      <div />
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Setup</CardTitle>
          <CardDescription>
            Créez votre premier site web en quelques secondes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createWebsite} className="grid gap-4">
            <div className="grid gap-2">
              <Label>Nom:</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Sous-domaine:</Label>
              <div className="flex">
                <Input
                  value={subdomain}
                  onChange={(e) => handleSubdomainChange(e.target.value)}
                  type="text"
                  name="subdomain"
                  className="rounded-r-none"
                  required
                />
                <Input
                  type="text"
                  readOnly
                  disabled
                  value=".crustify.fr"
                  className="rounded-none"
                />
                <div>
                  <Button
                    size="icon"
                    type="button"
                    variant="outline"
                    className="rounded-l-none"
                  >
                    <SearchCheckIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Button type="submit">Créer le site web</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
