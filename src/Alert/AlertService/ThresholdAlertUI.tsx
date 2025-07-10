import React, { useEffect, useState } from 'react';
import { Evaluation } from '../../Evaluation/EvaluationService';
import { shouldDisplayAlerts } from './alertThresholdService';
import { getAlertSummary } from './AlertSummaryReport';
import { getWeeklyThreshold } from './alertThresholdService';
import { getInstructorSubmissionStatus } from './submissionTracker';

type AlertProps  = {
  evaluations: Evaluation[];
};

const ThresholdAlertUI: React.FC<AlertProps > = ({ evaluations }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [summary, setSummary] = useState<string>('');
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const alertNeeded = shouldDisplayAlerts(evaluations);
    setShowAlert(alertNeeded);
    setSummary(alertNeeded ? getAlertSummary(evaluations) : '');

    const instructors = Array.from(new Set(evaluations.map(ev => ev.instructor)));
    const statuses = getInstructorSubmissionStatus(evaluations, instructors);
    setStatusMap(statuses);
  }, [evaluations]);

  return (
    <div>
      {showAlert && (
        <div
          id="alert-box"
          style={{
            backgroundColor: '#ffcc00',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}
        >
          Some weeks exceed the configured threshold of {getWeeklyThreshold()} evaluations.
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: '10px', fontWeight: 'normal' }}>
            {summary}
          </pre>
        </div>
      )}

      <h2>Instructor Submission Status</h2>
      <ul>
        {Object.entries(statusMap).map(([instructor, status]) => (
          <li key={instructor}>
            {instructor}: <strong>{status}</strong>
          </li>
        ))}
      </ul>

      <h2>Evaluation List</h2>
      <ul>
        {evaluations.map((ev, index) => (
          <li key={index}>
            {ev.course} – {ev.title} ({ev.type}) due on {ev.dueDate.toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
