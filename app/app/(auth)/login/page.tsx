"use client";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useServerAction } from "zsa-react";
import { LoaderIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { loginAction } from "./actions";

export default function LoginPage() {
  const router = useRouter();

  const { execute, isSuccess, error } = useServerAction(loginAction);

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should only run on state changes
  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  return (
    <form className="mx-auto grid w-[350px] gap-6" action={execute}>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Connexion</h1>
        <p className="text-muted-foreground">
          Entrez votre email ci-dessous pour vous connecter
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            className={cn({ "ring-2 ring-red-500": !!error })}
            id="email"
            type="email"
            name="email"
            placeholder="m@crustify.fr"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mot de passe</Label>
            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline hover:text-primary-foreground"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <Input
            className={cn({ "ring-2 ring-red-500": !!error })}
            id="password"
            name="password"
            type="password"
            required
          />
          {!!error?.fieldErrors?.password && (
            <p className="text-red-500">
              {error?.fieldErrors?.password?.join(", ")}
            </p>
          )}
          {!!error && !error.fieldErrors && (
            <p className="text-red-500">{error.message}</p>
          )}
        </div>
        <SubmitButton />
      </div>
      <div className="mt-4 text-center text-sm">
        Pas encore de compte ?{" "}
        <Link
          href="/signup"
          className="underline hover:text-primary-foreground"
        >
          S'inscrire
        </Link>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <LoaderIcon className="h-4 w-4 mr-2 animate-spin" /> : null}
      Connexion
    </Button>
  );
}
