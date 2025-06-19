import { parseCsv, Student } from './ParseCsv';

const createFile = (content: string): File => {
  return new File([content], 'test.csv', { type: 'text/csv' });
};

describe('parseCsv', () => {
  it('resolves with valid student data', async () => {
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

    const data = await parseCsv(file, "Student");
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(1);
    expect(data[0].studentId).toBe('123');
    expect(data[0].loopStatus).toBe('Active');
    expect(data[0].githubStatus).toBe('Deactive');
  });

  it('throws error for missing fields', async () => {
    const file = createFile('name,email\nTest,test@example.com');

    await expect(parseCsv(file, "Student")).rejects.toThrow(/missing/i);
  });

  it('throws error for empty file', async () => {
    const file = createFile('');

    await expect(parseCsv(file, "Student")).rejects.toThrow();
  });
});
