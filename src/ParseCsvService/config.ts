export const REQUIRED_FIELDS_MAP = {
  Student: [
    'studentId', 'name', 'email', 'section', 'group', 'role',
    'imageUrl', 'notes', 'loopStatus', 'githubStatus',
  ],
  Evaluation: [
    'course', 'title', 'type', 'weight', 'dueDate', 'instructor', 'campus',
  ],
} as const;

export type ParseType = keyof typeof REQUIRED_FIELDS_MAP;
