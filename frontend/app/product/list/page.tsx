import ProductTable from "@/features/product/product-list";
import { productService } from "@/services/productApi";
import { QueryOptionsParams } from "@/types/products";

interface ProductListPageProps {
  searchParams: QueryOptionsParams;
}

const ProductListPage = async ({ searchParams }: ProductListPageProps) => {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const search = searchParams?.search || "";
  const sortBy = searchParams?.sortBy || "createdAt";
  const sortOrder = searchParams?.sortOrder || "DESC";

  const data = await productService.getProductList({
    page,
    limit,
    // search,
    sortBy,
    sortOrder,
  });

  return (
    <ProductTable
      initialData={data}
      initialPage={page}
      initialLimit={limit}
      // initialSearch={search}
      initialSortBy={sortBy}
      initialSortOrder={sortOrder}
    />
  );
};

export default ProductListPage;
