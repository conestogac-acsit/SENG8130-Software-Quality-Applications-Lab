import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StudentProfile from "../components/StudentProfile";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// ✅ MOCK <Link>
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

const mockProps = {
  name: "Yash Ketanbhai Shah",
  email: "yash.shah@example.com",
  imageUrl: "https://via.placeholder.com/100",
  grades: [
    {
      subject: "Planning & Validation",
      weight: "8 / 10",
      grade: "80%",
      comment: "More breakdowns needed. Overall good direction.",
    },
    {
      subject: "Milestone #1",
      weight: "0 / 20",
      grade: "0%",
      comment: "Pending submission.",
    },
    {
      subject: "Presentation & Pitch",
      weight: "9 / 10",
      grade: "90%",
      comment: "Excellent delivery and communication.",
    },
  ],
  notes:
    "Student has shown good leadership qualities and is actively participating in project discussions.",
};

describe("StudentProfile Component", () => {
  beforeEach(() => {
    window.confirm = jest.fn(() => true);
    window.alert = jest.fn();
  });

  test("renders student information and grades correctly", () => {
    render(
      <MemoryRouter initialEntries={["/profile/1"]}>
        <Routes>
          <Route path="/profile/:id" element={<StudentProfile {...mockProps} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Yash Ketanbhai Shah")).toBeInTheDocument();
    expect(screen.getByText("Student ID: 1")).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes("yash.shah@example.com"))).toBeInTheDocument();
    expect(screen.getByText("Planning & Validation")).toBeInTheDocument();
    expect(screen.getByText("8 / 10")).toBeInTheDocument();
    expect(screen.getByText("90%")).toBeInTheDocument();
    expect(screen.getByText("Excellent delivery and communication.")).toBeInTheDocument();
  });

  test("shows alert on send email", () => {
    render(
      <MemoryRouter initialEntries={["/profile/1"]}>
        <Routes>
          <Route path="/profile/:id" element={<StudentProfile {...mockProps} />} />
        </Routes>
      </MemoryRouter>
    );

    const sendBtn = screen.getByText("Send Email");
    fireEvent.click(sendBtn);

    expect(window.confirm).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Email sent successfully.");
  });

  test("shows confirmation and alert on delete", () => {
    render(
      <MemoryRouter initialEntries={["/profile/1"]}>
        <Routes>
          <Route path="/profile/:id" element={<StudentProfile {...mockProps} />} />
        </Routes>
      </MemoryRouter>
    );

    const deleteBtn = screen.getByText("Delete Student");
    fireEvent.click(deleteBtn);

    expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to delete this student?");
    expect(window.alert).toHaveBeenCalledWith("Student deleted successfully.");
  });
});
