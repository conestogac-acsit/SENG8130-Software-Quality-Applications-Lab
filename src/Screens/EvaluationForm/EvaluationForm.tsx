import React, { useState, useEffect } from 'react';
import { saveEvaluation, updateEvaluations, loadEvaluations } from '../csvHandler/csvHandler';
import { validateEvaluation, Evaluation } from './EvaluationFormValidation';
import { v4 as uuidv4 } from 'uuid';

interface ConfirmationMessageProps {
  selectedEval?: Evaluation;
  onSave: () => void;
}

const EvaluationForm: React.FC<ConfirmationMessageProps> = ({ selectedEval, onSave }) => {
  const [form, setForm] = useState<Evaluation>({
    id: '',
    courseCode: '',
    evaluationType: '',
    dueDate: ''
  });
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
    if (errors.length > 0) {
      setMessage(errors.join(' | '));
      return;
    }

    if (isEdit) {
      const allEvals = loadEvaluations();
      const updatedEvals = allEvals.map((e) => (e.id === form.id ? form : e));
      updateEvaluations(updatedEvals);
      setMessage('Evaluation updated successfully');
    } else {
      const newEval: Evaluation = { id: uuidv4(), ...form };
      saveEvaluation(newEval);
      setMessage('Evaluation submitted successfully');
    }

    setForm({ id: '', courseCode: '', evaluationType: '', dueDate: '' });
    setIsEdit(false);
    onSave();
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <input
        name="courseCode"
        placeholder="Course Code"
        value={form.courseCode}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        name="evaluationType"
        placeholder="Evaluation Type"
        value={form.evaluationType}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleSubmit}
        className={`px-4 py-2 text-white rounded ${isEdit ? 'bg-yellow-500' : 'bg-blue-500'}`}
      >
        {isEdit ? 'Update' : 'Submit'}
      </button>
      {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
    </div>
  );
};

export default EvaluationForm;
