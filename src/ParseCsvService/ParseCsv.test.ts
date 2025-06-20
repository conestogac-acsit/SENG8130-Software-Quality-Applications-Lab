import { parseCsv, Student } from './ParseCsv';


const createFile = (content: string): File => {
  return new File([content], 'test.csv', { type: 'text/csv' });
};

describe('parseCsv - Student', () => {
  it('parses a single valid student row', async () => {
    const headers = [
      'studentId', 'name', 'email', 'section', 'group', 'role',
      'imageUrl', 'notes', 'loopStatus', 'githubStatus'
    ].join(',');

    const row = [
      '001', 'Alice Smith', 'alice@example.com', 'A1', 'GroupA', 'Student',
      '', '', 'Active', 'enrolled'
    ].join(',');

    const csv = `${headers}\n${row}`;
    const file = createFile(csv);

    const data = await parseCsv(file, "Student") as Student[];

    expect(data.length).toBe(1);
    expect(data[0].studentId).toBe('001');
    expect(data[0].loopStatus).toBe('Active');
  });

  it('parses multiple valid student rows', async () => {
    const headers = [
      'studentId', 'name', 'email', 'section', 'group', 'role',
      'imageUrl', 'notes', 'loopStatus', 'githubStatus'
    ].join(',');

    const row1 = [
      '002', 'Bob Lee', 'bob@example.com', 'B2', 'GroupB', 'Student',
      '', '', 'Active', 'enrolled'
    ].join(',');

    const row2 = [
      '003', 'Carol King', 'carol@example.com', 'B2', 'GroupB', 'Student',
      '', '', 'Deactive', 'unenrolled'
    ].join(',');

    const csv = `${headers}\n${row1}\n${row2}`;
    const file = createFile(csv);

    const data = await parseCsv<Student>(file, "Student");

    expect(data.length).toBe(2);
    expect(data[1].name).toBe('Carol King');
    expect(data[1].githubStatus).toBe('unenrolled');
  });

  it('parses students with optional fields missing', async () => {
    const headers = [
      'studentId', 'name', 'email', 'section', 'group', 'role',
      'imageUrl', 'notes', 'loopStatus', 'githubStatus'
    ].join(',');

    const row = [
      '004', 'Dave Thomas', 'dave@example.com', 'C1', 'GroupC', 'Student',
      '', '', 'Active', 'enrolled'
    ].join(',');

    const csv = `${headers}\n${row}`;
    const file = createFile(csv);

    const data = await parseCsv<Student>(file, "Student");

    expect(data[0].imageUrl).toBe('');
    expect(data[0].notes).toBe('');
  });

  it('parses students with filled optional fields', async () => {
    const headers = [
      'studentId', 'name', 'email', 'section', 'group', 'role',
      'imageUrl', 'notes', 'loopStatus', 'githubStatus'
    ].join(',');

    const row = [
      '005', 'Eva Green', 'eva@example.com', 'D1', 'GroupD', 'Student',
      'https://eva.img', 'Excellent', 'Active', 'enrolled'
    ].join(',');

    const csv = `${headers}\n${row}`;
    const file = createFile(csv);

    const data = await parseCsv<Student>(file, "Student");

    expect(data[0].imageUrl).toBe('https://eva.img');
    expect(data[0].notes).toBe('Excellent');
  });
});
