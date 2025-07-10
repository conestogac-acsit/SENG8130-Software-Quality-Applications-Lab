import React, { useState } from "react";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import { Evaluation } from "../EvaluationService";

type HeatmapProps = {
  evaluations: Evaluation[];
};

const Heatmap: React.FC<HeatmapProps> = ({ evaluations }) => {
  const currentDate = new Date();
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth()); // 0-based

  const yearsToChoose = [year - 1, year, year + 1];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <label>
          <span className="mr-2">Year:</span>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {yearsToChoose.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        {viewMode === "week" && (
          <label>
            <span className="mr-2">Month:</span>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </label>
        )}

        <button
          onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Switch to {viewMode === "month" ? "Week View" : "Month View"}
        </button>
      </div>

      <div>
        {viewMode === "month" ? (
          <MonthView year={year} evaluations={evaluations} />
        ) : (
          <WeekView year={year} month={month} evaluations={evaluations} />
        )}
      </div>
    </div>
  );
};

export default Heatmap;
