import { generateAlertMessage } from './AlertService';

describe('generateAlertMessage', () => {
  it('should return alert message when count exceeds threshold', () => {
    const result = generateAlertMessage(13, 12, 10);
    expect(result).toBe(' Week 13 has 12 evaluations scheduled – exceeds the threshold of 10!');
  });

  it('should return null when count equals threshold', () => {
    const result = generateAlertMessage(13, 10, 10);
    expect(result).toBeNull();
  });

  it('should return null when count is below threshold', () => {
    const result = generateAlertMessage(13, 8, 10);
    expect(result).toBeNull();
  });
});