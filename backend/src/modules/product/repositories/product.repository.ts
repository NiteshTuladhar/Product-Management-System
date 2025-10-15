import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryOptions } from 'src/common/interface/query-options.interface';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { ProductCreateInput } from '../dto/product-create.dto';
import { ProductUpdateInput } from '../dto/product-update.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async findAll(
    options?: QueryOptions,
  ): Promise<{ products: Product[]; total: number }> {
    const {
      limit = 10,
      page = 1,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = options || {};

    const findOptions: FindManyOptions<Product> = {
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [sortBy]: sortOrder,
      },
    };

    if (search) {
      findOptions.where = [
        { name: ILike(`%${search}%`) },
        { description: ILike(`%${search}%`) },
        { category: ILike(`%${search}%`) },
      ];
    }

    const [products, total] = await this.repository.findAndCount(findOptions);

    return { products, total };
  }

  async findById(id: string): Promise<Product | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async create(productData: ProductCreateInput): Promise<Product> {
    const product = this.repository.create(productData);
    return this.repository.save(product);
  }

  async update(
    id: string,
    productData: ProductUpdateInput,
  ): Promise<Product | null> {
    await this.repository.update(id, productData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return true;
  }
}

