import ProductForm from "@/features/product/product-form";
import { productService } from "@/services/productApi";
import React from "react";

const ProductUpdatePage = async ({ params }: { params: { id: string } }) => {
  const product = await productService.getProduct(params.id);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl">
        <div className="text-2xl font-bold text-center mb-8">
          Update Product
        </div>
        <ProductForm formType="update" product={product.data} />
      </div>
    </div>
  );
};

export default ProductUpdatePage;
