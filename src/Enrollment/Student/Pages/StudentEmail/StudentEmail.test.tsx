import { render, screen, fireEvent } from "@testing-library/react";
import { Email } from "../../studentData/email";
import { Student } from "../../studentData/studentTypes";
import StudentEmail from "./StudentEmail";

const testStudent: Student = {
  id: "1",
  name: "John Doe",
  email: new Email("john@example.com"),
  group: "A",
  role: "Student",
  section: "101",
  imageUrl: "https://placehold.co/100x100",
  notes: "Test student for verifying email functionality.",
  isLoopEnrolled: true,
  isGithubEnrolled: false,
};

describe("StudentEmail Component", () => {
  it("renders student details when student exists", () => {
    render(<StudentEmail student={testStudent} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Test student for verifying email functionality.")).toBeInTheDocument();
  });
  it("renders textarea and button", () => {
    render(<StudentEmail student={testStudent} />);
    expect(
      screen.getByPlaceholderText("Write your message here...")
    ).toBeInTheDocument();
    expect(screen.getByText("Compose Email")).toBeInTheDocument();
  });
  it("updates textarea value when typing", () => {
    render(<StudentEmail student={testStudent} />);

    const textarea = screen.getByPlaceholderText(
      "Write your message here..."
    ) as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: "Hello!" } });

    expect(textarea.value).toBe("Hello!");
  });
  it("calls onComposeEmail with correct mailto link when button is clicked", () => {
  let capturedUrl = "";
  render(
    <StudentEmail
      student={testStudent}
      onComposeEmail={(url) => {
        capturedUrl = url;
      }}
    />
  );
  const textarea = screen.getByPlaceholderText("Write your message here...");
  fireEvent.change(textarea, { target: { value: "Hello student!" } });
  const button = screen.getByText("Compose Email");
  fireEvent.click(button);
  expect(capturedUrl).toContain("mailto:john@example.com");
  expect(capturedUrl).toContain("subject=Message%20for%20John%20Doe");
  expect(capturedUrl).toContain("body=Hello%20student!");
});


});