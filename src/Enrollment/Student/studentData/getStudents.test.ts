import { getStudents } from './getStudents';

describe('getStudents with empty dataset', () => {
  it('should return an empty array for page 1', () => {
    const result = getStudents(1, 10);
    expect(result.data).toEqual([]);
  });
  it('should return total = 0 for page 1', () => {
    const result = getStudents(1, 10);
    expect(result.total).toBe(0);
  });
   it('should return totalPages = 0 for page 1', () => {
    const result = getStudents(1, 10);
    expect(result.totalPages).toBe(0);
  });
});