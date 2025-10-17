"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductListResponse } from "@/types/products";

import { SearchInput } from "@/components/elements/search-input";
import { CustomTableHeader } from "@/components/elements/table-header";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTable } from "@/hooks/useTable";
import { DeleteIcon, Trash2Icon, TrashIcon, X } from "lucide-react";
import { GoBackButton } from "@/components/elements/goback-button";
import { convertDatetoNormalFormat } from "@/utils/format-date";
import { productService } from "@/services/productApi";
import { toast, useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ProductTableProps {
  initialData: ProductListResponse;
  initialPage: number;
  initialLimit: number;
  initialSearch: string;
  initialSortBy: string;
  initialSortOrder: "ASC" | "DESC";
}

function ProductTable({
  initialData,
  initialPage,
  initialLimit,
  initialSortBy,
  initialSortOrder,
  initialSearch,
}: ProductTableProps) {
  const {
    data: { products, total },
  } = initialData;
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const {
    pagination,
    setPage,
    sorting,
    setSort,
    filters,
    setSearch,
    resetFilters,
  } = useTable({
    initialPage,
    initialLimit,
    initialSortBy,
    initialSortOrder,
    initialSearch,
    total,
  });

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(
      1,
      pagination.page - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisiblePages - 1
    );

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };
  const pageNumbers = getPageNumbers();

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete? ${id}`
    );
    if (confirmDelete) {
      try {
        const response = await productService.deleteProduct(id);
        if (response.success) {
          toast({
            title: "Product deleted successfully",
            description: `Product has been deleted.`,
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Failed to delete product",
          description:
            error.response?.data?.message || "Please try again later.",
        });
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-8 gap-8">
      <div className=" w-full">
        <div className="flex items-center justify-between">
          <GoBackButton />
          <div className="flex gap-4 items-center">
            <SearchInput
              value={filters.search}
              onChange={setSearch}
              onClear={() => setSearch("")}
              placeholder="Search by name, category..."
            />

            <Button
              variant="outline"
              onClick={resetFilters}
              className="whitespace-nowrap px-8 py-2 h-10"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col gap-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>

              <CustomTableHeader
                column="name"
                currentSortBy={sorting.sortBy}
                currentSortOrder={sorting.sortOrder}
                onSort={setSort}
              >
                Product Name
              </CustomTableHeader>

              <CustomTableHeader
                column="price"
                currentSortBy={sorting.sortBy}
                currentSortOrder={sorting.sortOrder}
                onSort={setSort}
              >
                Price
              </CustomTableHeader>

              <CustomTableHeader
                column="stock"
                currentSortBy={sorting.sortBy}
                currentSortOrder={sorting.sortOrder}
                onSort={setSort}
                className="text-right"
              >
                Stock
              </CustomTableHeader>

              <CustomTableHeader
                column="category"
                currentSortBy={sorting.sortBy}
                currentSortOrder={sorting.sortOrder}
                onSort={setSort}
                className="text-right"
              >
                Category
              </CustomTableHeader>

              <CustomTableHeader
                column="createdAt"
                currentSortBy={sorting.sortBy}
                currentSortOrder={sorting.sortOrder}
                onSort={setSort}
                className="text-right"
              >
                Created At
              </CustomTableHeader>

              <CustomTableHeader
                column="updatedAt"
                currentSortBy={sorting.sortBy}
                currentSortOrder={sorting.sortOrder}
                onSort={setSort}
                className="text-right"
              >
                Updated At
              </CustomTableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {convertDatetoNormalFormat(product.createdAt)}
                </TableCell>
                <TableCell>
                  {convertDatetoNormalFormat(product.updatedAt)}
                </TableCell>
                <TableCell className="cursor-pointer">
                  {isDeleting ? (
                    <div className="flex items-center justify-center">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    </div>
                  ) : (
                    <TrashIcon
                      color="red"
                      size={16}
                      className="cursor-pointer"
                      onClick={() => [handleDelete(product.id)]}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow></TableRow>
          </TableFooter>
        </Table>

        {/* Pagination Section - Spaced from table */}
        <div className="flex flex-col gap-4 mt-6">
          {/* Results info and pagination controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Showing X of Y products - Left aligned */}
            <div className="text-sm text-muted-foreground">
              Showing {products.length} of {total} products
            </div>

            {/* Pagination UI - Right aligned */}
            <div className="flex flex-col items-end gap-2">
              {pagination.totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.hasPrev) {
                            setPage(pagination.page - 1);
                          }
                        }}
                        className={
                          !pagination.hasPrev
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {pageNumbers.map((pageNum) => (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(pageNum);
                          }}
                          isActive={pageNum === pagination.page}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {/* Ellipsis for many pages */}
                    {pagination.totalPages >
                      pageNumbers[pageNumbers.length - 1] && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Next Button */}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.hasNext) {
                            setPage(pagination.page + 1);
                          }
                        }}
                        className={
                          !pagination.hasNext
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}

              {/* Page info - Right aligned below pagination */}
              {pagination.totalPages > 1 && (
                <div className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTable;
