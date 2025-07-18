import React from 'react';
import SuggestedEvaluation from './SuggestedEvaluation/SuggestedEvaluation';
import { Evaluation } from '../EvaluationService/EvaluationService';

interface Props {
  evaluations: Evaluation[];
}

const SuggestiveEvaluationModule: React.FC<Props> = ({ evaluations }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-4">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Suggestive Evaluation Insights</h3>
      <SuggestedEvaluation evaluations={evaluations} />
    </div>
  );
};

export default SuggestiveEvaluationModule;
