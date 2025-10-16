import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LruCacheModule } from '../lru_cache/lru_cache.module';
import { LruCacheService } from '../lru_cache/lru_cache.service';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), LruCacheModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, LruCacheService],
})
export class ProductModule {}
