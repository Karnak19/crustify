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
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { updateHomepage } from "../actions";
import { Preview } from "./preview";

type HomepageData = {
  description: string;
  menuButtonText: string;
  contactButtonText: string;
};

interface HomepageFormProps {
  initialData: HomepageData;
}

export function HomepageForm({ initialData }: HomepageFormProps) {
  const [formData, setFormData] = useState<HomepageData>(initialData);
  const { execute: updateData, isPending } = useServerAction(updateHomepage);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [, error] = await updateData(formData);

    if (error) {
      toast.error(error.data || "Une erreur est survenue");
      return;
    }

    toast.success("Page d'accueil mise à jour avec succès");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
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
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Description de votre pizzeria..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="menuButtonText">Texte du bouton menu</Label>
              <Input
                id="menuButtonText"
                name="menuButtonText"
                value={formData.menuButtonText}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    menuButtonText: e.target.value,
                  }))
                }
                placeholder="Ex: Voir notre carte"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactButtonText">Texte du bouton contact</Label>
              <Input
                id="contactButtonText"
                name="contactButtonText"
                value={formData.contactButtonText}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    contactButtonText: e.target.value,
                  }))
                }
                placeholder="Ex: Nous contacter"
              />
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Aperçu</h2>
        <Preview {...formData} />
      </div>
    </div>
  );
}
