import { setWeeklyThreshold, getWeeklyThreshold } from './alertThresholdService';

describe('alertThresholdService', () => {
  it('should set and get the threshold correctly', () => {
    setWeeklyThreshold(15);
    expect(getWeeklyThreshold()).toBe(15);
  });

  it('should throw error for threshold less than 1', () => {
    expect(() => setWeeklyThreshold(0)).toThrow('Threshold must be ≥ 1');
  });
});