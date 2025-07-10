import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EvaluationCard from "./EvaluationCard";
test("renders evaluation service card", () => {
render(
<MemoryRouter>
<EvaluationCard />
</MemoryRouter>
);
expect(screen.getByText(/Evaluation Service/i)).toBeInTheDocument();
});