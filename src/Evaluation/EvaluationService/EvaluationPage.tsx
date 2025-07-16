import React, { useState, useEffect } from 'react';
import CalendarView from '../EvaluationCalendar/CalendarView';
import { Evaluation, EvaluationService } from '../EvaluationService';
import { deleteEvaluation } from './deleteEvaluationService';
import { LocalStorage } from '../../localStorageService/LocalStorage';

const evalService = new EvaluationService(new LocalStorage());

const EvaluationPage: React.FC = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  useEffect(() => {
    const loaded = evalService.loadEvaluations();
    setEvaluations(loaded);
  }, []);

  const handleDelete = (target: Evaluation) => {
    const result = deleteEvaluation(evaluations, target, evalService);
    if (result.success) {
      setEvaluations(result.updated);
    } else {
      console.error('Delete failed:', result.error);
      alert(Delete failed: ${result.error});
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Evaluation Calendar</h1>
      <CalendarView evaluations={evaluations} onDelete={handleDelete} />
    </div>
  );
};

export default EvaluationPage;