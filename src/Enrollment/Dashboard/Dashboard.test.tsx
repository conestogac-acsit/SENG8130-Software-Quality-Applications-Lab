import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

const mockStudents = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Student', section: 'A', group: '1' },
  { id: '2', name: 'Bob', email: 'bob@example.com', role: 'Student', section: 'B', group: '2' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com', role: 'Student', section: 'C', group: '3' },
  { id: '4', name: 'David', email: 'david@example.com', role: 'Student', section: 'D', group: '4' }
];

beforeEach(() => {
  localStorage.setItem("students_list_key", JSON.stringify(mockStudents));
});

afterEach(() => {
  localStorage.removeItem("students_list_key");
});

describe("Dashboard Component", () => {
  it("renders welcome message", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to the Dashboard!/i)).toBeInTheDocument();
  });

  it("contains link to upload student", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /upload/i })).toBeInTheDocument();
  });

  it("contains link to home page", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /home page/i })).toBeInTheDocument();
  });
  it("should render the StudentList component", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.getByText('David')).toBeInTheDocument();
  });
});
