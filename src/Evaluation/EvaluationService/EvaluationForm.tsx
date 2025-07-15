import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Evaluation, EvaluationService, IEvaluationService } from './EvaluationService';

import { saveOrUpdateEvaluation } from './saveOrUpdateEvaluationService';
import { LocalStorage } from '../../localStorageService/LocalStorage';

const evaluationService: IEvaluationService = new EvaluationService(new LocalStorage());

const defaultFormState: Partial<Evaluation> = {
  course: '',
  title: '',
  type: 'Assignment',
  weight: 0,
  dueDate: new Date(),
  instructor: '',
  campus: '',
};

const EvaluationForm: React.FC = () => {
  const [form, setForm] = useState<Partial<Evaluation>>(defaultFormState);
  const [dateStr, setDateStr] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'weight' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = evaluationService.loadEvaluations();
    const updated = saveOrUpdateEvaluation(existing, form, dateStr, null, evaluationService);
    navigate('/dashboard/calendar');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Evaluation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <select name="type" value={form.type} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="Assignment">Assignment</option>
          <option value="Mid Exam">Mid Exam</option>
          <option value="Quiz">Quiz</option>
          <option value="Project">Project</option>
          <option value="Practical Lab">Practical Lab</option>
          <option value="Final Exam">Final Exam</option>
        </select>
        <input name="weight" type="number" placeholder="Weight (%)" value={form.weight} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input type="date" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        <input name="instructor" placeholder="Instructor" value={form.instructor} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input name="campus" placeholder="Campus" value={form.campus} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Save Evaluation</button>
      </form>
    </div>
  );
};

export default EvaluationForm;
