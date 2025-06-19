type Email = string;

export interface Student {
  id: string;
  name: string;
  email: Email;
  group: string;
  role: string;
  section: string;
  imageUrl: string;
  notes: string;
  isLoopEnrolled: boolean;
  isGithubEnrolled: boolean;
}