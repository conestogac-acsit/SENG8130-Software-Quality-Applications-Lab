import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Layout Component", () => {
  test("renders sidebar and dashboard label", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByText("Student Portal")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
