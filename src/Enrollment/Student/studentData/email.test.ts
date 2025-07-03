import { Email } from "./email";

describe("Email", () => {
  it("should create an Email instance with a valid email", () => {
    const email = new Email("user123@example.com");
    expect(email.getValue()).toBe("user123@example.com");
    expect(email.toString()).toBe("user123@example.com");
  });
  it("should throw an error for an invalid email format (missing @)", () => {
    expect(() => {
      new Email("invalid-email.com");
    }).toThrow("Invalid email format");
  });
});