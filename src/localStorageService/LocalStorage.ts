import { StorageService } from './StorageService';

export class LocalStorage implements StorageService {
  save<T>(key: string, data: T): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Failed to save key "${key}"`, error);
    }
  }

  load<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : null;
    } catch (error) {
      console.error(`Failed to load key "${key}"`, error);
      return null;
    }
  }
}