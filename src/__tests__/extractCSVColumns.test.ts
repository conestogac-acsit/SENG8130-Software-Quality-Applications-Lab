import { extractCSVColumns } from '../MyCsvTools/extractCSVColumns';

describe('extractCSVColumns', () => {
  test('returns correct headers from standard CSV string', () => {
    const csv = 'Name, Email, Age\nAlice, alice@mail.com, 30';
    expect(extractCSVColumns(csv)).toEqual(['Name', 'Email', 'Age']);
  });

  test('handles extra spaces around headers', () => {
    const csv = ' Name , Email , Age \nBob, bob@mail.com, 25';
    expect(extractCSVColumns(csv)).toEqual(['Name', 'Email', 'Age']);
  });

  test('returns empty array if input is empty', () => {
    const csv = '';
    expect(extractCSVColumns(csv)).toEqual([]);
  });
});
