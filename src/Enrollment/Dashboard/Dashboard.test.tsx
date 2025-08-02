import { fireEvent, render, screen } from "@testing-library/react";
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

    it("contains upload button", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /upload/i })).toBeInTheDocument();
  });

  it("contains link to home page", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /home page/i })).toBeInTheDocument();
  });

   it("opens modal when upload button is clicked", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const uploadButton = screen.getByRole("button", { name: /upload/i });
    fireEvent.click(uploadButton);

    expect(screen.getByText(/Upload Student CSV/i)).toBeInTheDocument();
  });
});
