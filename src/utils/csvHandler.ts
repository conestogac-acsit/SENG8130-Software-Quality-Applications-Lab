// Provides persistent storage and supports all 4 user stories.
import { Evaluation } from '../types/Evaluation';
import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'evaluations.csv');

// Supports User Story 1.1 by appending the new evaluation to the CSV file when a form is successfully submitted.
export function saveEvaluation(evaluation: Evaluation): void {
  const row = `"${evaluation.id}","${evaluation.courseCode}","${evaluation.evaluationType}","${evaluation.dueDate}"\n`;
  fs.appendFileSync(filePath, row);
}

// Supports User Story 2.1 by extracting and normalizing evaluations from uploaded CSV outline files.
export function loadEvaluations(): Evaluation[] {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return data.trim().split('\n').map(line => {
    const [id, courseCode, evaluationType, dueDate] = line.split(',').map(field => field.replace(/"/g, ''));
    return { id, courseCode, evaluationType, dueDate };
  });
}

// Supports User Story 2.2 by saving the full consolidated evaluation list back to the CSV for display and monitoring.
// Also used in User Story 1.2 when edits or deletions are performed.
export function updateEvaluations(evaluations: Evaluation[]): void {
  const rows = evaluations.map(e => `"${e.id}","${e.courseCode}","${e.evaluationType}","${e.dueDate}"`).join('\n');
  fs.writeFileSync(filePath, rows + '\n');
}
