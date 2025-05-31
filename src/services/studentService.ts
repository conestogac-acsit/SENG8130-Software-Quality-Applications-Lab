import type { Student, EnrollmentStatus } from "../page/DashboardContainer/StudentInfoDashboard/StudentInfoDashboard";

export interface StudentService {
  updateStatus(
    students: Student[],
    index: number,
    platform: "loop" | "github",
    newStatus: EnrollmentStatus
  ): Student[];

  updateStudent(students: Student[], index: number, updated: Partial<Student>): Student[];

  deleteStudent(students: Student[], index: number): Student[];
}

export const studentService: StudentService = {
  updateStatus(students, index, platform, newStatus) {
    return students.map((student, i) => {
      if (i !== index) return student;
      if (platform === "loop") {
        return { ...student, loopStatus: newStatus };
      } else {
        return { ...student, githubStatus: newStatus };
      }
    });
  },

  updateStudent(students, index, updated) {
    return students.map((student, i) => (i === index ? { ...student, ...updated } : student));
  },

  deleteStudent(students, index) {
    return students.filter((_, i) => i !== index);
  },
};
