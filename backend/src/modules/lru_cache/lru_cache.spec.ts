import LRUCache from "src/infrastructure/cache/lru-cache";

describe('LRUCache', ()=>{
  let cache: LRUCache<number>;

  beforeEach(()=>{
    cache = new LRUCache<number>(3);
  })

  it('should store and retreive values', ()=>{
    cache.set('a',1);
    cache.set('b',2);

    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(2);

  });

  it('should return null for invalid keys',()=>{
    expect(cache.get('AABB')).toBeNull()
  })

  it('should evict least recently used item when capacity exceeds', ()=>{
    cache.set('a',1);
    cache.set('b',2);
    cache.set('c',3);

    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(2);
    expect(cache.get('c')).toBe(3);

    cache.set('d',4);
    expect(cache.get('a')).toBeNull();
    expect(cache.get('b')).toBe(2);
    expect(cache.get('c')).toBe(3);
    expect(cache.get('d')).toBe(4);
  })

  it('should update recently used on get operations', () => {
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    cache.get('a');

    cache.set('d', 4);

    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBeNull();
    expect(cache.get('c')).toBe(3);
    expect(cache.get('d')).toBe(4);
  });

  it('should delete keys', () => {
    cache.set('a', 1);
    cache.set('b', 2);

    expect(cache.delete('a')).toBe(true);
    expect(cache.get('a')).toBeNull();
    expect(cache.size()).toBe(1);
  });
})
