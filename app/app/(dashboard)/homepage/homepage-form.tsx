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
import { Textarea } from "@/components/ui/textarea";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { updateHomepage } from "./actions";

type HomepageData = {
  description: string;
  menuButtonText: string;
  contactButtonText: string;
};

interface HomepageFormProps {
  initialData: HomepageData;
}

export function HomepageForm({ initialData }: HomepageFormProps) {
  const { execute: updateData, isPending } = useServerAction(updateHomepage);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const [, error] = await updateData({
      description: formData.get("description") as string,
      menuButtonText: formData.get("menuButtonText") as string,
      contactButtonText: formData.get("contactButtonText") as string,
    });

    if (error) {
      toast.error(error.data || "Une erreur est survenue");
      return;
    }

    toast.success("Page d'accueil mise à jour avec succès");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page d&apos;accueil</CardTitle>
        <CardDescription>
          Personnalisez les textes de votre page d&apos;accueil
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={initialData.description}
              placeholder="Description de votre pizzeria..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="menuButtonText">Texte du bouton menu</Label>
            <Input
              id="menuButtonText"
              name="menuButtonText"
              defaultValue={initialData.menuButtonText}
              placeholder="Ex: Voir notre carte"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactButtonText">Texte du bouton contact</Label>
            <Input
              id="contactButtonText"
              name="contactButtonText"
              defaultValue={initialData.contactButtonText}
              placeholder="Ex: Nous contacter"
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
