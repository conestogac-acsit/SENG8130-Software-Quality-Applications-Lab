import React from "react";

interface Props {
  onExportDaily: () => void;
  onExportWeekly: () => void;
  onExportMonthly: () => void;
  onExportCourse: () => void;
}

const CalendarPdfExportButtons: React.FC<Props> = ({
  onExportDaily,
  onExportWeekly,
  onExportMonthly,
  onExportCourse,
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      <button onClick={onExportDaily} className="btn">Export Daily PDF</button>
      <button onClick={onExportWeekly} className="btn">Export Weekly PDF</button>
      <button onClick={onExportMonthly} className="btn">Export Monthly PDF</button>
      <button onClick={onExportCourse} className="btn">Export Entire Course PDF</button>
    </div>
  );
};

export default CalendarPdfExportButtons;