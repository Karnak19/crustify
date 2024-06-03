"use client";

import { ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import NavItem from "./nav-item";
import { nav } from "./nav";

export default function NavList({ url }: { url: string }) {
  return (
    <nav className="flex flex-col items-center gap-4 px-2 py-4">
      {nav.map((item) => (
        <NavItem {...item} key={item.title} />
      ))}
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            // biome-ignore lint/a11y/noBlankTarget: <explanation>
            target="_blank"
            href={url}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-primary transition-colors hover:text-primary-foreground md:h-8 md:w-8"
            )}
          >
            <ExternalLink className="h-5 w-5" />
            <span className="sr-only">Voir le site</span>
          </a>
        </TooltipTrigger>
        <TooltipContent side="right">Voir le site</TooltipContent>
      </Tooltip>
    </nav>
  );
}
