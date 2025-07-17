// src/Enrollment/Layout/Layout.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Layout Component", () => {
  test("renders sidebar and dashboard link", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    const svgIcon = screen.getByTestId("dashboard-icon");
    expect(svgIcon).toBeInTheDocument();
  });
});
