import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login } from "./actions";

export default function LoginPage() {
  return (
    <form className="mx-auto grid w-[350px] gap-6" action={login}>
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
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Connexion
        </Button>
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
