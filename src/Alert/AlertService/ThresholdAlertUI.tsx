import React, { useEffect, useState } from 'react';
import { shouldDisplayAlerts, getWeeklyThreshold } from './alertThresholdService';
import { Evaluation } from '../../Evaluation/EvaluationService';

type Props = {
  evaluations: Evaluation[];
};

const ThresholdAlertUI: React.FC<Props> = ({ evaluations }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alertNeeded = shouldDisplayAlerts(evaluations);
    setShowAlert(alertNeeded);
  }, [evaluations]);

  return (
    <div>
      {showAlert && (
        <div id="alert-box" style={{ backgroundColor: '#ffcc00', padding: '10px', marginBottom: '10px' }}>
          Some weeks exceed the configured threshold of {getWeeklyThreshold()} evaluations.
        </div>
      )}
      <h2>Evaluation List</h2>
      <ul>
        {evaluations.map((ev, index) => (
          <li key={index}>
            {ev.course} - {ev.title} ({ev.type}) due on {ev.dueDate.toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThresholdAlertUI;