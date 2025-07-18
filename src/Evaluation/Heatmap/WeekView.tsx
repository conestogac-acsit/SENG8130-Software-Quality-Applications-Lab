import React, { useMemo } from "react";
import { Evaluation } from "../EvaluationService";

type WeekViewProps = {
  year: number;
  month: number;
  evaluations: Evaluation[];
};

const WeekView: React.FC<WeekViewProps> = ({ year, month, evaluations }) => {
  return <div>Placeholder for weekview</div>;
};

export default WeekView;
