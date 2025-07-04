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
});