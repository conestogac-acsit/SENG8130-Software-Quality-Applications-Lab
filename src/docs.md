#  EnrollmentDashboard Interface Documentation

This document outlines the props, data types, component behavior, and structure for the `EnrollmentDashboard` component.

---

##  Objective3_KeyResultX: Visualize Enrollment Data  
> Build an interactive dashboard to compare student enrollment statuses from GitHub and Microsoft Loop.  

**Features:**
- Bar chart comparing status counts across platforms
- Line chart visualizing enrollment trends
- Pie chart showing overall status distribution
- Data table with exact status numbers
- Button to export dashboard as PNG
- Back button for navigation

---

##  Type Definitions

### `Student`

```ts
export interface Student {
  Email: string;
  "First Name": string;
  "Last Name": string;
  "Student ID": string;
  Role: string;
  Status: string;
}
```

---

##  Component Props

### `EnrollmentDashboardProps`

```ts
interface EnrollmentDashboardProps {
  github: Student[];
  loop: Student[];
  onBack: () => void;
}
```

---

##  Dashboard Sections

| Section         | Description                                                                 |
|------------------|------------------------------------------------------------------------------|
| Bar Chart        | Compares GitHub and Loop student counts per status: Enrolled, Unenrolled, Need Removal |
| Line Chart       | Plots trend lines for GitHub, Loop, and Total counts over statuses         |
| Pie Chart        | Displays proportional distribution of statuses combined                    |
| Data Table       | Shows numeric breakdown of each status by platform and total               |
| Export Button    | Saves full dashboard view as PNG                                            |
| Back Button      | Returns to previous screen/component                                        |

---

##  Expected Input Format

Both `github` and `loop` props are arrays of `Student` with these rules:

- Only students with `Role: "student"` (case-insensitive) are included.
- Valid statuses: `"enrolled"`, `"unenrolled"`, `"need removal"` (case-insensitive).

###  Sample Student Entry

```ts
{
  Email: "alice@example.com",
  "First Name": "Alice",
  "Last Name": "Smith",
  "Student ID": "S1001",
  Role: "student",
  Status: "enrolled"
}
```

---

##  Testing Coverage

Test file: `EnrollmentDashboard.test.tsx`

| Test Scenario                     | Description                                     |
|----------------------------------|-------------------------------------------------|
| Renders Chart Titles             | Confirms headers for each chart section         |
| PNG Export Button Works          | Simulates export click and verifies behavior    |
| Back Button Click Works          | Triggers back handler on button press           |

---


### `EnrollmentDashboard.tsx`

- Uses `recharts` for all visualizations
- Uses `html-to-image` and `file-saver` for PNG export
- Filters `Role === "student"` from props
- Aggregates status values and builds chart-friendly datasets
- Charts used: BarChart, LineChart, PieChart (with Tooltip & Legend)
- Button event handlers: `handleExportAsPng`, `onBack`

---

##  Tech Stack

| Area                | Technology             |
|---------------------|------------------------|
| Language            | [TypeScript]|
| UI Library          | [React], [Tailwind CSS] |
| Charting            | [Recharts] |
| PNG Export          | [`html-to-image`], [`file-saver`] |
| Testing             | [Jest], React Testing Library |

---


##  How to Use

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Run tests

```bash
npm test
```

### 4. Export dashboard PNG (in-app)

- Click **Download as PNG** button at the top right of the dashboard view

---

##  Sample Output (UI Representation)

###  Bar Chart

- X-axis: `status` (`enrolled`, `unenrolled`, `need removal`)
- Y-axis: count of students
- 2 bars: GitHub and Loop

###  Line Chart

- 3 lines: GitHub, Loop, Total
- Helps visualize status composition trend

###  Pie Chart

- Shows total % share of each status type

###  Table

```
| Status        | GitHub | Loop | Total |
|---------------|--------|------|-------|
| Enrolled      | 10     | 12   | 22    |
| Unenrolled    | 4      | 3    | 7     |
| Need Removal  | 3      | 5    | 8     |
```

---


