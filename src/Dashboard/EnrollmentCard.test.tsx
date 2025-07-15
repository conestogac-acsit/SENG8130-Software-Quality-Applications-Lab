import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EnrollmentCard from "./EnrollmentCard";

test("renders enrollment card and label", () => {
  render(
    <MemoryRouter>
      <EnrollmentCard />
    </MemoryRouter>
  );

  expect(screen.getByText(/Student Enrollment/i)).toBeInTheDocument();
});
