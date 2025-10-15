import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { ProductCreateInput } from './dto/product-create.dto';
import { ProductUpdateInput } from './dto/product-update.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(options: QueryOptionsDto): Promise<{
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> {

    const validSortFields = [
      'id', 'name','price','category','stock', 'createdAt', 'updatedAt'
    ];

    if (options?.sortBy && !validSortFields.includes(options.sortBy)){
      throw new BadRequestException(`Invalid sort field: ${options.sortBy}, valid fields are : ${validSortFields}`)
    }


    const { products, total } = await this.productRepository.findAll(options);

    const totalPages = Math.ceil(total/options?.limit);
    const hasNext = options.page < totalPages;
    const hasPrev = options.page > 1;


    return {
      products,
      total,
      page: options?.page,
      limit: options?.limit,
      totalPages,
      hasNext,
      hasPrev
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
