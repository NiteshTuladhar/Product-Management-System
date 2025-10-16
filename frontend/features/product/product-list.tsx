"use client";

import {
  Table,
  TableBody,
  TableCaption,
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
  initialSearch
}: ProductTableProps) {
  const {
    data: { products, total },
  } = initialData;

  const { pagination, setPage, sorting, setSort,
    filters, setSearch, resetFilters } = useTable({
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

  return (
    <div className="flex flex-col gap-12">
      <div className="flex gap-3 ">
          <SearchInput
            value={filters.search}
            onChange={setSearch}
            onClear={() => setSearch("")}
            placeholder="Search by name, category..."
          />

            <Button
              variant="outline"
              onClick={resetFilters}
              className="whitespace-nowrap"
            >
              Clear Filters
            </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">

          <Table>
            <TableCaption>
              <p>
                Showing {products.length} of {total} products
              </p>
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
                          !pagination.hasPrev ? "pointer-events-none opacity-50" : ""
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
                    {pagination.totalPages > pageNumbers[pageNumbers.length - 1] && (
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
                          !pagination.hasNext ? "pointer-events-none opacity-50" : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}

              {/* Page Info */}
              <div className="text-sm text-muted-foreground text-center">
                Page {pagination.page} of {pagination.totalPages} • {total} total
                products
              </div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>

                {/* Sortable Headers */}
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
                  <TableCell>{product.createdAt}</TableCell>
                  <TableCell>{product.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow></TableRow>
            </TableFooter>
          </Table>
        </div>
    </div>
  );
}

export default ProductTable;
