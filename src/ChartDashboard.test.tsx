import { render, screen, fireEvent } from "@testing-library/react";
import ChartDashboard from "./ChartDashboard";
import { Student } from "./Student";
import '@testing-library/jest-dom';

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("ChartDashboard", () => {
  const mockGithub: Student[] = [
    { Email: 'gh@example.com', 'First Name': 'GH', 'Last Name': 'User', 'Student ID': '101', Role: 'student', Status: 'enrolled' },
  ];
  const mockLoop: Student[] = [
    { Email: 'lp@example.com', 'First Name': 'LP', 'Last Name': 'User', 'Student ID': '102', Role: 'student', Status: 'unenrolled' },
  ];

  it("renders all chart headers", () => {
    render(<ChartDashboard github={mockGithub} loop={mockLoop} onBack={jest.fn()} />);
    expect(screen.getByText(/Enrollment Status Comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/Enrollment Trends/i)).toBeInTheDocument();
    expect(screen.getByText(/Status Distribution/i)).toBeInTheDocument();
  });

  it("renders back button and triggers on click", () => {
    const mockBack = jest.fn();
    render(<ChartDashboard github={mockGithub} loop={mockLoop} onBack={mockBack} />);
    const backButton = screen.getByText(/← Back to Main/i);
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(mockBack).toHaveBeenCalled();
  });
});