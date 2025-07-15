// src/Enrollment/Student/Pages/SectionList/SectionList.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import SectionList from "./SectionList";

describe("SectionList", () => {
  test("renders the section list heading", () => {
    render(<SectionList />);
    expect(screen.getByText("Section List")).toBeInTheDocument();
  });

  test("renders unique section links", () => {
    render(<SectionList />);
    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent("SENG8130-Spring 2025-Section 2");
    expect(links[1]).toHaveTextContent("PMGT101-Winter 2025-Section 1");
  });
});
