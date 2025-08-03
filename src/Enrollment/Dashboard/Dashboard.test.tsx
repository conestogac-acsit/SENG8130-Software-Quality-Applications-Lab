import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

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
  it("shows Enrollment Visualization when link is clicked", () => {
    const showLink = screen.getByRole("link", { name: /Show Enrollment Visualization/i });
    fireEvent.click(showLink);

    expect(screen.getByText(/Export Dashboard/i)).toBeInTheDocument(); // From EnrollStatusVisual
    expect(screen.getByText(/Back to Dashboard/i)).toBeInTheDocument();
  });

  it("returns to dashboard when Back to Dashboard is clicked", () => {
    fireEvent.click(screen.getByText(/Show Enrollment Visualization/i));
    fireEvent.click(screen.getByText(/Back to Dashboard/i));

    expect(screen.getByText(/Welcome to the Dashboard!/i)).toBeInTheDocument();
  });
});
