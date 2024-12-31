export class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, { value: any; expires: number }>;

  private constructor() {
    this.cache = new Map();
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  set(key: string, value: any, ttlMs: number = 60000): void {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttlMs
    });
  }

  get(key: string): any {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  clear(): void {
    this.cache.clear();
  }
}