import React from "react";
import { render, screen } from "@testing-library/react";
import { EvaluationReportTemplate } from "./PdfTemplates";
import { EvaluationReport } from "./PdfExportTypes";
import { Evaluation } from "../Evaluation/EvaluationService";

describe("EvaluationReportTemplate", () => {
    const dummyEvaluation: Evaluation = {
        course: "PROG8051",
        title: "Assignment 1",
        type: "Assignment",
        weight: 110,
        dueDate: new Date("2025-07-10"),
        instructor: "Jane Doe",
        campus: "Milton",
    };

    const report: EvaluationReport = {
        reportDate: "2025-07-10",
        totalCourses: 1,
        courseSummaries: [
            {
                course: "PROG8051",
                isOverloaded: true,
                weeks: [
                    {
                        weekStart: "2025-07-07",
                        weekEnd: "2025-07-13",
                        evaluations: [dummyEvaluation],
                    },
                ],
            },
        ],
    };

    it("renders report heading and date", () => {
        render(<EvaluationReportTemplate report={report} />);
        expect(
            screen.getByText(/SQATE Evaluation Report/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Date:/i)).toHaveTextContent(
            "2025-07-10"
        );
    });

    it("renders course name", () => {
        render(<EvaluationReportTemplate report={report} />);
        expect(screen.getByText("PROG8051")).toBeInTheDocument();
    });

    it("renders overload indicator in red for overloaded courses", () => {
        render(<EvaluationReportTemplate report={report} />);

        const overloadElement = screen.getByTestId(
            "total-weight-PROG8051"
        );

        expect(overloadElement).toHaveTextContent("110%");
        expect(overloadElement).toHaveStyle("color: rgb(255, 0, 0)");
    });

    it("renders weeks and evaluations", () => {
        render(<EvaluationReportTemplate report={report} />);
        expect(
            screen.getByText("Week: 2025-07-07 - 2025-07-13")
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Assignment 1/i)
        ).toBeInTheDocument();

        const weightElement = screen.getByTestId(
            "total-weight-PROG8051"
        );
        expect(weightElement).toHaveTextContent("110%");
    });

    it("renders message for empty evaluations", () => {
        const emptyReport: EvaluationReport = {
            reportDate: "2025-07-10",
            totalCourses: 1,
            courseSummaries: [
                {
                    course: "PROG8051",
                    isOverloaded: false,
                    weeks: [
                        {
                            weekStart: "2025-07-07",
                            weekEnd: "2025-07-13",
                            evaluations: [],
                        },
                    ],
                },
            ],
        };

        render(
            <EvaluationReportTemplate report={emptyReport} />
        );
        expect(
            screen.getByText(/No evaluations/i)
        ).toBeInTheDocument();
    });
});