// src/localStorageService/localStorageHandler.ts
export interface LocalStorageHandler {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
  }
  