import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CalendarPdfExportButtons from "./CalendarPdfExportButtons";

describe("CalendarPdfExportButtons", () => {
    let onExportDaily: jest.Mock;
    let onExportWeekly: jest.Mock;
    let onExportMonthly: jest.Mock;
    let onExportCourse: jest.Mock;

    beforeEach(() => {
        onExportDaily = jest.fn();
        onExportWeekly = jest.fn();
        onExportMonthly = jest.fn();
        onExportCourse = jest.fn();

        render(
            <CalendarPdfExportButtons
                onExportDaily={onExportDaily}
                onExportWeekly={onExportWeekly}
                onExportMonthly={onExportMonthly}
                onExportCourse={onExportCourse}
            />
        );
    });

    it("renders the Export to PDF button", () => {
        expect(screen.getByRole("button", { name: /export to pdf/i })).toBeInTheDocument();
    });

    it("opens and closes dropdown menu when Export to PDF button is clicked", () => {
        const exportButton = screen.getByRole("button", { name: /export to pdf/i });
        fireEvent.click(exportButton);
        expect(screen.getByRole("button", { name: /export daily/i })).toBeInTheDocument();

        // Click again to close dropdown
        fireEvent.click(exportButton);
        expect(screen.queryByRole("button", { name: /export daily/i })).not.toBeInTheDocument();
    });

    it("calls onExportDaily when Export Daily is clicked", () => {
        fireEvent.click(screen.getByRole("button", { name: /export to pdf/i }));
        fireEvent.click(screen.getByRole("button", { name: /export daily/i }));
        expect(onExportDaily).toHaveBeenCalledTimes(1);
    });

    it("calls onExportWeekly when Export Weekly is clicked", () => {
        fireEvent.click(screen.getByRole("button", { name: /export to pdf/i }));
        fireEvent.click(screen.getByRole("button", { name: /export weekly/i }));
        expect(onExportWeekly).toHaveBeenCalledTimes(1);
    });

    it("calls onExportMonthly when Export Monthly is clicked", () => {
        fireEvent.click(screen.getByRole("button", { name: /export to pdf/i }));
        fireEvent.click(screen.getByRole("button", { name: /export monthly/i }));
        expect(onExportMonthly).toHaveBeenCalledTimes(1);
    });

    it("calls onExportCourse when Export Entire Course is clicked", () => {
        fireEvent.click(screen.getByRole("button", { name: /export to pdf/i }));
        fireEvent.click(screen.getByRole("button", { name: /export entire course/i }));
        expect(onExportCourse).toHaveBeenCalledTimes(1);
    });

    it("closes dropdown after selecting an option", () => {
        fireEvent.click(screen.getByRole("button", { name: /export to pdf/i }));
        fireEvent.click(screen.getByRole("button", { name: /export daily/i }));
        expect(screen.queryByRole("button", { name: /export daily/i })).not.toBeInTheDocument();
    });
});