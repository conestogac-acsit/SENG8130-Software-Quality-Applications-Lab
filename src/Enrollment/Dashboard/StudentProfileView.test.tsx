import React from "react";
import { render, screen } from "@testing-library/react";
import StudentProfileView from "./StudentProfileView";

describe("StudentProfileView", () => {
  it("renders the student profile heading", () => {
    render(<StudentProfileView />);
    expect(screen.getByText("Student Profile")).toBeInTheDocument();
  });

  it("renders the student name", () => {
    render(<StudentProfileView />);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
  });
});
