"use client";

import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

export default function NavItem(props: {
  path: string;
  title: string;
  icon: LucideIcon;
}) {
  const path = usePathname();

  return (
    <Tooltip key={props.title}>
      <TooltipTrigger asChild>
        <Link
          href={props.path}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
            {
              "text-foreground": path.includes(props.title.toLowerCase()),
            }
          )}
        >
          <props.icon className="h-5 w-5" />
          <span className="sr-only">{props.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{props.title}</TooltipContent>
    </Tooltip>
  );
}
