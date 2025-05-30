// src/services/studentService.ts
import type { Student, EnrollmentStatus } from '../components/StudentInfoDashboard/StudentInfoDashboard';

export interface StudentService {
  updateStatus: (
    students: Student[],
    index: number,
    platform: 'loop' | 'github',
    newStatus: EnrollmentStatus
  ) => Student[];

  updateStudent: (students: Student[], index: number, updated: Partial<Student>) => Student[];

  deleteStudent: (students: Student[], index: number) => Student[];
}

export const studentService: StudentService = {
  updateStatus: (students, index, platform, newStatus) => {
    const updated = [...students];
    if (platform === 'loop') updated[index].loopStatus = newStatus;
    if (platform === 'github') updated[index].githubStatus = newStatus;
    return updated;
  },

  updateStudent: (students, index, updated) => {
    const updatedList = [...students];
    updatedList[index] = { ...updatedList[index], ...updated };
    return updatedList;
  },

  deleteStudent: (students, index) => {
    const updated = [...students];
    updated.splice(index, 1);
    return updated;
  }
};
