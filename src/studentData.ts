const allStudents = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Student", section: "", group: "" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Student", section: "", group: "" },
  { id: "3", name: "Alice Patel", email: "alice@school.com", role: "Student", section: "", group: "" },
];

/* ---------------------------- RESTORE DATA ON LOAD ---------------------------- */
const storedStudents = localStorage.getItem("students");
if (storedStudents) {
  const parsed = JSON.parse(storedStudents);
  parsed.forEach((updatedStudent: any) => {
    const target = allStudents.find((s) => s.id === updatedStudent.id);
    if (target) {
      target.section = updatedStudent.section;
      target.group = updatedStudent.group;
    }
  });
}

/* ---------------------------- EXPORTS ---------------------------- */

export function getStudents(page = 1, pageSize = 10) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: allStudents.slice(start, end),
    total: allStudents.length,
    totalPages: Math.ceil(allStudents.length / pageSize),
  };
}

export function updateStudentSection(studentId: string, newSection: string) {
  const student = allStudents.find((s) => s.id === studentId);
  if (student) {
    student.section = newSection;
  }
}

export function updateStudentSectionPersisted(studentId: string, newSection: string) {
  const student = allStudents.find((s) => s.id === studentId);
  if (student) {
    student.section = newSection;

    // Save updated data
    localStorage.setItem("students", JSON.stringify(allStudents));

    // Log update
    const logEntry = `[${new Date().toISOString()}] Section changed: ${student.name} → ${newSection}`;
    console.log(logEntry);

    const logs = JSON.parse(localStorage.getItem("logs") || "[]");
    logs.push(logEntry);
    localStorage.setItem("logs", JSON.stringify(logs));
  }
}
