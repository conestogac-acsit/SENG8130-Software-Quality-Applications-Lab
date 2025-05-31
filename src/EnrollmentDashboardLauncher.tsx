import React, { useState } from 'react';
import EnrollmentDashboard from './EnrollmentDashboard';

const mockGithubData = [
  { Email: "gh01@example.com", "First Name": "Alice", "Last Name": "Smith", "Student ID": "1001", Role: "student", Status: "enrolled" },
  { Email: "gh02@example.com", "First Name": "Bob", "Last Name": "Jones", "Student ID": "1002", Role: "student", Status: "enrolled" },
  { Email: "gh03@example.com", "First Name": "Charlie", "Last Name": "Brown", "Student ID": "1003", Role: "student", Status: "unenrolled" },
  { Email: "gh04@example.com", "First Name": "David", "Last Name": "Clark", "Student ID": "1004", Role: "student", Status: "need removal" },
  { Email: "gh05@example.com", "First Name": "Eve", "Last Name": "Davis", "Student ID": "1005", Role: "student", Status: "enrolled" },
  { Email: "gh06@example.com", "First Name": "Frank", "Last Name": "Hill", "Student ID": "1006", Role: "student", Status: "unenrolled" },
  { Email: "gh07@example.com", "First Name": "Grace", "Last Name": "Mills", "Student ID": "1007", Role: "student", Status: "enrolled" },
  { Email: "gh08@example.com", "First Name": "Hank", "Last Name": "Moore", "Student ID": "1008", Role: "student", Status: "need removal" },
  { Email: "gh09@example.com", "First Name": "Ivy", "Last Name": "Allen", "Student ID": "1009", Role: "student", Status: "unenrolled" },
  { Email: "gh10@example.com", "First Name": "Jack", "Last Name": "Lee", "Student ID": "1010", Role: "student", Status: "enrolled" },
  { Email: "gh11@example.com", "First Name": "Kara", "Last Name": "White", "Student ID": "1011", Role: "student", Status: "enrolled" },
  { Email: "gh12@example.com", "First Name": "Liam", "Last Name": "Young", "Student ID": "1012", Role: "student", Status: "unenrolled" },
  { Email: "gh13@example.com", "First Name": "Mia", "Last Name": "King", "Student ID": "1013", Role: "student", Status: "need removal" },
  { Email: "gh14@example.com", "First Name": "Noah", "Last Name": "Baker", "Student ID": "1014", Role: "student", Status: "enrolled" },
  { Email: "gh15@example.com", "First Name": "Olivia", "Last Name": "Adams", "Student ID": "1015", Role: "student", Status: "enrolled" },
  { Email: "gh16@example.com", "First Name": "Paul", "Last Name": "Scott", "Student ID": "1016", Role: "student", Status: "unenrolled" },
  { Email: "gh17@example.com", "First Name": "Quinn", "Last Name": "Wright", "Student ID": "1017", Role: "student", Status: "enrolled" },
  { Email: "gh18@example.com", "First Name": "Rose", "Last Name": "Turner", "Student ID": "1018", Role: "student", Status: "need removal" },
  { Email: "gh19@example.com", "First Name": "Sam", "Last Name": "Evans", "Student ID": "1019", Role: "student", Status: "unenrolled" },
  { Email: "gh20@example.com", "First Name": "Tina", "Last Name": "Brooks", "Student ID": "1020", Role: "student", Status: "enrolled" }
];

const mockLoopData = [
  { Email: "lp01@example.com", "First Name": "Uma", "Last Name": "Reed", "Student ID": "2001", Role: "student", Status: "enrolled" },
  { Email: "lp02@example.com", "First Name": "Victor", "Last Name": "Price", "Student ID": "2002", Role: "student", Status: "enrolled" },
  { Email: "lp03@example.com", "First Name": "Wendy", "Last Name": "Ford", "Student ID": "2003", Role: "student", Status: "enrolled" },
  { Email: "lp04@example.com", "First Name": "Xander", "Last Name": "Gray", "Student ID": "2004", Role: "student", Status: "need removal" },
  { Email: "lp05@example.com", "First Name": "Yara", "Last Name": "Cruz", "Student ID": "2005", Role: "student", Status: "enrolled" },
  { Email: "lp06@example.com", "First Name": "Zane", "Last Name": "Nguyen", "Student ID": "2006", Role: "student", Status: "enrolled" },
  { Email: "lp07@example.com", "First Name": "Abby", "Last Name": "Lopez", "Student ID": "2007", Role: "student", Status: "need removal" },
  { Email: "lp08@example.com", "First Name": "Ben", "Last Name": "Murphy", "Student ID": "2008", Role: "student", Status: "enrolled" },
  { Email: "lp09@example.com", "First Name": "Cody", "Last Name": "Bell", "Student ID": "2009", Role: "student", Status: "enrolled" },
  { Email: "lp10@example.com", "First Name": "Daisy", "Last Name": "Perry", "Student ID": "2010", Role: "student", Status: "unenrolled" },
  { Email: "lp11@example.com", "First Name": "Ethan", "Last Name": "Howard", "Student ID": "2011", Role: "student", Status: "need removal" },
  { Email: "lp12@example.com", "First Name": "Faith", "Last Name": "Ward", "Student ID": "2012", Role: "student", Status: "need removal" },
  { Email: "lp13@example.com", "First Name": "George", "Last Name": "Cox", "Student ID": "2013", Role: "student", Status: "unenrolled" },
  { Email: "lp14@example.com", "First Name": "Hailey", "Last Name": "Long", "Student ID": "2014", Role: "student", Status: "enrolled" },
  { Email: "lp15@example.com", "First Name": "Ian", "Last Name": "Bryant", "Student ID": "2015", Role: "student", Status: "need removal" },
  { Email: "lp16@example.com", "First Name": "Jade", "Last Name": "Peterson", "Student ID": "2016", Role: "student", Status: "enrolled" },
  { Email: "lp17@example.com", "First Name": "Kyle", "Last Name": "Kim", "Student ID": "2017", Role: "student", Status: "enrolled" },
  { Email: "lp18@example.com", "First Name": "Lara", "Last Name": "Hughes", "Student ID": "2018", Role: "student", Status: "enrolled" },
  { Email: "lp19@example.com", "First Name": "Mason", "Last Name": "Foster", "Student ID": "2019", Role: "student", Status: "unenrolled" },
  { Email: "lp20@example.com", "First Name": "Nina", "Last Name": "Harrison", "Student ID": "2020", Role: "student", Status: "need removal" }
];
export default function App() {
  return (
    <div className="p-6">
      <EnrollmentDashboard
        github={mockGithubData}
        loop={mockLoopData}
        onBack={() => {}} // Empty handler since back button is unused
      />
    </div>
  );
}

