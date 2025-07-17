import React from 'react';
import { SuggestedEvaluation } from './SuggestedEvaluation'; 

const SuggestiveEvaluationDashboard: React.FC = () => {
  const evaluationSuggestions = ['Week 2', 'Week 5', 'Week 8'];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Evaluation Scheduler</h1>
      <SuggestedEvaluation suggestions={evaluationSuggestions} />
    </div>
  );
};

export default SuggestiveEvaluationDashboard;
