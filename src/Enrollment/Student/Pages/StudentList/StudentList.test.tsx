import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EnrollmentDashboard from "../../../Dashboard/Dashboard";

const testStudents = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Student",
    section: "B",
    group: "G2",
    imageUrl: "",
    notes: "",
    isLoopEnrolled: false,
    isGithubEnrolled: false,
  },
];

const STUDENT_DATA_STORAGE_KEY = "students_list_key";

const renderDashboard = (students: any) => {
  localStorage.setItem(STUDENT_DATA_STORAGE_KEY, JSON.stringify(students));
  render(
    <MemoryRouter initialEntries={["/enrollment"]}>
      <Routes>
        <Route path="/enrollment" element={<EnrollmentDashboard />}></Route>
      </Routes>
    </MemoryRouter>
  );
};

describe("StudentList Component (UI Test - Column Names and Pagination)", () => {
  beforeEach(() => {
    localStorage.clear();
    renderDashboard(testStudents);
  });

  it('renders the "Name" column', () => {
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
  it('renders the "Email" column', () => {
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
  it('renders the "Role" column', () => {
    expect(screen.getByText("Role")).toBeInTheDocument();
  });
  it('renders the "Section" column', () => {
    expect(screen.getByText("Section")).toBeInTheDocument();
  });
  it('renders the "Group" column', () => {
    expect(screen.getByText("Group")).toBeInTheDocument();
  });
  it('renders the "Actions" column', () => {
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });
  it('renders the "Prev" button', () => {
    expect(screen.getByText("Prev")).toBeInTheDocument();
  });
  it('renders the "Next" button', () => {
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
  it("renders a student row with data", () => {
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("Student")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("G2")).toBeInTheDocument();
  });
  it("renders email button correctly", () => {
    const emailButton = screen.getByRole("button", { name: "✉️" });
    expect(emailButton).toBeInTheDocument();
  });
  it("shows pagination summary", () => {
    expect(screen.getByText(/Showing 1–1 of 1 students/)).toBeInTheDocument();
  });
});

describe("StudentList Component - Empty State & Edge Cases", () => {
  beforeEach(() => {
    localStorage.clear();
    renderDashboard([]);
  });

  it('renders "No students found." when list is empty', () => {
    const noStudentMessages = screen.getAllByText("No students found.");
    expect(noStudentMessages.length).toBeGreaterThanOrEqual(1);
  });
  it("shows correct pagination when empty", async () => {
    expect(
      await screen.findByText(/Showing 1–0 of 0 students/)
    ).toBeInTheDocument();
  });
});