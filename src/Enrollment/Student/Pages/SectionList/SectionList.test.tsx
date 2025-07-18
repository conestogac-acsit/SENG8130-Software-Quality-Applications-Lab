import React from "react";
import { render, screen } from "@testing-library/react";
import SectionList from "./SectionList";

describe("SectionList", () => {
  test("renders the section list heading", () => {
    render(<SectionList />);
    expect(screen.getByText("Section List")).toBeInTheDocument();
  });

  test("renders unique section names as plain text", () => {
    render(<SectionList />);
    
    expect(screen.getByText("SENG8130-Spring 2025-Section 2")).toBeInTheDocument();
    expect(screen.getByText("PMGT101-Winter 2025-Section 1")).toBeInTheDocument();
  });
});