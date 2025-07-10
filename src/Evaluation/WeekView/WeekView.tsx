import React, { useMemo } from 'react';
import { Evaluation } from '../EvaluationService';

type WeekViewProps = {
  year: number;
  month: number;
  evaluations: Evaluation[];
};

export default WeekView;