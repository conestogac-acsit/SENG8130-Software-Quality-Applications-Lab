import { getAllStudents, Student, StudentDataGetter} from ".";

export function getStudents(
  studentGetter: StudentDataGetter,
  page: number = 1,
  pageSize: number = 10
): { data: Student[]; total: number; totalPages: number } {
  const students = getAllStudents(studentGetter);
  if (!students || !Array.isArray(students)) return { data: [], total: 0, totalPages: 0 };

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