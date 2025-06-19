import { getAllStudents, StudentDataGetter } from './loadAllStudents'; 
import { Student } from './studentTypes'; 

const studentInfo: Student[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', group: 'A', role: 'Student', section: 'A1', imageUrl: '', notes: '', isLoopEnrolled: true, isGithubEnrolled: false },
];

describe('getAllStudents', () => {
  it('should return student data that matches the mock data', () => {
    const studentGetter: StudentDataGetter = () => studentInfo;
    const result = getAllStudents(studentGetter);
    expect(result).toEqual(studentInfo);
  });
  it('should return an array', () => {
    const studentGetter: StudentDataGetter = () => studentInfo;
    const result = getAllStudents(studentGetter);
    expect(result).toBeInstanceOf(Array);
  });
   it('should return an array with the correct length', () => {
    const studentGetter: StudentDataGetter = () => studentInfo;
    const result = getAllStudents(studentGetter);
    expect(result.length).toBe(1);
  });
   it('should throw an error if studentGetter returns invalid data (null)', () => {
    const studentGetter: StudentDataGetter = () => null as any;
    expect(() => getAllStudents(studentGetter)).toThrow("Student data is not an array");
  });
   it('should throw an error if studentGetter returns invalid data (not an array)', () => {
    const studentGetter: StudentDataGetter = () => ({ name: 'Invalid Data' } as any);
    expect(() => getAllStudents(studentGetter)).toThrow("Student data is not an array");
  });
  it('should throw an error if studentGetter throws an error', () => {
    const studentGetter: StudentDataGetter = () => {
      throw new Error('Data fetch failed');
    };
    expect(() => getAllStudents(studentGetter)).toThrow("Failed to retrieve student data: Data fetch failed");
  });
});