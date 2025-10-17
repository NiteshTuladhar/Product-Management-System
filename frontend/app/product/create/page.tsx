"use client";

import { GoBackButton } from "@/components/elements/goback-button";
import { Button } from "@/components/ui/button";
import ProductForm from "@/features/product/product-form";
import Link from "next/link";

const ProductCreatePage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-14">
          <GoBackButton />
          <div className="text-2xl font-bold text-center ">
            Add a New Product
          </div>
          <div>
            <Link href="/product/list/">
              <Button variant="default">
                <p>View Data</p>
              </Button>
            </Link>
          </div>
        </div>
        <ProductForm formType="create" />
      </div>
    </div>
  );
};

export default ProductCreatePage;
