import React, { useState, useEffect } from 'react';
import { Evaluation } from '../types/Evaluation';
import { saveEvaluation, updateEvaluations, loadEvaluations } from '../utils/csvHandler';
import { validateEvaluation } from '../utils/validation';
import { v4 as uuidv4 } from 'uuid';

// Implements User Story 1.1 – Instructor Adds Evaluation
// Implements User Story 1.2 – Instructor Edits Evaluation
const EvaluationForm: React.FC<{ selectedEval?: Evaluation, onSave: () => void }> = ({ selectedEval, onSave }) => {
  const [form, setForm] = useState({ id: '', courseCode: '', evaluationType: '', dueDate: '' });
  const [message, setMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (selectedEval) {
      setForm(selectedEval);
      setIsEdit(true);
    }
  }, [selectedEval]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const errors = validateEvaluation(form);
    if (errors.length) return setMessage(errors.join(' | '));

    if (isEdit) {
      const allEvals = loadEvaluations();
      const updated = allEvals.map(e => e.id === form.id ? form : e);
      updateEvaluations(updated);
      setMessage('Evaluation updated successfully');
    } else {
      const newEval: Evaluation = { id: uuidv4(), ...form } as Evaluation;
      saveEvaluation(newEval);
      setMessage('Evaluation submitted successfully');
    }

    setForm({ id: '', courseCode: '', evaluationType: '', dueDate: '' });
    setIsEdit(false);
    onSave();
  };

  return (
    <div className="p-4">
      <input name="courseCode" placeholder="Course Code" value={form.courseCode} onChange={handleChange} className="border m-2" />
      <input name="evaluationType" placeholder="Evaluation Type" value={form.evaluationType} onChange={handleChange} className="border m-2" />
      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="border m-2" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 m-2">
        {isEdit ? 'Update' : 'Submit'}
      </button>
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  );
};

export default EvaluationForm;