import React, { useState, useEffect } from 'react';
import { getAllStudents, Student, StudentDataGetter } from '../../studentData';
import EnrollStatusCharts from './EnrollStatusCharts';
import EnrollStatusExports from './EnrollStatusExports';

interface EnrollmentCounts {
  enrolled: number;
  unenrolled: number;
  total: number;
}

const calculateEnrollmentCounts = (students: Student[], platform: 'github' | 'loop'): EnrollmentCounts => {
  const statusKey = platform === 'github' ? 'isGithubEnrolled' : 'isLoopEnrolled';
  const enrolled = students.filter(student => student[statusKey] === true).length;
  const unenrolled = students.filter(student => student[statusKey] === false).length;
  
  return {
    enrolled,
    unenrolled,
    total: enrolled + unenrolled
  };
};

const EnrollStatus: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        setLoading(true);
        
        const studentGetter: StudentDataGetter = () => {
          return [];
        };
        
        const studentData = getAllStudents(studentGetter);
        setStudents(studentData);
      } catch (err) {
        setError('Failed to load student data');
        console.error('Error loading students:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStudentData();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading enrollment data...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  const githubCounts = calculateEnrollmentCounts(students, 'github');
  const loopCounts = calculateEnrollmentCounts(students, 'loop');

  const pieDataGitHub = [
    { name: 'Enrolled', value: githubCounts.enrolled },
    { name: 'Unenrolled', value: githubCounts.unenrolled },
  ];

  const pieDataLoop = [
    { name: 'Enrolled', value: loopCounts.enrolled },
    { name: 'Unenrolled', value: loopCounts.unenrolled },
  ];

  const barData = [
    {
      platform: 'GitHub',
      Enrolled: githubCounts.enrolled,
      Unenrolled: githubCounts.unenrolled,
      Total: githubCounts.total,
    },
    {
      platform: 'Loop',
      Enrolled: loopCounts.enrolled,
      Unenrolled: loopCounts.unenrolled,
      Total: loopCounts.total,
    },
  ];

  return (
    <div id="enrollment-dashboard" className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Enrollment Status Overview</h1>
      
      <div className="text-center bg-gray-100 p-4 rounded">
        <p className="text-lg font-semibold">Total Students: {students.length}</p>
      </div>

      <EnrollStatusCharts 
        pieDataGitHub={pieDataGitHub}
        pieDataLoop={pieDataLoop}
        barData={barData}
      />

      <EnrollStatusExports />
    </div>
  );
};

export default EnrollStatus;