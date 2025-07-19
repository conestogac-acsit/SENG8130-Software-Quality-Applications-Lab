import { Student } from './studentTypes';

export function getStudents(
  page: number = 1,
  pageSize: number = 10
): { data: Student[]; total: number; totalPages: number } {
  const studentDataFromCache = localStorage.getItem("students_list_key");
  const students: Student[] = studentDataFromCache ? JSON.parse(studentDataFromCache) : [];

  if (!students || !Array.isArray(students)) {
    return { data: [], total: 0, totalPages: 0 };
  }

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
