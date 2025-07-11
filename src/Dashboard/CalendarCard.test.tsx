import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CalendarCard from "./CalendarCard";
test("renders evaluation calendar card", () => {
render(
<MemoryRouter>
<CalendarCard />
</MemoryRouter>
);
expect(screen.getByText(/Evaluation Calendar/i)).toBeInTheDocument();
});