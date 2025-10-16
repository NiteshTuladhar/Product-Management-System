"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface UseTableProps {
  initialPage: number;
  initialLimit: number;
  total: number;
}

interface UseTableReturn {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export function useTable({
  initialPage,
  initialLimit,
  total,
}: UseTableProps): UseTableReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / initialLimit);
  const hasNext = initialPage < totalPages;
  const hasPrev = initialPage > 1;

  const updateQueryParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Update multiple parameters
      Object.entries(updates).forEach(([key, value]) => {
        params.set(key, value);
      });

      // Use router.push to trigger server component re-render
      router.push(`/product/list?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const setPage = useCallback(
    (newPage: number) => {
      updateQueryParams({ page: newPage.toString() });
    },
    [updateQueryParams]
  );

  const setLimit = useCallback(
    (newLimit: number) => {
      updateQueryParams({
        limit: newLimit.toString(),
        page: "1",
      });
    },
    [updateQueryParams]
  );

  return {
    pagination: {
      page: initialPage,
      limit: initialLimit,
      total,
      totalPages,
      hasNext,
      hasPrev,
    },
    setPage,
    setLimit,
  };
}
