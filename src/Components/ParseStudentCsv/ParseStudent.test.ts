import { parseStudentCsv } from '../ParseStudentCsv/ParseStudentCsv'
type EnrollmentStatus = "enrolled" | "unenrolled" | "Active" | "Deactive";

interface Student {
  studentId: string;
  name: string;
  email: string;
  section: string;
  group: string;
  role: string;
  imageUrl?: string;
  notes?: string;
  loopStatus: EnrollmentStatus;
  githubStatus: EnrollmentStatus;
}


const createFile = (content: string): File => {
  return new File([content], 'test.csv', { type: 'text/csv' });
};

describe('parseStudentCsv', () => {
  it('calls callback when all required fields are present', (done) => {
    const headers = [
      'studentId', 'name', 'email', 'section', 'group', 'role',
      'imageUrl', 'notes', 'loopStatus', 'githubStatus'
    ].join(',');

    const row = [
      '123', 'Test Name', 'test@example.com', 'A1', 'Group1', 'Student',
      '', '', 'yes', 'no'
    ].join(',');

    const csv = `${headers}\n${row}`;
    const file = createFile(csv);

    parseStudentCsv(
      file,
      (data: Student[]) => {
        try {
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(1);
          expect(data[0].studentId).toBe('123');
          expect(data[0].loopStatus).toBe('Active');
          expect(data[0].githubStatus).toBe('Deactive');
          done();
        } catch (error) {
          done(error);
        }
      },
      (err) => {
        done(err || 'Unexpected error');
      }
    );
  });

  it('calls onError for missing fields', (done) => {
    const file = createFile('name,email\nTest,test@example.com');

    parseStudentCsv(
      file,
      () => {},
      (msg) => {
        try {
          expect(typeof msg).toBe('string');
          expect(msg.toLowerCase()).toContain('missing');
          done();
        } catch (error) {
          done(error);
        }
      }
    );
  });

  it('calls onError for empty file', (done) => {
    const file = createFile('');

    parseStudentCsv(
      file,
      () => {},
      (msg) => {
        try {
          expect(typeof msg).toBe('string');
          expect(msg.toLowerCase()).toContain('missing');
          done();
        } catch (error) {
          done(error);
        }
      }
    );
  });
});
