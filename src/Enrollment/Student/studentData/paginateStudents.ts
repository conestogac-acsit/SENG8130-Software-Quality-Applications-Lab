import { Student } from './studentTypes';
import { getAllStudents } from './loadAllStudents';
import { LocalStorage } from '../../../localStorageService';


export function getStudents(
  page: number = 1,
  pageSize: number = 10
): { data: Student[]; total: number; totalPages: number } {

  const storage = new LocalStorage(); 
  const students = getAllStudents(() => {
    return storage.load<Student[]>("students_list_key") || [];  
  });

  const total = students.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: students.slice(start, end),
    total,
    totalPages
  };
}
