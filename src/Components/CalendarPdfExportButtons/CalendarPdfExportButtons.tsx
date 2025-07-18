import React from "react";
import { Evaluation } from "../../Evaluation/EvaluationService";

type DailyData = { date: string; evaluations: Evaluation[] }[];
type WeeklyData = { weekStart: string; evaluations: Evaluation[] }[];
type MonthlyData = { month: string; evaluations: Evaluation[] }[];
type CourseData = { course: string; evaluations: Evaluation[] }[];

interface Props {
  dailyData: DailyData;
  weeklyData: WeeklyData;
  monthlyData: MonthlyData;
  courseData: CourseData;
}

const CalendarPdfExportButtons: React.FC<Props> = ({
  dailyData,
  weeklyData,
  monthlyData,
  courseData,
}) => {
  const handleExportDaily = () => {
    console.log("Exporting Daily View to PDF...");
    // Future export logic
  };

  const handleExportWeekly = () => {
    console.log("Exporting Weekly View to PDF...");
  };

  const handleExportMonthly = () => {
    console.log("Exporting Monthly View to PDF...");
  };

  const handleExportCourse = () => {
    console.log("Exporting Entire Course to PDF...");
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <button onClick={handleExportDaily} className="btn">Export Daily PDF</button>
      <button onClick={handleExportWeekly} className="btn">Export Weekly PDF</button>
      <button onClick={handleExportMonthly} className="btn">Export Monthly PDF</button>
      <button onClick={handleExportCourse} className="btn">Export Entire Course PDF</button>
    </div>
  );
};

export default CalendarPdfExportButtons;
