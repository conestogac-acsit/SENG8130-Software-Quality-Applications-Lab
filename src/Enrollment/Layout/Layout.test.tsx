import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Layout Component", () => {
  test("renders sidebar and content", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Layout />
      </MemoryRouter>
    );

    // Sidebar content
    expect(screen.getByText("Student Portal")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();

    // Optional: Check if icon is rendered (SVG element from lucide-react)
    const svgIcons = screen.getAllByRole("img", { hidden: true });
    expect(svgIcons.length).toBeGreaterThan(0);
  });
});
