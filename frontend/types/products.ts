import { z } from "zod";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: string;
  category: string | null;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  success: boolean;
  data: {
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface QueryOptionsParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(255, "Product name must be less than 255 characters"),

  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional()
    .or(z.literal("")),

  price: z
    .number()
    .min(0.01, "Price must be at least 0.01")
    .max(999999.99, "Price must be less than 1,000,000"),

  category: z
    .string()
    .max(100, "Category must be less than 100 characters")
    .optional()
    .or(z.literal("")),

  stock: z
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),
});

export const createProductSchema = productSchema;

export const updateProductSchema = productSchema.partial();

export type CreateProductFormData = z.infer<typeof createProductSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
