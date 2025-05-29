
// the entity for evaluations
export interface Evaluation {
  course_name: string; // to keep course unique, formatted as: course name + semester + section number (e.g., SENG8071-25S-2)
  evaluation_type: string; // the evaluation's type (e.g., Quiz, Assignment)
  evaluation_weight: number; // the evaluation's weight
  due_day: Date; // due day of the evaluation
}
