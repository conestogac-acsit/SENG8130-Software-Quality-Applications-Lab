import { render, screen } from "@testing-library/react";
import BaseLayout from "./BaseLayout";
test("renders dashboard heading", () => {
render(<BaseLayout />);
expect(screen.getByText(/SQATE Central Dashboard/i)).toBeInTheDocument();
});