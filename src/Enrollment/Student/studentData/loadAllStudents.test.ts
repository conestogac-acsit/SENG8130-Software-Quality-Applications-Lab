import { getAllStudents, StudentDataGetter } from '.'; 
import { Student } from '.'; 

const mockStudentData: Student[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', group: 'A', role: 'Student', section: 'A1', imageUrl: '', notes: '', isLoopEnrolled: true, isGithubEnrolled: false },
];

describe('getAllStudents', () => {
  it('should return student data that matches the mock data', () => {
    const studentGetter: StudentDataGetter = () => mockStudentData;
    const result = getAllStudents(studentGetter);
    expect(result).toEqual(mockStudentData);
  });
  it('should return an array', () => {
    const studentGetter: StudentDataGetter = () => mockStudentData;
    const result = getAllStudents(studentGetter);
    expect(result).toBeInstanceOf(Array);
  });
   it('should return an array with the correct length', () => {
    const studentGetter: StudentDataGetter = () => mockStudentData;
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
});