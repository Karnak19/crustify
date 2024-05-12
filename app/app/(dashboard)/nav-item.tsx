"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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
            "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-primary transition-colors hover:text-primary-foreground md:h-8 md:w-8",
            {
              "bg-primary text-primary-foreground hover:text-background":
                path.includes(props.title.toLowerCase()),
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
