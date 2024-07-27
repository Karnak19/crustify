"use client";

import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Building, LoaderIcon, Phone } from "lucide-react";
import { useServerAction } from "zsa-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { addContactAction } from "./actions";
import { cn } from "@/lib/utils";

type AddContactFormProps = {
  websiteId: number;
  phone: string;
  address: string;
  zip: string;
  city: string;
};

export function AddContactForm(props: AddContactFormProps) {
  const router = useRouter();
  const { execute, isSuccess, error } = useServerAction(addContactAction);

  // biome-ignore lint/correctness/useExhaustiveDependencies: no need to run this effect on router changes
  useEffect(() => {
    if (isSuccess) {
      router.refresh();
    }
  }, [isSuccess]);

  return (
    <form
      className={cn("grid gap-4", { "ring-2 ring-red-500": !!error })}
      action={execute}
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor="phone" className="inline-flex items-center">
          <Phone className="size-3 mr-1" />
          Téléphone :
        </Label>
        <small className="text-xs italic text-muted-foreground">
          Format: +33612345678 ou 0612345678
        </small>
        <Input
          defaultValue={props.phone}
          type="tel"
          pattern="^(\+33|0)(6|7|9)\d{8}$"
          name="phone"
          required
          placeholder="+336"
        />
      </div>
      {/* Rue */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="address" className="inline-flex items-center">
          <Building className="size-3 mr-1" />
          Adresse :
        </Label>
        <Input
          defaultValue={props.address}
          type="text"
          name="address"
          required
          placeholder="17 rue de la pizza"
        />
      </div>
      {/* Code postal */}
      <div className="grid grid-cols-[1fr,2fr] gap-1">
        <div className="flex flex-col gap-1">
          <Label htmlFor="zip">Code postal :</Label>
          <Input defaultValue={props.zip} type="text" name="zip" required />
        </div>
        {/* Ville */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="city">Ville :</Label>
          <Input defaultValue={props.city} type="text" name="city" required />
        </div>
      </div>
      <input type="hidden" name="websiteId" value={props.websiteId} />
      <SubmitButton />
      {error?.message ? (
        <p className="text-red-500 text-sm">{error.message}</p>
      ) : null}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <LoaderIcon className="h-4 w-4 mr-2 animate-spin" /> : null}
      Mettre à jour
    </Button>
  );
}
