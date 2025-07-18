import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import WeekView from "./WeekView";

type HeatmapProps = {};

const Heatmap: React.FC<HeatmapProps> = () => {
  const currentDate = new Date();
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());

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

        <Button
          onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}
          label={`Switch to ${
            viewMode === "month" ? "Week View" : "Month View"
          }`}
        />
      </div>
      <div>
        {viewMode === 'week' ? (<WeekView year={year} month={month} />): null}
      </div>
    </div>
  );
};

export default Heatmap;
