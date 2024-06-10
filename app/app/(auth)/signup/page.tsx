"use client";

import type { ChangeEvent, RefObject } from "react";
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import { useServerAction } from "zsa-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { signUpAction } from "../login/actions";

export default function SignupPage() {
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const { execute, isSuccess } = useServerAction(signUpAction);

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should only run on state changes
  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  const onConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <form className="mx-auto grid w-[350px] gap-6" action={execute}>
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
        <SubmitButton buttonRef={submitButtonRef} />
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

function SubmitButton({
  buttonRef,
}: {
  buttonRef: RefObject<HTMLButtonElement>;
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} ref={buttonRef}>
      {pending ? <LoaderIcon className="h-4 w-4 mr-2 animate-spin" /> : null}
      S'inscrire
    </Button>
  );
}
