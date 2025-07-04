import { findStudentById } from "./findStudentById";
import { Student } from "./studentTypes";
import { Email } from "./Email";

describe("findStudentById", () => {
  const students: Student[] = [
    {
      id: "1",
      name: "Alice",
      email: new Email("alice@example.com"),
      group: "A",
      role: "Student",
      section: "101",
      imageUrl: "https://placehold.co/100x100",
      notes: "Top performer",
      isLoopEnrolled: true,
      isGithubEnrolled: false,
    },
  ];

  const validGetter = () => students;

  it("should returns the correct student when ID exists", () => {
    const result = findStudentById("1", validGetter);
    expect(result).toBeDefined();
    expect(result?.id).toBe("1");
    expect(result?.name).toBe("Alice");
  });
  it("should returns undefined when ID does not exist", () => {
    const result = findStudentById("999", validGetter);
    expect(result).toBeUndefined();
  });
});
