
export interface Evaluation {
  course: string;
  title: string;
  type: "Assignment" | "Exam" | "Quiz" | "Final Exam" | string;
  weight: number;
  dueDate: Date;
  instructor?: string;
  campus?: string;
}