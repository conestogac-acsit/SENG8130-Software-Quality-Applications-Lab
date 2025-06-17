## CalendarDayCard Documentation
 
## Description:
- Renders all evaluations for a specific day.
- Displays title, type, course, and weight.
- If no evaluations exist for the day, shows fallback text.

## Props:
- date: string — Formatted display date (e.g., "Tue Jun 10 2025").
- evaluations: Evaluation[] — Array of evaluations for this day.

## Usage:
Used inside CalendarView, WeeklyView, etc., to show per-day entries.

## Tests:
- Renders date heading correctly.
- Displays all evaluations passed for the day.
- Shows fallback text if no evaluations exist.
