// src/Enrollment/Layout/Layout.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { BrowserRouter } from "react-router-dom";


describe("Layout Component", () => {
  test("renders sidebar and dashboard link", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();

    const svgIcon = screen.getByTestId("dashboard-icon");
    expect(svgIcon).toBeInTheDocument();
  });
});
