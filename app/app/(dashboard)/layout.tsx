import type React from "react";
import Link from "next/link";
import {
  Package2,
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  PanelLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";

import Aside from "./aside";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UserMenu from "./user-menu";
import { env } from "@/env";

export const metadata = {
  title: "Dashboard | Crustify",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  const { data: website } = await supabase
    .from("websites")
    .select("name, subdomain, user_id:profiles (plan)")
    .eq("user_id", data.user?.id)
    .single();

  const avatarUrl = `https://api.dicebear.com/8.x/notionists-neutral/svg?seed=${
    data.user.email || "anonymous"
  }`;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Aside
        url={`${process.env.NODE_ENV === "development" ? "http" : "https"}://${
          website?.subdomain
        }.${env.NEXT_PUBLIC_ROOT_DOMAIN}`}
      />
      <div className="flex flex-col sm:gap-4 sm:py-4 md:gap-8 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div>
            <h1 className="text-lg font-medium">
              {website?.name || "Acme Inc"}
            </h1>
          </div>
          <div className="relative ml-auto flex-1 md:grow-0" />
          <UserMenu
            avatarUrl={avatarUrl}
            email={data.user.email}
            plan={website?.user_id?.plan}
          />
        </header>
        {children}
      </div>
    </div>
  );
}
