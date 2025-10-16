// cache.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import LRUCache from 'src/infrastructure/cache/lru-cache';

@Injectable()
export class LruCacheService {
  private readonly cache: LRUCache<any>;

  constructor(private readonly configService: ConfigService){
    const capacity = Number(this.configService.get('LRU_CACHE_CAPACITY')) || 100;
    this.cache = new LRUCache<any>(capacity);
  }

  get<T>(key: string): T | null {
    const value = this.cache.get(key);
    return value;
  }

  set<T>(key: string, value: T): void {
    this.cache.set(key, value);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
