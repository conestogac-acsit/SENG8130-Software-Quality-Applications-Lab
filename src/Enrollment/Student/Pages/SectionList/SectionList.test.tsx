// src/Enrollment/Student/Pages/SectionList/SectionList.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import SectionList from "./SectionList";

jest.mock("../../studentData/getSections", () => ({
  getSections: () => ["Math 101 - A", "Science 202 - B", "History 303 - C"],
}));

/**
 * Unit tests for SectionList component.
 *
 * This test suite ensures that the SectionList UI renders expected elements,
 * such as the heading and list of section links. The getSections service is
 * mocked to isolate the component from actual data sources.
 *
 * Notes:
 * - Tests are written using React Testing Library.
 * - No CSV or upload functionality is tested.
 */
describe("SectionList Component", () => {
  test("renders the section list heading", () => {
    render(<SectionList />);
    expect(screen.getByText("Section List")).toBeInTheDocument();
  });

  test("renders section links from mock data", () => {
    render(<SectionList />);
    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(3);
    expect(links[0]).toHaveTextContent("Math 101 - A");
    expect(links[1]).toHaveTextContent("Science 202 - B");
    expect(links[2]).toHaveTextContent("History 303 - C");
  });
});
