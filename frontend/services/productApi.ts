import axios from "axios";
import {
  Product,
  QueryOptionsParams,
  ProductListResponse,
  CreateProductFormData,
  UpdateProductFormData,
} from "@/types/products";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

class ProductService {
  async getProductList(
    params: QueryOptionsParams = {}
  ): Promise<ProductListResponse> {
    const response = await api.get<ProductListResponse>("/products", {
      params,
    });
    return response.data;
  }

  async getProduct(id: string): Promise<{ data: Product; success: boolean }> {
    const response = await api.get<{ data: Product; success: boolean }>(
      `/products/${id}`
    );
    return response.data;
  }

  async createProduct(
    productData: CreateProductFormData
  ): Promise<{ data: Product; success: boolean }> {
    const response = await api.post<{ data: Product; success: boolean }>(
      "products/",
      productData
    );
    return response.data;
  }

  async updateProduct(
    id: string,
    productData: UpdateProductFormData
  ): Promise<{ data: Product; success: boolean }> {
    const response = await api.patch<{ data: Product; success: boolean }>(
      `/products/${id}`,
      productData
    );
    return response.data;
  }

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  }
}

const productService = new ProductService();
export { productService };
