import { getStudents } from './getStudents';

describe('getStudents with empty dataset', () => {
  it('should return an empty array for page 1', () => {
    const result = getStudents(1, 10);
    expect(result.data).toEqual([]);
  });
});