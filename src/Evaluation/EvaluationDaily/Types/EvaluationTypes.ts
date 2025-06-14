export interface EvaluationRow {
    evaluation_id: string;          // Unique identifier (UUID) for the evaluation
    course_code: string;            // Combined course ID, semester, and section (e.g., "INFO8171-25S-S2")
    evaluation_type: string;        // Type of evaluation (e.g., "Assignment", "Quiz")
    due_day: string;                 // Due date in "YYYY-MM-DD" format
  }