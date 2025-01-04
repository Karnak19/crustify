import type React from "react";

import { env } from "@/env";
import { createClient } from "@/lib/supabase/server";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getSubscription } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";

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
    <SidebarProvider>
      <AppSidebar website={website} avatarUrl={avatarUrl} url={url} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );

  // return (
  //   <div className="flex min-h-screen w-full flex-col bg-background">
  //     <div className="flex flex-col sm:gap-4 sm:pb-4 md:gap-8 sm:pl-14">
  //       <header className="sticky top-0 z-20 sm:py-4 flex h-14 md:shadow items-center gap-4 border-b bg-card px-4 sm:h-auto sm:border-0 sm:px-6">
  //         <div>
  //           <h1 className="text-lg font-medium">
  //             {website?.name || "Acme Inc"}
  //           </h1>
  //         </div>
  //         <div className="relative ml-auto flex-1 md:grow-0" />
  //         <UserMenu
  //           avatarUrl={avatarUrl}
  //           email={data.user.email}
  //           subscription={!!subscription}
  //         />
  //       </header>
  //       {children}
  //     </div>
  //   </div>
  // );
}
