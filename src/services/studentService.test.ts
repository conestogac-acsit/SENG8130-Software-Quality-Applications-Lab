import { studentService } from "./studentService";
import type { Student, EnrollmentStatus } from "../page/DashboardContainer/StudentInfoDashboard/StudentInfoDashboard";

const sampleStudents: Student[] = [
  {
    studentId: "1",
    name: "Alice",
    email: "alice@example.com",
    group: "G1",
    role: "student",
    loop: "yes",
    github: "no",
    status: "unenrolled",
    loopStatus: "unenrolled",
    githubStatus: "unenrolled",
  },
  {
    studentId: "2",
    name: "Bob",
    email: "bob@example.com",
    group: "G2",
    role: "student",
    loop: "no",
    github: "yes",
    status: "unenrolled",
    loopStatus: "unenrolled",
    githubStatus: "unenrolled",
  },
];

describe("studentService", () => {
  describe("updateStatus", () => {
    it("should update loopStatus of the correct student", () => {
      const updated = studentService.updateStatus(
        sampleStudents,
        0,
        "loop",
        "enrolled"
      );
      expect(updated[0].loopStatus).toBe("enrolled");
      expect(updated[1].loopStatus).toBe("unenrolled");
    });

    it("should update githubStatus of the correct student", () => {
      const updated = studentService.updateStatus(
        sampleStudents,
        1,
        "github",
        "enrolled"
      );
      expect(updated[1].githubStatus).toBe("enrolled");
      expect(updated[0].githubStatus).toBe("unenrolled");
    });

    it("should not modify original array (immutability)", () => {
      const before = [...sampleStudents];
      const updated = studentService.updateStatus(sampleStudents, 0, "loop", "enrolled");
      expect(updated).not.toBe(sampleStudents);
      expect(sampleStudents).toEqual(before);
    });
  });

  describe("updateStudent", () => {
    it("should update student fields correctly", () => {
      const updated = studentService.updateStudent(sampleStudents, 1, {
        name: "Bobby",
        email: "bobby@example.com",
      });
      expect(updated[1].name).toBe("Bobby");
      expect(updated[1].email).toBe("bobby@example.com");
      expect(updated[0].name).toBe("Alice");
    });
  });

  describe("deleteStudent", () => {
    it("should remove student at given index", () => {
      const updated = studentService.deleteStudent(sampleStudents, 0);
      expect(updated).toHaveLength(1);
      expect(updated[0].name).toBe("Bob");
    });

    it("should not mutate original array", () => {
      const before = [...sampleStudents];
      const updated = studentService.deleteStudent(sampleStudents, 0);
      expect(sampleStudents).toEqual(before);
      expect(updated).not.toBe(sampleStudents);
    });
  });
});
