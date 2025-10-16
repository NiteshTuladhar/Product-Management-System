"use client";

import { Button } from "@/components/ui/button";
import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface TableHeaderProps {
  column: string;
  currentSortBy: string;
  currentSortOrder: "ASC" | "DESC";
  onSort: (sortBy: string, sortOrder?: "ASC" | "DESC") => void;
  children: React.ReactNode;
  className?: string;
}

export function CustomTableHeader({
  column,
  currentSortBy,
  currentSortOrder,
  onSort,
  children,
  className,
}: TableHeaderProps) {
  const isActive = currentSortBy === column;

  const handleClick = () => {
    onSort(column);
  };

  const getSortIcon = () => {
    if (!isActive) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return currentSortOrder === "ASC" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <TableHead className={cn(className)}>
      <Button
        variant="ghost"
        onClick={handleClick}
        className={cn(
          "h-auto p-0 font-medium hover:bg-transparent",
          isActive && "text-primary"
        )}
      >
        {children}
        {getSortIcon()}
      </Button>
    </TableHead>
  );
}
