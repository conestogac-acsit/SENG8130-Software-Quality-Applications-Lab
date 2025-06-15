import React from 'react';
import { parseEvaluationCsv } from './parseEvaluationCsv';

interface Props {
  onUpload: (data: any[]) => void;
}
const EvaluationCsvUpload: React.FC<Props> = ({ onUpload }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    parseEvaluationCsv(file, onUpload);
  };
  return (
    <div>
      <label>Upload Evaluation CSV:</label>
      <input type="file" accept=".csv" onChange={handleChange} />
    </div>
  );
};

export default EvaluationCsvUpload;