// src/Enrollment/Student/Pages/SectionList/SectionList.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

  test("sorts sections correctly when dropdown is changed", () => {
    render(<SectionList />);

    // Dropdown is rendered
    const dropdown = screen.getByLabelText(/sort by/i);
    expect(dropdown).toBeInTheDocument();

    // Initially sorted A → Z
    let links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("PMGT101-Winter 2025-Section 1");
    expect(links[1]).toHaveTextContent("SENG8130-Spring 2025-Section 2");

    // Change sort to Z → A
    fireEvent.change(dropdown, { target: { value: "desc" } });

    // Check if list updates
    links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("SENG8130-Spring 2025-Section 2");
    expect(links[1]).toHaveTextContent("PMGT101-Winter 2025-Section 1");
  });
});
