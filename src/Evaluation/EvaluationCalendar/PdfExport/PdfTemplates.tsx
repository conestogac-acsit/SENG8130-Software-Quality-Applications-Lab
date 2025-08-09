import React from "react";
import { EvaluationReport } from "./PdfExportTypes";

export const EvaluationReportTemplate = ({
    report,
}: {
    report: EvaluationReport;
}) => (
    <div
        style={{
            fontFamily: "Arial, sans-serif",
            padding: "20px",
        }}
    >
        <h1
            style={{
                fontSize: "24px",
                marginBottom: "20px",
            }}
        >
            SQATE Evaluation Report
        </h1>

        <p>Date: {report.reportDate}</p>
        <p>Total Courses: {report.totalCourses}</p>

        {report.courseSummaries.map((courseSummary) => {
            const totalWeight = courseSummary.weeks.reduce(
                (sum, w) =>
                    sum +
                    w.evaluations.reduce(
                        (s, ev) => s + (ev.weight || 0),
                        0
                    ),
                0
            );

            return (
                <div
                    key={courseSummary.course}
                    style={{ marginTop: "30px" }}
                >
                    <h2
                        style={{
                            fontSize: "18px",
                            color: "#333",
                        }}
                    >
                        {courseSummary.course}
                    </h2>
                    <p>
                        Total Weight:{" "}
                        <span
                            data-testid={`total-weight-${courseSummary.course}`}
                            style={{
                                color: courseSummary.isOverloaded
                                    ? "red"
                                    : "green",
                                fontWeight: "bold",
                            }}
                        >
                            {totalWeight}%
                        </span>
                    </p>

                    {courseSummary.weeks.map((week) => (
                        <div
                            key={week.weekStart}
                            style={{
                                border: "1px solid #ddd",
                                padding: "10px",
                                marginTop: "10px",
                            }}
                        >
                            <strong>
                                Week: {week.weekStart} - {week.weekEnd}
                            </strong>
                            <ul
                                style={{
                                    marginTop: "5px",
                                }}
                            >
                                {week.evaluations.length === 0 ? (
                                    <li
                                        style={{
                                            color: "#888",
                                        }}
                                    >
                                        No evaluations
                                    </li>
                                ) : (
                                    week.evaluations.map((ev) => (
                                        <li
                                            key={
                                                ev.title +
                                                ev.dueDate.toISOString()
                                            }
                                        >
                                            {ev.title} ({ev.type}) - Weight:{" "}
                                            {ev.weight}%
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            );
        })}
    </div>
);
