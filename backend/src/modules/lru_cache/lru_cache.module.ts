import { Module } from '@nestjs/common';
import { LruCacheService } from './lru_cache.service';

@Module({
  providers: [LruCacheService],
  exports: [LruCacheService]
})
export class LruCacheModule {}
