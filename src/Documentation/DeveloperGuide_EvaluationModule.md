# Evaluation module Documentation

This document describes the available interfaces and methods in the `Evaluation` module of the SQATE Desktop Application, along with the relevant data types and expected CSV format.

---

## Type Definitions

### `Evaluation`

```ts
//camel case naming convention followed for best practice.
export interface Evaluation {
  id: string;            // Unique identifier (UUID)
  courseCode: string;    // Code of the course (e.g., INFO8171)
  evaluationType: string; // Type of evaluation (e.g., quiz, exam)
  dueDate: string;       // Due date in YYYY-MM-DD format
}
```

### `ConfirmationMessageProps`

```ts
interface ConfirmationMessageProps {
  message: string;
  type: 'success' | 'error'; // Controls message color (green for success, red for error)
}
```

---

## 📁 Expected CSV Format

CSV file used to store evaluation entries (`evaluations.csv`) follows this structure:

| ID (UUID)                            | Course Code | Evaluation Type | Due Date    |
|-------------------------------------|-------------|------------------|-------------|
| c7b7b3aa-8f49-4c5f-901f-111111111111 | INFO8171    | Quiz             | 2025-11-18  |
| 92acdd4f-91b7-4de4-a9f7-222222222222 | SENG8130    | Final Exam       | 2025-11-30  |

**Notes**:
- `Due Date` must follow the `YYYY-MM-DD` format.
- CSV is updated on every form submission (append or update mode).
- File is read directly using Node.js `fs` APIs for persistence.

---

## Methods (from `csvHandler.ts`)

### `saveEvaluation(evaluation: Evaluation): void`

Appends a new evaluation record to the CSV file.

### `loadEvaluations(): Evaluation[]`

Parses and returns all evaluations from the CSV file. If the file doesn't exist, returns an empty array.

### `updateEvaluations(evaluations: Evaluation[]): void`

Overwrites the entire CSV file with a new list of evaluations.

---

## Sample Output (Parsed Evaluations)

```json
[
  {
    "id": "c7b7b3aa-8f49-4c5f-901f-111111111111",
    "courseCode": "INFO8171",
    "evaluationType": "Quiz",
    "dueDate": "2025-11-18"
  },
  {
    "id": "92acdd4f-91b7-4de4-a9f7-222222222222",
    "courseCode": "SENG8130",
    "evaluationType": "Final Exam",
    "dueDate": "2025-11-30"
  }
]
```
