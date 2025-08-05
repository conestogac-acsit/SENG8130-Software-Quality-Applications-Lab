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

  test("renders two rows when no sections exist", () => {
    render(<SectionList />);
    const sectionRows = screen.getAllByRole("row");
    expect(sectionRows.length).toBe(2);
  });

  test("renders the search input field", () => {
    render(<SectionList />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("updates search input value on change", () => {
    render(<SectionList />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
  });
});
