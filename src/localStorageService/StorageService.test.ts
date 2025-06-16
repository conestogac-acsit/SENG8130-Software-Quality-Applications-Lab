import { StorageService } from './StorageService';

class FakeStorageService implements StorageService {
  private store = new Map<string, string>();

  save<T>(key: string, data: T): void {
    const serialized = JSON.stringify(data);
    this.store.set(key, serialized);
  }

  load<T>(key: string): T | null {
    const raw = this.store.get(key);
    return raw ? JSON.parse(raw) as T : null;
  }
}

describe('StorageService Interface Consistency', () => {
  const testData = { name: 'Arun', age: 50 };
  const key = 'testKey';

  afterEach(() => {
    localStorage.clear();
  });

  it('FakeStorageService should behave the same as BrowserLocalStorage', () => {
    const fake: StorageService = new FakeStorageService();
    fake.save(key, testData);

    const loaded = fake.load<typeof testData>(key);
    expect(loaded).toEqual(testData);
  });

  it('FakeStorageService should return null for missing key', () => {
    const fake = new FakeStorageService();
    const result = fake.load('nonexistent');
    expect(result).toBeNull();
  });
});
