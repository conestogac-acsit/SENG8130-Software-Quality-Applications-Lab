import { getAllStudents, StudentDataGetter } from './loadAllStudents'; 
import { Student } from './studentTypes'; 

describe('getAllStudents', () => {
     const student: Student = {id: '1', name: 'Alice Johnson',  email: 'alice@example.com',group: 'Group A',role: 'Student',section: 'Section 1',imageUrl: 'https://example.com/alice.jpg',notes: 'Good participation',isLoopEnrolled: true,isGithubEnrolled: false};
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
  it('should return an array with one student if studentGetter returns valid data', () => {
    const studentGetter: StudentDataGetter = () => [student];
    const result = getAllStudents(studentGetter);
    expect(result).toEqual([student]);
  });
  it('should return an empty array if studentGetter returns empty array', () => {
    const studentGetter: StudentDataGetter = () => [];
    const result = getAllStudents(studentGetter);
    expect(result).toEqual([]);
  });
});