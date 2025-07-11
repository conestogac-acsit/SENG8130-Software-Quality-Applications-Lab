import React, { useState } from "react";
import Button from "../Button/Button";

interface CalendarPdfExportButtonsProps {
    onExportDaily: () => void;
    onExportWeekly: () => void;
    onExportMonthly: () => void;
    onExportCourse: () => void;
}

const CalendarPdfExportButtons: React.FC<CalendarPdfExportButtonsProps> = ({
    onExportDaily,
    onExportWeekly,
    onExportMonthly,
    onExportCourse,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleExport = (type: string) => {
        setDropdownOpen(false);
        switch (type) {
            case "daily":
                onExportDaily();
                break;
            case "weekly":
                onExportWeekly();
                break;
            case "monthly":
                onExportMonthly();
                break;
            case "course":
                onExportCourse();
                break;
            default:
                break;
        }
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <Button
                label="Export to PDF ▼"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
                <ul
                    style={{
                        position: "absolute",
                        marginTop: "5px",
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        listStyle: "none",
                        padding: "5px",
                        minWidth: "180px",
                        zIndex: 1000,
                    }}
                >
                    <li>
                        <Button
                            label="Export Daily"
                            onClick={() => handleExport("daily")}
                        />
                    </li>
                    <li>
                        <Button
                            label="Export Weekly"
                            onClick={() => handleExport("weekly")}
                        />
                    </li>
                    <li>
                        <Button
                            label="Export Monthly"
                            onClick={() => handleExport("monthly")}
                        />
                    </li>
                    <li>
                        <Button
                            label="Export Entire Course"
                            onClick={() => handleExport("course")}
                        />
                    </li>
                </ul>
            )}
        </div>
    );
};

export default CalendarPdfExportButtons;