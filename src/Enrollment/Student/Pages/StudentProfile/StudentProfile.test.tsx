import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import StudentProfile from "./StudentProfile";

// Mock student service
jest.mock("../../Services/findStudentById", () => ({
  findStudentById: jest.fn(() => ({
    id: "1",
    name: "Maharshi Purohit",
    email: "Maharshi.Purohit@example.com",
    imageUrl: "https://via.placeholder.com/100",
    notes: "Student has shown good leadership qualities and is actively participating in project discussions.",
  })),
}));

jest.mock("../../Services/deleteStudentById", () => ({
  deleteStudentById: jest.fn(),
}));

// Mock to avoid real navigation
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    Link: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  };
});

describe("StudentProfile Component", () => {
  beforeEach(() => {
    window.confirm = jest.fn(() => true);
    window.alert = jest.fn();
  });

  test("renders student information", () => {
    render(
      <MemoryRouter initialEntries={["/profile/1"]}>
        <Routes>
          <Route path="/profile/:id" element={<StudentProfile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Maharshi Purohit")).toBeInTheDocument();
    expect(screen.getByText("Student ID: 1")).toBeInTheDocument();
    expect(screen.getByText("Email: Maharshi.Purohit@example.com")).toBeInTheDocument();
    expect(screen.getByText(/leadership qualities/)).toBeInTheDocument();
  });

  test("handles Delete Student action", () => {
    render(
      <MemoryRouter initialEntries={["/profile/1"]}>
        <Routes>
          <Route path="/profile/:id" element={<StudentProfile />} />
        </Routes>
      </MemoryRouter>
    );

    const deleteBtn = screen.getByText("Delete Student");
    fireEvent.click(deleteBtn);

    expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to delete this student?");
    expect(window.alert).toHaveBeenCalledWith("Student deleted successfully.");
  });
});
