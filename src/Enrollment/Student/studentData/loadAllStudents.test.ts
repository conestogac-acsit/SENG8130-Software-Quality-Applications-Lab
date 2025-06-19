import { getAllStudents, StudentDataGetter } from './loadAllStudents'; 
import { Student } from './studentTypes'; 

describe('getAllStudents', () => {
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