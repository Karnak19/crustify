"use client";

import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SortDirection = "asc" | "desc" | null;
type SortableField = "price" | "status" | "base";

interface SortableHeaderProps {
  field: SortableField;
  currentSort: { field: SortableField | null; direction: SortDirection };
  onSort: (field: SortableField) => void;
  children: React.ReactNode;
  className?: string;
}

export function SortableHeader({
  field,
  currentSort,
  onSort,
  children,
  className,
}: SortableHeaderProps) {
  const isActive = currentSort.field === field;

  return (
    <TableHead className={className}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[active=true]:font-bold"
        onClick={() => onSort(field)}
        data-active={isActive}
      >
        <span>{children}</span>
        {isActive ? (
          currentSort.direction === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          )
        ) : (
          <ArrowUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
        )}
      </Button>
    </TableHead>
  );
}
