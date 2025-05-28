# Software Quality Applications Lab

The Software Quality Applications Lab is intended to create a working environment for students to gain experience.

## Essential Links

### Documentation

The documentation for the project is in [Microsoft Loop](https://stuconestogacon.sharepoint.com/:fl:/g/contentstorage/CSP_b962f780-af09-442b-aad9-5bfca98e6e35/EaBZj2i9JqxCqmICZIh42kgBLrf0mtydOh94-W6v2RrB9Q?e=5kURPx&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9iOTYyZjc4MC1hZjA5LTQ0MmItYWFkOS01YmZjYTk4ZTZlMzUmZD1iJTIxZ1BkaXVRbXZLMFNxMlZ2OHFZNXVOWDdyXzFEWU5TSlBqQjUxcHFHUWoyQ1VMZ2l1cVNKdVRLYmdXRWkwWU9mSCZmPTAxM1hWSzM2RkFMR0hXUlBKR1ZSQktVWVFDTVNFSFJXU0kmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4emRIVmpiMjVsYzNSdloyRmpiMjR1YzJoaGNtVndiMmx1ZEM1amIyMThZaUZuVUdScGRWRnRka3N3VTNFeVZuWTRjVmsxZFU1WU4zSmZNVVJaVGxOS1VHcENOVEZ3Y1VkUmFqSkRWVXhuYVhWeFUwcDFWRXRpWjFkRmFUQlpUMlpJZkRBeE0xaFdTek0yUlU1VFYwSldSMFZVVFVOQ1IweE9XbEZUUVU5WFZVMUpURWslM0QlMjIlMkMlMjJpJTIyJTNBJTIyMmNjNjk4ZmEtNzZhOC00ZmMxLTliMzAtYmY1MGMwOGUyOTNlJTIyJTdE).

With the above link, you will be able to see the Home page.
To gain access, you must ask one of the Admins for access.

Please contact [Andy Chow](mailto:achow@conestogac.on.ca) or [Priya Manimaran](mailto:pmanimaran@conestogac.on.ca)

### Objective, Key Results (OKR)

This is worth a mention as it is one of the main ways that we will be tracking outcomes and evaluation.
The OKRs are located in Microsoft Loop as well.
As soon as you gain access to the Documentation, you will be able to see this under the subpage called OKR.


### Objective4_KeyResult3: Data Entry Process  
> Enable instructors to add and update evaluation submissions.  
**Features:**
- Submit evaluations via a form
- Edit existing evaluations
- Delete evaluations from the list
- Client-side validation and feedback messages

### Objective4_KeyResult5: Collect Program-Wide Evaluation Data  
> Collect and standardize evaluation dates from all courses.  
**Features:**
- Display all evaluations in a consolidated table
- CSV-based data storage (`evaluations.csv`)
- Normalized structure: `{ courseCode, evaluationType, dueDate }`

## 💻 Tech Stack

| Area                | Technology             |
|---------------------|------------------------|
| Language            | [TypeScript](https://www.typescriptlang.org/) |
| UI Library          | [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/) |
| Desktop Framework   | [Electron](https://www.electronjs.org/) |
| Data Storage        | CSV (filesystem access via Node.js `fs`) |
| Testing             | [Jest](https://jestjs.io/), React Testing Library |

### Product Roadmap

This is worth a mention as it is one of the main ways that we will be tracking outcomes and evaluation.
The Product Roadmap is located in Microsoft Loop as well.
As soon as you gain access to the Documentation, you will be able to see this under the subpage called Product Roadmap.


## 📂 Project Structure

project-root/
├── public/
├── src/
│   ├── components/
│   │   ├── EvaluationForm.tsx
│   │   ├── EvaluationTable.tsx
│   │   └── ConfirmationMessage.tsx
│   ├── types/
│   │   └── Evaluation.ts
│   ├── utils/
│   │   ├── csvHandler.ts
│   │   └── validation.ts
│   ├── App.tsx
│   └── renderer.tsx
├── tests/
│   ├── EvaluationForm.test.tsx
│   ├── EvaluationTable.test.tsx
│   └── ConfirmationMessage.test.tsx
├── package.json
└── tsconfig.json


### How to Use

1. **Install dependencies**  
   ```bash
   npm install
2. **Start the app (development mode)**
   ```bash
   npm run dev
3. ***Build the app for production***
   ```bash
   npm run build
4. ***Run tests***
   ```bash
   npm test


### Tests Implemented
## EvaluationForm.test.tsx
    # Field rendering
    # Empty form validation

## EvaluationTable.test.tsx
    # Table row display from mocked CSV data

## ConfirmationMessage.test.tsx
    # Message rendering based on input props
    # Style assertion (success vs error)