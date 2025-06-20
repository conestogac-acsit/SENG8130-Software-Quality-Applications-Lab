import { Student } from ".";

export type StudentDataGetter = () => Student[];

export const getAllStudents = (studentGetter: StudentDataGetter): Student[] => {
  try {
    const students = studentGetter();

    if (!Array.isArray(students)) {
      throw new Error("Student data is not an array");
    }

    return students;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to retrieve student data: ${message}`);
  }
};