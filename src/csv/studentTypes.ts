export type EnrollmentStatus = "enrolled" | "unenrolled";

export interface Student {
  studentId: string;
  name: string;
  email: string;
  group: string;
  role: string;
  loop: string;
  github: string;
  status: EnrollmentStatus;
  loopStatus: EnrollmentStatus;
  githubStatus: EnrollmentStatus;
}