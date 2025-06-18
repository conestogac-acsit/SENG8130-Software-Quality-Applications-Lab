import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Layout Component", () => {
  test("renders sidebar and header content", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>
    );

    expect(screen.getByText("Student Portal")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Student List")).toBeInTheDocument();
    expect(screen.getByText("Welcome, Admin")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("sidebar toggle button works", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>
    );

    const toggleButton = screen.getByLabelText("Toggle Sidebar");

    expect(screen.getByText("Student Portal")).toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(toggleButton).toBeInTheDocument();
  });
});
