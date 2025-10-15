import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { ProductCreateInput } from './dto/product-create.dto';
import { ProductUpdateInput } from './dto/product-update.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query() queryOptions: QueryOptionsDto
  ) {
    return this.productService.getAllProducts(
      queryOptions
    );
  }

  @Get(':id')
  async getProductDetails(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post()
  async createProduct(
    @Body() createProductDto: ProductCreateInput,
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: ProductUpdateInput,
  ): Promise<Product | null> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return this.productService.deleteProduct(id);
  }
}
