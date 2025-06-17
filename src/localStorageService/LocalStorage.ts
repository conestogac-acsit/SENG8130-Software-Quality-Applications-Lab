import { StorageService } from './StorageService';

export class LocalStorage implements StorageService {
  save<T>(key: string, data: T): void {
    if (!key || typeof key !== 'string') {
      throw new Error('Key must be a non-empty string');
    }

    if (data === null || data === undefined) {
      throw new Error(`Value for key "${key}" cannot be null or undefined`);
    }

    let serialized: string;

    try {
      serialized = JSON.stringify(data);
    } catch (error) {
      throw new Error(
        `Failed to stringify data for key "${key}": ${error instanceof Error ? error.message : String(error)}`
      );
    }

    try {
      localStorage.setItem(key, serialized);
    } catch (error) {
      throw new Error(
        `Failed to save to localStorage for key "${key}": ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  load<T>(key: string): T | null {
    if (!key || typeof key !== 'string') {
      throw new Error('Key must be a non-empty string');
    }

    let raw: string | null;

    try {
      raw = localStorage.getItem(key);
    } catch (error) {
      throw new Error(`Failed to retrieve key "${key}" from localStorage: ${error instanceof Error ? error.message : String(error)}`);
    }

    if (raw === null) return null;

    try {
      return JSON.parse(raw) as T;
    } catch (error) {
      throw new Error(`Failed to parse localStorage item for key "${key}": ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}