export type EnrollmentStatus = "enrolled" | "unenrolled" | "need removal";

export interface Student {
  Email: string;
  "First Name": string;
  "Last Name": string;
  "Student ID": string;
  Role: string;
  Status: EnrollmentStatus;
}