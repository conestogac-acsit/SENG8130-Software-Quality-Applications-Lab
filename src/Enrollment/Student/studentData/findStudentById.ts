import { Student } from "./studentTypes";
import { getAllStudents,StudentDataGetter } from "./loadAllStudents";

export function findStudentById(id: string, studentGetter: StudentDataGetter): Student | undefined {
  const students = getAllStudents(studentGetter);
  if (!students || !Array.isArray(students)) return undefined;
  return students.find((student) => student.id === id);
}