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
              <StudentDetailsByID studentGetter={() => testStudents} />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });
});