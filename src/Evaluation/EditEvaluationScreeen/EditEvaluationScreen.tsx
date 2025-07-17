import React, { useState } from 'react';
import SuggestedEvaluationSection from '../SuggestiveEvaluation/SuggestedEvaluation/SuggestedEvaluationSection';

const EditEvaluationScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSave = () => {
    alert(`Saved evaluation: ${name} on ${date}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Evaluation</h1>

      <label htmlFor="evaluationName" className="block mb-2 text-sm font-medium">
        Evaluation Name
      </label>
      <input
        id="evaluationName"
        className="w-full border p-2 rounded mb-4"
        placeholder="e.g., Midterm Exam"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="evaluationDate" className="block mb-2 text-sm font-medium">
        Select New Date
      </label>
      <input
        id="evaluationDate"
        className="w-full border p-2 rounded mb-4"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <SuggestedEvaluationSection suggestions={[]} />

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditEvaluationScreen;