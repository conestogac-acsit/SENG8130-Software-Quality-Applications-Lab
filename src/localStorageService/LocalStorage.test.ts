import { LocalStorage } from './LocalStorage';

describe('LocalStorage', () => {
  const key = 'testKey';
  const data = { name: 'Arun', age: 50 };

  let storage: LocalStorage;

  beforeEach(() => {
    storage = new LocalStorage();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should save and load data correctly', () => {
    storage.save(key, data);
    const result = storage.load<typeof data>(key);
    expect(result).toEqual(data);
  });

  it('should return null for nonexistent key', () => {
    const result = storage.load('nonexistent');
    expect(result).toBeNull();
  });

  it('should handle invalid JSON gracefully', () => {
    localStorage.setItem(key, 'invalid json');
    const result = storage.load(key);
    expect(result).toBeNull();
  });
});
