import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock the service functions and dependencies
jest.mock("../../Services/findStudentById", () => ({
  findStudentById: jest.fn((id) => ({
    id,
    name: "Test Student",
    imageUrl: "",
    email: "test@student.com",
    section: "A",
    group: "1",
    role: "Member",
    notes: "Initial note",
  })),
}));

const updateStudentMock = jest.fn();
jest.mock("../../Services/uipdateStudent", () => ({
  updateStudent: (student) => updateStudentMock(student),
}));

// Import after mocks!
import StudentEdit from "./StudentEdit";

describe("StudentEdit", () => {
  beforeEach(() => {
    updateStudentMock.mockClear();
    window.alert = jest.fn(); // Mock alert to check for Save
  });

  it("renders form, allows editing and saving", () => {
    render(
      <MemoryRouter initialEntries={["/student-edit/1"]}>
        <Routes>
          <Route path="/student-edit/:id" element={<StudentEdit />} />
        </Routes>
      </MemoryRouter>
    );

    // Field should show initial student data
    expect(screen.getByPlaceholderText("Name")).toHaveValue("Test Student");

    // Change the name
    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Updated Student" } });
    expect(screen.getByPlaceholderText("Name")).toHaveValue("Updated Student");

    // Save
    fireEvent.click(screen.getByText("Save"));
    expect(updateStudentMock).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Student information updated successfully.");
  });

  it("shows not found if student does not exist", () => {
    // Make the mock return undefined for not-found
    jest.spyOn(require("../../Services/findStudentById"), "findStudentById").mockReturnValueOnce(undefined);

    render(
      <MemoryRouter initialEntries={["/student-edit/999"]}>
        <Routes>
          <Route path="/student-edit/:id" element={<StudentEdit />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Student not found/i)).toBeInTheDocument();
  });
});
