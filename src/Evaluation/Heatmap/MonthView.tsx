import React, { useMemo } from "react";
import { Evaluation } from "../EvaluationService";

type MonthViewProps = {
  year: number;
  evaluations: Evaluation[];
};

const MonthView: React.FC<MonthViewProps> = ({ year, evaluations }) => {
  return <div>Placeholder for Monthview</div>;
};

export default MonthView;
