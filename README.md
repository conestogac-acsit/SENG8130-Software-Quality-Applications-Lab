# Student Enrollment Dashboard - Desktop App

## Overview

This desktop application feature is built using **React**, **TypeScript**, **Vite**, and **Electron**. It provides an intuitive interface for managing student information and enrollment statuses across different platforms like Loop and GitHub. Student data is imported from CSV files and can be viewed, updated, or deleted through a main dashboard, with platform-specific views reflecting enrollment statuses.

## Features

- **Student Dashboard:** View, update, and delete student details such as name, email, and group.
- **Enrolled Platform Dashboard:** Separate views for Loop and GitHub platforms displaying updated student info with enrollment status.
- **Editable Status:** Students’ enrollment statuses can be updated only if they are currently unenrolled.
- **CSV Integration:** Student data is parsed from CSV files and enriched with platform-specific enrollment statuses.
- **Built with modern tools:** React, TypeScript, Vite for fast development and Electron for cross-platform desktop deployment.

## Installation

### Clone the Repository
```
git clone git clone git@github.com:conestogac-acsit/SENG8130-Software-Quality-Applications-Lab.git
cd SENG8130-Software-Quality-Applications-Lab
git checkout objective3_WA4_dashboard
```

### Install Dependencies
```
npm install
```

### Build the Application
```
npm run build
```

### Launch the Application
```
electron .
```


## Testing

This project uses Jest and React Testing Library for unit and component testing.

### Run All Tests
```
npm test
```

### Test Coverage Includes:

- CSV data parsing correctness
- Student dashboard update and delete functionality
- Platform-specific dashboard status rendering and editing behavior

## Project Structure
- ```/src``` — Source code for React components and TypeScript logic.

- ```/src/components``` — React components like MainDashboard and PlatformDashboard.

- ```/src/test``` — Unit and component tests.

- ```/electron.js``` — Electron main process entry point.

- ```/students.csv``` — Sample CSV data file.

- ```/vite.config.ts``` — Vite build configuration.

## Technologies Used
- React + TypeScript
- Vite (fast build and dev server)
- Electron (desktop app framework)
- Tailwind CSS (styling)
- Jest + React Testing Library (testing)
- PapaParse (CSV parsing)

