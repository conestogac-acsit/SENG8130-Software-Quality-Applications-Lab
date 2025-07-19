import { getStudents } from '.';
import type { Student } from './studentTypes';
import {Email} from './email';

describe('getStudents', () => {
  const mockStudents: Student[] = [
    { id: '1', name: 'Alice', email: new Email('alice@example.com'), role: 'Student', section: 'A', group: '1', imageUrl: '', notes: '', isLoopEnrolled: false, isGithubEnrolled: false },
    { id: '2', name: 'Bob', email: new Email('bob@example.com'), role: 'Student', section: 'B', group: '2', imageUrl: '', notes: '', isLoopEnrolled: false, isGithubEnrolled: false },
    { id: '3', name: 'Charlie', email: new Email('charlie@example.com'), role: 'Student', section: 'C', group: '3', imageUrl: '', notes: '', isLoopEnrolled: false, isGithubEnrolled: false },
    { id: '4', name: 'David', email: new Email('david@example.com'), role: 'Student', section: 'D', group: '4', imageUrl: '', notes: '', isLoopEnrolled: false, isGithubEnrolled: false }
  ];

  beforeEach(() => {
    localStorage.setItem("students_list_key", JSON.stringify(mockStudents));
  });

  afterEach(() => {
    localStorage.removeItem("students_list_key");
  });

  describe('Pagination with small array', () => {
    it('should return the first page with the correct data', () => {
      const result = getStudents(1, 2); 
      expect(result.data).toEqual(mockStudents.slice(0, 2)); 
      expect(result.total).toBe(4); 
      expect(result.totalPages).toBe(2);
    });

    it('should return the second page with the correct data', () => {
      const result = getStudents(2, 2); 
      expect(result.data).toEqual(mockStudents.slice(2, 4));
      expect(result.total).toBe(4); 
      expect(result.totalPages).toBe(2);
    });

    it('should return an empty result for a page beyond the available data', () => {
      const result = getStudents(3, 2);
      expect(result.data).toEqual([]); 
      expect(result.total).toBe(4);
      expect(result.totalPages).toBe(2);
    });
  });

  describe('Defaults to page 1 and pageSize 10', () => {
    const students = Array.from({ length: 15 }, (_, i) => ({
      id: (i + 1).toString(),
      name: `Student ${i + 1}`,
      email: new Email(`student${i + 1}@example.com`),
      role: 'Student',
      section: 'A',
      group: '1',
      imageUrl: '',
      notes: '',
      isLoopEnrolled: false,
      isGithubEnrolled: false
    }));
    
    beforeEach(() => {
      localStorage.setItem("students_list_key", JSON.stringify(students));
    });

    it('should return the first 10 students by default', () => {
      const result = getStudents(); 
      expect(result.data.length).toBe(10); 
      expect(result.total).toBe(15); 
      expect(result.totalPages).toBe(2); 
    });
  });
});
