"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchCheckIcon } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { createWebsiteAction } from "./actions";

export function Setup() {
  const [name, setName] = useState("");
  const [subdomain, setSubdomain] = useState("");

  const { execute } = useServerAction(createWebsiteAction, {
    onSuccess: () => {
      toast.success("Site web créé avec succès");
    },
  });

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute({ name, subdomain });
  };

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
          <form onSubmit={handleSubmit} className="grid gap-4">
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
