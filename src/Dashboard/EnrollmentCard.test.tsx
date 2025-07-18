import { render, screen, fireEvent } from "@testing-library/react";
import EnrollmentCard from "./EnrollmentCard";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("EnrollmentCard component", () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });

  test("renders enrollment card and label", () => {
    render(<EnrollmentCard />);
    expect(screen.getByText(/Student Enrollment/i)).toBeInTheDocument();
  });

  test("navigates to /enrollment on click", () => {
    render(<EnrollmentCard />);
    const card = screen.getByText(/Student Enrollment/i).parentElement;
    expect(card).toBeInTheDocument();

    if (card) {
      fireEvent.click(card);
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/enrollment");
    }
  });
});
