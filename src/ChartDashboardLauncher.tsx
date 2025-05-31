import React, { useState } from 'react';
import ChartDashboard from './ChartDashboard';
import { Student } from '@/Student';

const githubData: Student[] = [
  { Email: 'alice@example.com', 'First Name': 'Alice', 'Last Name': 'Smith', 'Student ID': '1', Role: 'student', Status: 'enrolled' },
  { Email: 'brian@example.com', 'First Name': 'Brian', 'Last Name': 'Stone', 'Student ID': '2', Role: 'student', Status: 'enrolled' },
  { Email: 'claire@example.com', 'First Name': 'Claire', 'Last Name': 'Hall', 'Student ID': '3', Role: 'student', Status: 'enrolled' },

  { Email: 'dylan@example.com', 'First Name': 'Dylan', 'Last Name': 'Green', 'Student ID': '4', Role: 'student', Status: 'unenrolled' },
  { Email: 'elena@example.com', 'First Name': 'Elena', 'Last Name': 'Wright', 'Student ID': '5', Role: 'student', Status: 'unenrolled' },
  { Email: 'felix@example.com', 'First Name': 'Felix', 'Last Name': 'Lopez', 'Student ID': '6', Role: 'student', Status: 'unenrolled' },
  { Email: 'gwen@example.com', 'First Name': 'Gwen', 'Last Name': 'Clark', 'Student ID': '7', Role: 'student', Status: 'unenrolled' },
  { Email: 'harry@example.com', 'First Name': 'Harry', 'Last Name': 'Adams', 'Student ID': '8', Role: 'student', Status: 'unenrolled' },
  { Email: 'isla@example.com', 'First Name': 'Isla', 'Last Name': 'Walker', 'Student ID': '9', Role: 'student', Status: 'unenrolled' },
  { Email: 'james@example.com', 'First Name': 'James', 'Last Name': 'Hill', 'Student ID': '10', Role: 'student', Status: 'unenrolled' },
  { Email: 'mona@example.com', 'First Name': 'Mona', 'Last Name': 'Richards', 'Student ID': '13', Role: 'student', Status: 'need removal' },
  { Email: 'nate@example.com', 'First Name': 'Nate', 'Last Name': 'Murphy', 'Student ID': '14', Role: 'student', Status: 'need removal' },
  { Email: 'olga@example.com', 'First Name': 'Olga', 'Last Name': 'Simmons', 'Student ID': '15', Role: 'student', Status: 'need removal' },
  { Email: 'paul@example.com', 'First Name': 'Paul', 'Last Name': 'Bennett', 'Student ID': '16', Role: 'student', Status: 'need removal' },
];


const loopData: Student[] = [
  { Email: 'carol@example.com', 'First Name': 'Carol', 'Last Name': 'White', 'Student ID': '3', Role: 'student', Status: 'enrolled' },
  { Email: 'dave@example.com', 'First Name': 'Dave', 'Last Name': 'Black', 'Student ID': '4', Role: 'student', Status: 'enrolled' },
  { Email: 'emma@example.com', 'First Name': 'Emma', 'Last Name': 'Brown', 'Student ID': '5', Role: 'student', Status: 'enrolled' },
  { Email: 'frank@example.com', 'First Name': 'Frank', 'Last Name': 'Wilson', 'Student ID': '6', Role: 'student', Status: 'enrolled' },
  { Email: 'grace@example.com', 'First Name': 'Grace', 'Last Name': 'Taylor', 'Student ID': '7', Role: 'student', Status: 'enrolled' },
  { Email: 'henry@example.com', 'First Name': 'Henry', 'Last Name': 'Anderson', 'Student ID': '8', Role: 'student', Status: 'enrolled' },

  { Email: 'ivy@example.com', 'First Name': 'Ivy', 'Last Name': 'Thomas', 'Student ID': '9', Role: 'student', Status: 'unenrolled' },
  { Email: 'jack@example.com', 'First Name': 'Jack', 'Last Name': 'Jackson', 'Student ID': '10', Role: 'student', Status: 'unenrolled' },
  { Email: 'kate@example.com', 'First Name': 'Kate', 'Last Name': 'Martin', 'Student ID': '11', Role: 'student', Status: 'unenrolled' },
  { Email: 'liam@example.com', 'First Name': 'Liam', 'Last Name': 'Lee', 'Student ID': '12', Role: 'student', Status: 'unenrolled' },
  { Email: 'kelly@example.com', 'First Name': 'Kelly', 'Last Name': 'Nguyen', 'Student ID': '11', Role: 'student', Status: 'need removal' },
  { Email: 'leo@example.com', 'First Name': 'Leo', 'Last Name': 'Gomez', 'Student ID': '12', Role: 'student', Status: 'need removal' },
  { Email: 'mia@example.com', 'First Name': 'Mia', 'Last Name': 'Hayes', 'Student ID': '13', Role: 'student', Status: 'need removal' },
  { Email: 'nora@example.com', 'First Name': 'Nora', 'Last Name': 'Ford', 'Student ID': '14', Role: 'student', Status: 'need removal' },
  { Email: 'owen@example.com', 'First Name': 'Owen', 'Last Name': 'Diaz', 'Student ID': '15', Role: 'student', Status: 'need removal' },
  { Email: 'piper@example.com', 'First Name': 'Piper', 'Last Name': 'Morris', 'Student ID': '16', Role: 'student', Status: 'need removal' },
  { Email: 'quinn@example.com', 'First Name': 'Quinn', 'Last Name': 'Wood', 'Student ID': '17', Role: 'student', Status: 'need removal' },
];

export default function ChartDashboardLauncher() {
  const [showDashboard, setShowDashboard] = useState(true);

  return (
    <div>
      {showDashboard && (
        <ChartDashboard
          github={githubData}
          loop={loopData}
          onBack={() => setShowDashboard(false)}
        />
      )}
    </div>
  );
}