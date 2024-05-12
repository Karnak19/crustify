import Image from "next/image";
import Link from "next/link";

import PizzaImage from "./pizza.jpg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="w-full h-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <form className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button formAction={login} type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Button variant="link" formAction={signup} className="underline">
              Sign up
            </Button>
          </div>
        </form>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={PizzaImage}
          alt="Image"
          className="inset-0 object-cover"
        />
      </div>
    </div>
  );
}
