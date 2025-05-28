import React, { useState } from 'react';
import EvaluationForm from './components/EvaluationForm';
import EvaluationTable from './components/EvaluationTable';
import { Evaluation } from './types/Evaluation';

const App: React.FC = () => {
  const [selectedEval, setSelectedEval] = useState<Evaluation | undefined>(undefined);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const handleEdit = (evaluation: Evaluation) => {
    setSelectedEval(evaluation);
  };

  const handleSave = () => {
    setSelectedEval(undefined);
    setRefreshFlag(prev => prev + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Evaluation Scheduler</h1>
      <EvaluationForm selectedEval={selectedEval} onSave={handleSave} />
      <EvaluationTable onEdit={handleEdit} refreshFlag={refreshFlag} />
    </div>
  );
};

export default App;
