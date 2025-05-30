import React, { useEffect, useState } from 'react';
import { loadEvaluations, updateEvaluations } from '../csvHandler/csvHandler';

export interface Evaluation {
  id: string;
  courseCode: string;
  evaluationType: string;
  dueDate: string;
}

const EvaluationTable: React.FC<{ onEdit: (evaluation: Evaluation) => void, refreshFlag: number }> = ({ onEdit, refreshFlag }) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  useEffect(() => {
    setEvaluations(loadEvaluations());
  }, [refreshFlag]);

  const handleDelete = (id: string) => {
    const filtered = evaluations.filter(e => e.id !== id);
    updateEvaluations(filtered);
    setEvaluations(filtered);
  };

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>Course</th>
          <th>Type</th>
          <th>Due Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {evaluations.map(e => (
          <tr key={e.id}>
            <td>{e.courseCode}</td>
            <td>{e.evaluationType}</td>
            <td>{e.dueDate}</td>
            <td>
              <button className="text-blue-500 mr-2" onClick={() => onEdit(e)}>Edit</button>
              <button className="text-red-500" onClick={() => handleDelete(e.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EvaluationTable;