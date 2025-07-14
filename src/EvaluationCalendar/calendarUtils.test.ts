import {
  getWeekDates,
  getMonthGrid,
  formatDateRange,
  formatMonthLabel,
} from "./calendarUtils";
import { describe, it, expect, jest } from "@jest/globals";

describe("calendarUtils", () => {
  describe("getWeekDates", () => {
    it("should return 7 consecutive dates starting from the week's Monday", () => {
      const result = getWeekDates("2025-07-09"); 
      expect(result).toHaveLength(7);
      expect(result[0]).toBe("2025-07-07"); 
      expect(result[6]).toBe("2025-07-13"); 
    });
  });

  describe("getMonthGrid", () => {
    it("should return dates covering the full month grid", () => {
      const result = getMonthGrid(2025, 6); 
      expect(result.length).toBeGreaterThanOrEqual(28);
      expect(result[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it("should include days from previous month if month doesn't start on Monday", () => {
      const result = getMonthGrid(2025, 2); 
      expect(result[0]).toBe("2025-02-24");
    });
  });

  describe("formatDateRange", () => {
    it("should format a week range correctly", () => {

      const label = formatDateRange("2025-07-07");
      expect(label).toBe("Mon, Jul 7 – Sun, Jul 13");

    });
  });

  describe("formatMonthLabel", () => {
    it("should format the month name correctly", () => {
      const label = formatMonthLabel(2025, 6);
      expect(label).toBe("July 2025");
    });

    it("should format December correctly", () => {
      const label = formatMonthLabel(2025, 11);
      expect(label).toBe("December 2025");
    });
  });
});
