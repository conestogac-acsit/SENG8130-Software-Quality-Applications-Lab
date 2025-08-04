export type EvaluationType =
  | "Assignment"
  | "Mid Exam"
  | "Quiz"
  | "Project"
  | "Practical Lab"
  | "Final Exam";

export interface Evaluation {
  course: string;
  title: string;
  type: EvaluationType;
  weight: number;
  dueDate: Date;
  instructor: string;
  campus: string;
}

export interface IEvaluationService {
  saveEvaluations(data: Evaluation[]): void;
  loadEvaluations(): Evaluation[];
}
