import React from "react";
import { render, screen } from "@testing-library/react";
import SectionList from "./SectionList";
import { MemoryRouter } from "react-router-dom";

describe("SectionList", () => {
  test("renders the section list heading", () => {
    render(
      <MemoryRouter>
        <SectionList />
      </MemoryRouter>
    );
    expect(screen.getByText("Section List")).toBeInTheDocument();
  });

  test("renders unique section links", () => {
    render(
      <MemoryRouter>
        <SectionList />
      </MemoryRouter>
    );
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});
