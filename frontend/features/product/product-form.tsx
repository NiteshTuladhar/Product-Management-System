"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { productService } from "@/services/productApi";
import {
  CreateProductFormData,
  createProductSchema,
  Product,
  UpdateProductFormData,
  updateProductSchema,
} from "@/types/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

const ProductForm = ({
  product,
  formType,
}: {
  product?: Product;
  formType: "create" | "update";
}) => {
  const { toast } = useToast();

  const scheme =
    formType === "update" ? updateProductSchema : createProductSchema;
  const defaultValues =
    formType === "create"
      ? {}
      : {
          name: product?.name || "",
          description: product?.description || "",
          price: parseFloat(product?.price as string) || 0.0,
          stock: product?.stock || 0,
          category: product?.category || "",
        };
  const form = useForm<CreateProductFormData | UpdateProductFormData>({
    resolver: zodResolver(scheme),
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
    },
    shouldUnregister: false,
  });

  const handleSubmit = async (
    data: CreateProductFormData | UpdateProductFormData
  ) => {
    try {
      if (formType === "update") {
        if (!product?.id) throw new Error("Product ID is not provided.");

        const updatedProduct = await productService.updateProduct(
          product?.id,
          data as UpdateProductFormData
        );
        if (updatedProduct.success) {
          toast({
            title: "Product has been updated successfully",
            action: <ToastAction altText="Goto product page">Undo</ToastAction>,
          });
        }
      } else {
        const newProduct = await productService.createProduct(
          data as CreateProductFormData
        );
        if (newProduct.success) {
          toast({
            title: "Product created successfully",
            action: (
              <Link href={`/products/list/`}>
                <ToastAction altText="Goto product page">View</ToastAction>,
              </Link>
            ),
          });
          form.reset({
            name: "",
            description: "",
            price: 0,
            stock: 0,
            category: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-10 gap-16"
      >
        <div className="space-y-6 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (Nrs)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4 ">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            {formType === "create" ? "Create Product" : "Update Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
