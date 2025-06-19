import { getStudents } from './paginateStudents'; // Adjust the path
import type { StudentDataGetter } from './loadAllStudents';

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
  });
});