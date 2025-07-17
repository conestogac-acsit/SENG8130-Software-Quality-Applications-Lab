import React from 'react';
import { SuggestedEvaluation } from './SuggestedEvaluation';

const SuggestedEvaluationSection: React.FC<{ suggestions: string[] }> = ({ suggestions }) => {
  return (
    <div className="mt-6">
      <SuggestedEvaluation suggestions={suggestions} />
    </div>
  );
};

export default SuggestedEvaluationSection;