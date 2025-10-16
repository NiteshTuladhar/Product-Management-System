interface CacheItem<T> {
  key: string;
  value: T;
  timestamp: number;
}

class LRUCache<T> {
  private readonly capacity: number;
  private cache: Map<string, CacheItem<T>>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<string, CacheItem<T>>();
  }

  get(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    this.cache.delete(key);
    this.cache.set(key, {
      ...item,
      timestamp: Date.now()
    });

    return item.value;
  }

  set(key: string, value: T): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      key,
      value,
      timestamp: Date.now()
    });
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }
}

export default LRUCache;
