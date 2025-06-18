export type EnrollmentStatus = "enrolled" | "unenrolled";

export interface Student {
  id: string;
  name: string;
  email: string;
  group: string;
  role: string;
  section: string;
  imageUrl: string;
  notes: string;
  loopStatus: string;
  githubStatus: string;
}