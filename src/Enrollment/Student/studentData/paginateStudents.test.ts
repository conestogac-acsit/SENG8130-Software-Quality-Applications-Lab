import { getStudents } from '.';
import type { StudentDataGetter } from '.';

describe('getStudents', () => {

  describe('Pagination with small array', () => {
    const students = [1, 2, 3, 4];
    const studentGetter: StudentDataGetter = () => students as any;

    it('should return the first page with the correct data', () => {
      const result = getStudents(studentGetter, 1, 2); 
      expect(result.data).toEqual(students.slice(0, 2)); 
      expect(result.total).toBe(4); 
      expect(result.totalPages).toBe(2);
    });
     it('should return the second page with the correct data', () => {
      const result = getStudents(studentGetter, 2, 2); 
      expect(result.data).toEqual(students.slice(2, 4));
      expect(result.total).toBe(4); 
      expect(result.totalPages).toBe(2);
    });
    it('should return an empty result for a page beyond the available data', () => {
      const result = getStudents(studentGetter, 3, 2);
      expect(result.data).toEqual([]); 
      expect(result.total).toBe(4);
      expect(result.totalPages).toBe(2);
    });
  });
  describe('Defaults to page 1 and pageSize 10', () => {
    const students = Array.from({ length: 15 }, (_, i) => i + 1);
    const studentGetter: StudentDataGetter = () => students as any;

    it('should return the first 10 students by default', () => {
      const result = getStudents(studentGetter); 
      expect(result.data.length).toBe(10); 
      expect(result.total).toBe(15); 
      expect(result.totalPages).toBe(2); 
    });
  })
});