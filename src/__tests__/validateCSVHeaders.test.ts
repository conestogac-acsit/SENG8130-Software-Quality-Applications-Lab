import { validateCSVHeaders } from '../MyCsvTools/validateCSVHeaders';

describe('validateCSVHeaders', () => {
  test('returns true when all required headers are present', () => {
    const csv = 'Name, Age, Email\nAlice, 30, alice@example.com';
    const required = ['Name', 'Email'];
    expect(validateCSVHeaders(csv, required)).toBe(true);
  });

  test('returns false when required headers are missing', () => {
    const csv = 'Name, Age\nAlice, 30';
    const required = ['Name', 'Email'];
    expect(validateCSVHeaders(csv, required)).toBe(false);
  });
});
