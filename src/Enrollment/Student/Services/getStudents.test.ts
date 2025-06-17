import { getStudents } from './getStudents';
import { getAllStudents } from './getAllStudents';
import { Student } from './StudentInfo';

jest.mock('./getAllStudents');

const mockGetAllStudents = getAllStudents as jest.MockedFunction<typeof getAllStudents>;

describe('getStudents', () => {
  const mockStudents: Student[] = Array.from({ length: 25 }, (_, i) => ({
    id: (i + 1).toString(),
    name: `Student ${i + 1}`,
    email: `student${i + 1}@example.com`,
    section: "Test Section",
    group: `G${(i % 5) + 1}`,
    role: "Student",
    imageUrl: "",
    notes: "",
    loopStatus: "unenrolled",
    githubStatus: "unenrolled"
  }));

  beforeEach(() => {
    mockGetAllStudents.mockClear();
    mockGetAllStudents.mockReturnValue(mockStudents);
  });

  it('should return 10 students for page 2', () => {
    const result = getStudents(2, 10);
    expect(result.data.length).toBe(10);
  });
});