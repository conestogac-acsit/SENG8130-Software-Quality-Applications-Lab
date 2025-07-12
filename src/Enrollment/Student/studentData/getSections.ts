import { getAllStudents } from "./getAllStudents"; // ✅ CORRECT import

/**
 * getSections
 *
 * Extracts a unique list of section names from all available students.
 * This assumes each student object contains a `section` field.
 *
 * If no students are found, returns an empty array.
 */
export function getSections(): string[] {
  const students = getAllStudents();
  if (!students || !Array.isArray(students)) {
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
