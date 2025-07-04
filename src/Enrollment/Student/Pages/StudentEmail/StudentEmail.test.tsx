import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Email } from "../../studentData/email";
import { Student } from "../../studentData/studentTypes";
import StudentEmail from "./StudentEmail";

const testStudent: Student = {
  id: "1",
  name: "John Doe",
  email: new Email("john@example.com"),
  group: "A",
  role: "Student",
  section: "101",
  imageUrl: "https://placehold.co/100x100",
  notes: "Test student for verifying email functionality.",
  isLoopEnrolled: true,
  isGithubEnrolled: false,
};

describe("StudentEmail Component", () => {
  it("renders 'Student not found.' when no student exists", () => {
    render(
      <MemoryRouter initialEntries={["/email/1"]}>
        <Routes>
          <Route path="/email/:id" element={<StudentEmail getter={() => []} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Student not found.")).toBeInTheDocument();
  });
  it("renders student details when student exists", () => {
    render(
      <MemoryRouter initialEntries={["/email/1"]}>
        <Routes>
          <Route
            path="/email/:id"
            element={<StudentEmail getter={() => [testStudent]} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Test student for verifying email functionality.")).toBeInTheDocument();
  });
});