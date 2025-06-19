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
});