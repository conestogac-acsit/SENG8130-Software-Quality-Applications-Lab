import React, { useEffect, useState } from 'react';
import { Evaluation } from '../../Evaluation/EvaluationService';
import {
  shouldDisplayAlerts,
  getWeeklyThreshold,
  getAlertSummary
} from './AlertUtils';

type AlertProps = {
  evaluations: Evaluation[];
};

const ThresholdAlertUI: React.FC<AlertProps> = ({ evaluations }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [summary, setSummary] = useState('');
  const [submittedInstructors, setSubmittedInstructors] = useState<string[]>([]);

  useEffect(() => {
    if (!evaluations || evaluations.length === 0) {
      setShowAlert(false);
      setSummary('');
      setSubmittedInstructors([]);
      return;
    }

    const alertNeeded = shouldDisplayAlerts(evaluations);
    setShowAlert(alertNeeded);
    setSummary(alertNeeded ? getAlertSummary(evaluations, getWeeklyThreshold()) : '');

    const instructors = Array.from(new Set(evaluations.map(ev => ev.instructor)));
    setSubmittedInstructors(instructors);
  }, [evaluations]);

  return (
    <div className="space-y-4">
      {showAlert && (
        <div className="bg-yellow-200 p-3 rounded-md font-bold mb-2">
          Some weeks exceed the configured threshold of {getWeeklyThreshold()} evaluations.
          <pre className="font-normal mt-2 whitespace-pre-wrap">
            {summary}
          </pre>
        </div>
      )}

      <div>
        <h2 className="font-semibold text-lg mb-1">Instructors with Submissions</h2>
        <ul className="list-disc list-inside space-y-1">
          {submittedInstructors.map((instructor) => (
            <li key={instructor}>{instructor}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-1">Evaluation List</h2>
        <ul className="list-disc list-inside space-y-1">
          {evaluations.map((ev, idx) => (
            <li key={idx}>
              {ev.course} — {ev.title} ({ev.type}) due on {new Date(ev.dueDate).toDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThresholdAlertUI;
