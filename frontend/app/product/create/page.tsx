import ProductForm from "@/features/product/product-form";
import React from "react";

const ProductCreatePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl">
        <div className="text-2xl font-bold text-center mb-8">
          Create New Product
        </div>
        <ProductForm formType="create" />
      </div>
    </div>
  );
};

export default ProductCreatePage;
