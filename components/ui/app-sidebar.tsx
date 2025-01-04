"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import {
  BarChart2,
  Globe,
  Home,
  LogOut,
  PaletteIcon,
  Pizza,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppSidebarProps {
  website: {
    name: string | null;
    subdomain: string;
    user_id: {
      plan: string | null;
    } | null;
  } | null;
  avatarUrl: string;
  url: string;
}

const items = [
  {
    name: "Tableau de bord",
    href: "/",
    icon: Home,
  },
  {
    name: "Pizzas",
    href: "/pizzas",
    icon: Pizza,
  },
  {
    name: "Themes",
    href: "/themes",
    icon: PaletteIcon,
  },
];

export function AppSidebar({ website, avatarUrl, url }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      {/* Website Profile Section */}
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <img
            src={avatarUrl}
            alt={website?.name || "Website"}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium">{website?.name || "My Website"}</h3>
            <p className="text-sm text-muted-foreground">
              {website?.subdomain}.
              {new URL(url).host.split(".").slice(1).join(".")}
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Plan Information */}
        <SidebarGroup>
          <SidebarGroupLabel>Subscription</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Current Plan</span>
                </div>
                <span className="font-medium capitalize">
                  {website?.user_id?.plan || "Free"}
                </span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Actions */}
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={url} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4" />
                <span>Voir le site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <form action="/auth/signout" method="post">
                <button type="submit" className="w-full flex items-center">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </form>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
