import { LocalStorage } from './LocalStorage';

describe('LocalStorage', () => {
  const key = 'testKey';
  const data = { name: 'Arun', age: 30 };
  let storage: LocalStorage;

  beforeEach(() => {
    storage = new LocalStorage();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('save()', () => {
    it('should save valid data without throwing', () => {
      expect(() => storage.save(key, data)).not.toThrow();
    });

    it('should throw if key is empty', () => {
      expect(() => storage.save('', data)).toThrow(/Key must be a non-empty string/);
    });

    it('should throw if key is null', () => {
      expect(() => storage.save(null as any, data)).toThrow(/Key must be a non-empty string/);
    });

    it('should throw if key is undefined', () => {
      expect(() => storage.save(undefined as any, data)).toThrow(/Key must be a non-empty string/);
    });

    it('should throw if value is null', () => {
      expect(() => storage.save(key, null)).toThrow(/cannot be null or undefined/);
    });

    it('should throw if value is undefined', () => {
      expect(() => storage.save(key, undefined)).toThrow(/cannot be null or undefined/);
    });

    it('should throw if value cannot be stringified', () => {
      const circular: any = {};
      circular.self = circular;
      expect(() => storage.save(key, circular)).toThrow(/Failed to stringify data/);
    });
  });

  describe('load()', () => {
    it('should load valid data', () => {
      localStorage.setItem(key, JSON.stringify(data));
      const result = storage.load<typeof data>(key);
      expect(result).toEqual(data);
    });

    it('should return null if key does not exist', () => {
      const result = storage.load('nonexistent');
      expect(result).toBeNull();
    });

    it('should throw if key is empty', () => {
      expect(() => storage.load('')).toThrow(/Key must be a non-empty string/);
    });

    it('should throw if key is null', () => {
      expect(() => storage.load(null as any)).toThrow(/Key must be a non-empty string/);
    });

    it('should throw if key is undefined', () => {
      expect(() => storage.load(undefined as any)).toThrow(/Key must be a non-empty string/);
    });

    it('should throw if JSON.parse fails', () => {
      localStorage.setItem(key, 'invalid json');
      expect(() => storage.load(key)).toThrow(/parse/);
    });
  });
});
