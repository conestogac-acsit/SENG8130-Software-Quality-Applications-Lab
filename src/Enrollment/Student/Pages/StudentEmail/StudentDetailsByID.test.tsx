import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Student } from "../../studentData/studentTypes";
import { Email } from "../../studentData/email";
import StudentDetailsByID from "./StudentDetailsByID";

const testStudents: Student[] = [
  {
    id: "s1",
    name: "Alice",
    email: new Email("alice@example.com"),
    group: "G1",
    role: "Student",
    section: "A",
    imageUrl: "https://placehold.co/100",
    notes: "Top student",
    isLoopEnrolled: true,
    isGithubEnrolled: false,
  },
];

describe("StudentDetailsByID", () => {
  it("renders Studentdetails when student is found", () => {
    render(
      <MemoryRouter initialEntries={["/students/s1"]}>
        <Routes>
          <Route
            path="/students/:id"
            element={
              <StudentDetailsByID />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("Student Details")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("G1")).toBeInTheDocument();
    expect(screen.getByText("Top student")).toBeInTheDocument();
  });
  it("shows message if no ID is provided in URL", () => {
    render(
      <MemoryRouter initialEntries={["/students"]}>
        <Routes>
          <Route
            path="/students"
            element={<StudentDetailsByID />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/No student ID provided in URL/i)
    ).toBeInTheDocument();
  });
  it("shows error message if student not found for given ID", () => {
    render(
      <MemoryRouter initialEntries={["/students/unknown"]}>
        <Routes>
          <Route
            path="/students/:id"
            element={<StudentDetailsByID />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Student not found/i)
    ).toBeInTheDocument();
  });
});