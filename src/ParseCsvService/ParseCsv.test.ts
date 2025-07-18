import { parseCsv, Student, Evaluation } from './ParseCsv';
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
  
    it('throws error if required student fields are missing', async () => {
      const headers = [
        'studentId', 'name', 'email', 'section', 'group', 'role',
      ].join(',');
  
      const row = [
        '006', 'Frank Hall', 'frank@example.com', 'E1', 'GroupE', 'Student'
      ].join(',');
  
      const csv = `${headers}\n${row}`;
      const file = createFile(csv);
  
      await expect(parseCsv<Student>(file, "Student")).rejects.toMatch(/Missing required fields/);
    });
  
    it('returns empty array for empty student CSV', async () => {
      const headers = [
        'studentId', 'name', 'email', 'section', 'group', 'role',
        'imageUrl', 'notes', 'loopStatus', 'githubStatus'
      ].join(',');
  
      const csv = `${headers}\n`;
      const file = createFile(csv);
  
      const data = await parseCsv<Student>(file, "Student");
      expect(data.length).toBe(0);
    });
  });
  
  describe('parseCsv - Evaluation', () => {
    it('parses a single valid evaluation row', async () => {
      const headers = [
        'course', 'title', 'type', 'weight', 'dueDate', 'instructor', 'campus'
      ].join(',');
  
      const row = [
        'CS101', 'Midterm', 'Exam', '30', '2024-06-10', 'Dr. Smith', 'Main'
      ].join(',');
  
      const csv = `${headers}\n${row}`;
      const file = createFile(csv);
  
      const data = await parseCsv<Evaluation>(file, "Evaluation");
      expect(data.length).toBe(1);
      expect(data[0].course).toBe('CS101');
      expect(data[0].weight).toBe(30);
      expect(data[0].dueDate instanceof Date).toBe(true);
      expect(data[0].instructor).toBe('Dr. Smith');
    });
  
    it('parses multiple evaluation rows', async () => {
      const headers = [
        'course', 'title', 'type', 'weight', 'dueDate', 'instructor', 'campus'
      ].join(',');
  
      const row1 = [
        'CS102', 'Quiz 1', 'Quiz', '10', '2024-06-12', 'Dr. Lee', 'North'
      ].join(',');
  
      const row2 = [
        'CS102', 'Final', 'Exam', '60', '2024-07-01', 'Dr. Lee', 'North'
      ].join(',');
  
      const csv = `${headers}\n${row1}\n${row2}`;
      const file = createFile(csv);
  
      const data = await parseCsv<Evaluation>(file, "Evaluation");
      expect(data.length).toBe(2);
      expect(data[1].title).toBe('Final');
      expect(data[1].weight).toBe(60);
    });
  
    it('throws error if required evaluation fields are missing', async () => {
      const headers = [
        'course', 'title', 'type', 'weight', 'dueDate', 'instructor'
      ].join(',');
  
      const row = [
        'CS103', 'Assignment', 'Assignment', '20', '2024-06-15', 'Dr. Brown'
      ].join(',');
  
      const csv = `${headers}\n${row}`;
      const file = createFile(csv);
  
      await expect(parseCsv<Evaluation>(file, "Evaluation")).rejects.toMatch(/Missing required fields/);
    });
  
    it('handles missing optional fields in evaluation row', async () => {
      const headers = [
        'course', 'title', 'type', 'weight', 'dueDate', 'instructor', 'campus'
      ].join(',');

      const row = [
        'CS106', 'Presentation', 'Presentation', '15', '2024-06-25', '', ''
      ].join(',');

      const csv = `${headers}\n${row}`;
      const file = createFile(csv);

      const data = await parseCsv<Evaluation>(file, "Evaluation");
      expect(data[0].instructor).toBe('');
      expect(data[0].campus).toBe('');
  });

  it('handles invalid date in evaluation row', async () => {
    const headers = [
    'course', 'title', 'type', 'weight', 'dueDate', 'instructor', 'campus'
     ].join(',');

     const row = [
    'CS104', 'Project', 'Project', '40', 'not-a-date', 'Dr. White', 'West'
     ].join(',');

    const csv = `${headers}\n${row}`;
    const file = createFile(csv);

    const data = await parseCsv<Evaluation>(file, "Evaluation");
    expect(isNaN(data[0].dueDate.getTime())).toBe(true);
  });


   it('defaults weight to 0 when missing', async () => {
     const headers = [
       'course', 'title', 'type', 'weight', 'dueDate', 'instructor', 'campus'
      ].join(',');

    const row = [
    'CS107', 'Assignment', 'Assignment', '', '2024-07-15', 'Dr. Brown', 'East'
     ].join(',');

     const csv = `${headers}\n${row}`;
     const file = createFile(csv);

     const data = await parseCsv<Evaluation>(file, "Evaluation");
     expect(data[0].weight).toBe(0);
  });


    it('returns empty array for empty evaluation CSV', async () => {
      const headers = [
        'course', 'title', 'type', 'weight', 'dueDate', 'instructor', 'campus'
      ].join(',');
  
      const csv = `${headers}\n`;
      const file = createFile(csv);
  
      const data = await parseCsv<Evaluation>(file, "Evaluation");
      expect(data.length).toBe(0);
    });

    it('throws an error for completely empty file', async () => {
      const file = createFile('');
      await expect(parseCsv(file, "Evaluation")).rejects.toMatch(/Missing required fields/);
    });
     
    it('throws an error for CSV with incorrect headers', async () => {
      const csv = 'wrong,header,format\nabc,123,456';
      const file = createFile(csv);
      await expect(parseCsv(file, "Evaluation")).rejects.toMatch(/Missing required fields/);
    });
});