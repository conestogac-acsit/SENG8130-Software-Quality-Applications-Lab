import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { BrowserRouter } from "react-router-dom";
test("renders dashboard heading and placeholders", () => {
render(
<BrowserRouter>
<Dashboard />
</BrowserRouter>
);
expect(screen.getByText(/SQATE Central Dashboard/i)).toBeInTheDocument();
expect(screen.getAllByText(/Module Placeholder/i)).toHaveLength(3);
});