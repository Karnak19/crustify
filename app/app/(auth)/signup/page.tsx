"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { signup } from "../login/actions";
import { useRef } from "react";

export default function SignupPage() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = passwordRef.current?.value;
    const confirmPassword = e.target.value;
    const submitButton = submitButtonRef.current;

    if (password !== confirmPassword) {
      e.target.setCustomValidity("Le mot de passe ne correspond pas.");
      if (submitButton) {
        submitButton.disabled = true;
      }
    } else {
      e.target.setCustomValidity("");
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
    e.target.reportValidity();
  };

  return (
    <form className="mx-auto grid w-[350px] gap-6" action={signup}>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Inscription</h1>
        <p className="text-muted-foreground">
          Entrez votre email/mot de passe ci-dessous pour créer un compte
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
          </div>
          <Input
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Confirmer le mot de passe</Label>
          <Input
            ref={confirmPasswordRef}
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            onChange={onConfirmPasswordChange}
          />
        </div>
        <Button ref={submitButtonRef} type="submit" className="w-full">
          S'inscrire
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Déjà un compte ?{" "}
        <Link href="/login" className="underline hover:text-primary-foreground">
          Se connecter
        </Link>
      </div>
    </form>
  );
}
