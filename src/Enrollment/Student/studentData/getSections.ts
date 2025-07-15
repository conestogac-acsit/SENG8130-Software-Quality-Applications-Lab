import { getAllStudents } from "./getAllStudents";

export function getSections(): string[] {
  const students = getAllStudents();

  if (!Array.isArray(students)) {
    return [];
  }

  return Array.from(
    new Set(
      students
        .map((student) => student.section)
        .filter((section): section is string => typeof section === "string")
    )
  );
}
