"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserMenu({
  avatarUrl,
  email,
  plan,
}: {
  avatarUrl: string;
  email?: string;
  plan?: string | null;
}) {
  const router = useRouter();
  const supabase = createClient();

  return (
    <>
      {plan === "pro" ? (
        <Badge colorVariant="pro">
          <ShieldCheck size={14} className="mr-1" />
          Pro
        </Badge>
      ) : (
        <Button asChild variant="link">
          <Link href="/pro">You can upgrade to Pro to enable it.</Link>
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn("overflow-hidden rounded-full", {
              "ring-amber-300 ring-2": plan === "pro",
            })}
          >
            <img
              src={avatarUrl}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{email || "Anonymous"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
