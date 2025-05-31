import fs from 'fs';
import path from 'path';
import { Evaluation } from '../EvaluationForm/EvaluationFormValidation';

const filePath = path.join(__dirname, 'evaluations.csv');

// Append a single evaluation to the CSV file
export function saveEvaluation(evaluation: Evaluation): void {
  const row = `"${evaluation.id}","${evaluation.courseCode}","${evaluation.evaluationType}","${evaluation.dueDate}"\n`;
  fs.appendFileSync(filePath, row);
}

// Read all evaluations from the CSV file
export function loadEvaluations(): Evaluation[] {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return data.trim().split('\n').map(line => {
    const [id, courseCode, evaluationType, dueDate] = line.split(',').map(field => field.replace(/"/g, ''));
    return { id, courseCode, evaluationType, dueDate };
  });
}

// Overwrite CSV file with a new set of evaluations
export function updateEvaluations(evaluations: Evaluation[]): void {
  const rows = evaluations
    .map(e => `"${e.id}","${e.courseCode}","${e.evaluationType}","${e.dueDate}"`)
    .join('\n');
  fs.writeFileSync(filePath, rows + '\n');
}
