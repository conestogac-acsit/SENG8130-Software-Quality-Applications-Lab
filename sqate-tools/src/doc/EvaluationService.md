# EvaluationService Interface Documentation

This document describes the available methods in the `EvaluationService` interface, along with the data types and expected CSV structure.

---

## Type Definitions

### `Evaluation`

````typescript
export interface Evaluation {
  id: string;                // Unique identifier (UUID)
  course_name: string;       // Name of the course
  evaluation_type: string;   // Type of evaluation (e.g., quiz, project, exam)
  evaluation_weight: number; // Weight or percentage of evaluation
  due_day: Date;             // Due date of the evaluation
}
````

### `DailyEvaluation`

````typescript
export interface DailyEvaluation {
  year: number; // Calendar year (e.g., 2025)
  month: number; // Month of the year (1 = January, 12 = December)
  day: number; // Day of the month (1–31)
  evaluations: Evaluation[]; // List of evaluations for that day
}
````

### `HeatMapViewType`

````typescript
export enum HeatMapViewType {
  WEEK = 'week',
  MONTH = 'month',
}
````

---

## Expected CSV Format

CSV files should include the following headers:


| Course Name        | Evaluation Type | Evaluation Weight | Due Day    |
| ------------------ | --------------- | ----------------- | ---------- |
| INFO8171 - 25S - 2 | Quiz            | 10                | 2025-11-18 |
| SENG8130 - 25S - 2 | Final Exam      | 50                | 2025-11-30 |
| SENG8071 - 25S - 2 | Assignment      | 30                | 2025-11-25 |

**Notes**:

- The first row must be a header.
- `Due Day` must be a valid date (preferably in `YYYY-MM-DD` format).
- `Evaluation Weight` should be a number (e.g., 10, 25.5) without a `%` sign.

---

## Interface Methods

### `getHeatMapDataByWeek(startDay?: string): Promise<DailyEvaluation[]>`

Retrieves heatmap data grouped by week.

- **startDay**: (Optional) Start date in `YYYY-MM-DD` format. Defaults to today.
- **Returns**: Promise resolving to an array of daily evaluations.

### `getHeatMapDataByMonth(startDay?: string): Promise<DailyEvaluation[]>`

Retrieves heatmap data grouped by month.

- **startDay**: (Optional) Start date in `YYYY-MM-DD` format. Defaults to today.
- **Returns**: Promise resolving to an array of daily evaluations.

### `uploadCsvFile(fileName: string, type?: string): Promise<DailyEvaluation[]>`

Loads and parses evaluation data from a CSV file.

- **fileName**: Path to the CSV file.
- **type**: (Optional) Heatmap view type, either `'week'` or `'month'`.
- **Returns**: Promise resolving to an array of daily evaluations.

---

## Sample Output

````json
[
  {
    "day": 18,
    "month": 11,
    "year": 2025,
    "evaluations": [
      {
        "id": "c7b7b3aa-8f49-4c5f-901f-111111111111",
        "course_name": "COMP1001",
        "evaluation_type": "Quiz",
        "evaluation_weight": 10,
        "due_day": "2025-11-18T00:00:00.000Z"
      }
    ]
  },
  {
    "day": 19,
    "month": 11,
    "year": 2025,
    "evaluations": []
  }
]
````
