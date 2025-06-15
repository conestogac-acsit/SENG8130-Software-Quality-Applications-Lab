// src/localStorageService/browserLocalStorage.ts
import type { LocalStorageHandler } from './localStorageHandler';

export const browserLocalStorage: LocalStorageHandler = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value)
};
