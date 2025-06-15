// src/localStorageService/localStorageService.ts

import type { LocalStorageHandler } from './localStorageHandler';

export function saveToStorage<T>(
  storage: LocalStorageHandler,
  key: string,
  data: T
): void {
  storage.setItem(key, JSON.stringify(data));
}

export function loadFromStorage<T>(
  storage: LocalStorageHandler,
  key: string
): T[] {
  const raw = storage.getItem(key);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as T[];
  } catch (err) {
    console.error('[loadFromStorage] Failed to parse:', err);
    return [];
  }
}
