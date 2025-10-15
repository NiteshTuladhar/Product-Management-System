import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { QueryOptions } from 'src/common/interface/query-options.interface';
import { Product } from './entities/product.entity';
import { ProductCreateInput } from './dto/product-create.dto';
import { ProductUpdateInput } from './dto/product-update.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(options?: QueryOptions): Promise<{
    products: Product[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { products, total } = await this.productRepository.findAll(options);

    const { page = 1, limit = 10 } = options || {};

    return {
      products,
      total,
      page,
      limit,
    };
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }
    return product;
  }

  async createProduct(createProductDto: ProductCreateInput): Promise<Product> {
    const existingProduct = await this.productRepository.findAll({
      search: createProductDto.name,
      limit: 1,
    });

    if (existingProduct.products.length > 0) {
      throw new ConflictException(
        `Product with the name ${name} already exists`,
      );
    }
    return this.productRepository.create(createProductDto);
  }

  async updateProduct(
    productId: string,
    updateProductDto: ProductUpdateInput,
  ): Promise<Product | null> {
    const existingProduct = await this.getProductById(productId);

    if (
      updateProductDto.name &&
      updateProductDto.name !== existingProduct.name
    ) {
      const checkDuplicate = await this.productRepository.findAll({
        search: updateProductDto.name,
        limit: 1,
      });
      if (checkDuplicate.products.length > 0) {
        throw new ConflictException(
          `Product with the name ${name} aready exists`,
        );
      }
    }

    return this.productRepository.update(productId, updateProductDto);
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    await this.getProductById(id);
    const deleted = await this.productRepository.delete(id);
    return { message: 'Product deleted successfully' };
  }
}
