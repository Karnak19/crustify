import type React from "react";
import Link from "next/link";
import { PanelLeft, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/server";
import { env } from "@/env";

import Aside from "./aside";
import { redirect } from "next/navigation";
import UserMenu from "./user-menu";
import { nav } from "./nav";
import { getSubscription } from "@/lib/supabase/queries";

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

  const subscription = await getSubscription(supabase);
  const { data: website } = await supabase
    .from("websites")
    .select("name, subdomain, user_id:profiles (plan)")
    .eq("user_id", data.user?.id)
    .single();

  const avatarUrl = `https://api.dicebear.com/8.x/notionists-neutral/svg?seed=${
    data.user.email || "anonymous"
  }`;

  const url = `${process.env.NODE_ENV === "development" ? "http" : "https"}://${
    website?.subdomain
  }.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Aside url={url} />
      <div className="flex flex-col sm:gap-4 sm:pb-4 md:gap-8 sm:pl-14">
        <header className="sticky top-0 z-20 sm:py-4 flex h-14 md:shadow items-center gap-4 border-b bg-card px-4 sm:h-auto sm:border-0 sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                {nav.map((item) => (
                  <Link
                    key={item.title}
                    href={item.path}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
                <a
                  // biome-ignore lint/a11y/noBlankTarget: <explanation>
                  target="_blank"
                  href={url}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>Voir le site</span>
                </a>
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
            subscription={!!subscription}
          />
        </header>
        {children}
      </div>
    </div>
  );
}
