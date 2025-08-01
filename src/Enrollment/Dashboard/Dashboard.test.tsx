import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
};

describe("Dashboard Component", () => {
  it("navigates to /student/enroll when clicking 'upload'", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <>
                <Dashboard />
                <LocationDisplay />
              </>
            }
          />
          <Route path="/student/enroll" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("upload"));
    expect(screen.getByTestId("location")).toHaveTextContent("/student/enroll");
  });

  it("navigates to / when clicking 'home page'", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <>
                <Dashboard />
                <LocationDisplay />
              </>
            }
          />
          <Route path="/" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("home page"));
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });
});
