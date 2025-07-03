import { Email } from "./email";

describe("Email", () => {
  it("should create an Email instance with a valid email", () => {
    const email = new Email("user123@example.com");
    expect(email.getValue()).toBe("user123@example.com");
    expect(email.toString()).toBe("user123@example.com");
  });
});