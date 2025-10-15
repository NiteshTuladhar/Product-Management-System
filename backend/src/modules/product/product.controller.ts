import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Param,
  Body,
  Post,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductCreateInput } from './dto/product-create.dto';
import { ProductUpdateInput } from './dto/product-update.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number = 10,
    @Query('sortBy') sortBy: string,
    @Query('sortBy') sortOrder: 'ASC' | 'DESC',
    @Query('sortBy') search: string,
  ) {
    return this.productService.getAllProducts({
      page,
      limit,
      sortBy,
      sortOrder,
      search,
    });
  }

  @Get(':id')
  async getProductDetails(@Param() id: string): Promise<Product> {
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return this.productService.deleteProduct(id);
  }
}
