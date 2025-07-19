import React, { useEffect, useState } from 'react';
import CalendarView from '../EvaluationCalendar/CalendarView/CalendarView';
import ThresholdAlertUI from '../Alert/AlertService/ThresholdAlertUI';
import { EvaluationService } from '../EvaluationService/EvaluationService';
import { LocalStorage } from '../../localStorageService';
import type { StorageService } from '../../localStorageService';
import { Evaluation } from '../EvaluationService/EvaluationService';

const EvaluationPage: React.FC = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const service = new EvaluationService(new LocalStorage() as StorageService);

  useEffect(() => {
    const data = service.loadEvaluations();
    setEvaluations(data);
  }, []);

  return (
    <div className="p-4 space-y-6">
      <ThresholdAlertUI evaluations={evaluations} />
      <CalendarView evaluations={evaluations} />
    </div>
  );
};

export default EvaluationPage;
