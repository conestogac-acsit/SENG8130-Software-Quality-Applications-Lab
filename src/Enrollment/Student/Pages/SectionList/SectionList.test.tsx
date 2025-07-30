import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SectionList from "./SectionList";

describe("SectionList Component", () => {
  test("renders the main heading", () => {
    render(<SectionList />);
    expect(screen.getByRole("heading", { name: "Section List" })).toBeInTheDocument();
  });

  test("renders the table with section header", () => {
    render(<SectionList />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Section")).toBeInTheDocument();
  });

  test("shows 'No sections available' when no sections are present", () => {
    render(<SectionList />);
    expect(screen.getByText("No sections available")).toBeInTheDocument();
  });

  test("does not render any section rows", () => {
    render(<SectionList />);
    const sectionRows = screen.queryAllByRole("row");
    expect(sectionRows.length).toBe(2); // 1 for header, 1 for empty row
  });

  test("renders the search input field", () => {
    render(<SectionList />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  test("updates search input value on change", () => {
    render(<SectionList />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
  });
});