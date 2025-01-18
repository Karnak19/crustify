"use client";

import { Building, LoaderIcon, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useServerAction } from "zsa-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";
import { addContactAction } from "./actions";

type AddContactFormProps = {
  websiteId: number;
  phone: string;
  street_address: string;
  zip_code: string;
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
        <Label htmlFor="street_address" className="inline-flex items-center">
          <Building className="size-3 mr-1" />
          Adresse :
        </Label>
        <Input
          defaultValue={props.street_address}
          type="text"
          name="street_address"
          required
          placeholder="17 rue de la pizza"
        />
      </div>
      {/* Code postal et ville */}
      <div className="grid grid-cols-[1fr,2fr] gap-1">
        <div className="flex flex-col gap-1">
          <Label htmlFor="zip_code">Code postal :</Label>
          <Input
            defaultValue={props.zip_code}
            type="text"
            name="zip_code"
            required
          />
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
