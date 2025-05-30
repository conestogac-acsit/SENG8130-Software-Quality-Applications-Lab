import { render, screen, fireEvent } from "@testing-library/react";
import PlatformDashboard from "../components/PlatformDashboard";
import type { Student } from "../components/types";
import '@testing-library/jest-dom';

describe("PlatformDashboard", () => {
  const mockStudents: Student[] = [
    {
      name: "Alice",
      email: "alice@example.com",
      group: "1001",
      role: "student",
      studentId: "1001",
      loop: "yes",
      github: "no",
      status: "unenrolled",
      loopStatus: "enrolled",
      githubStatus: "unenrolled",
    },
    {
      name: "Bob",
      email: "bob@example.com",
      group: "1002",
      role: "student",
      studentId: "1002",
      loop: "no",
      github: "yes",
      status: "unenrolled",
      loopStatus: "unenrolled",
      githubStatus: "enrolled",
    },
  ];

  it("Verify that status is rendered as text when enrolled (non-editable)", () => {
    render(
      <PlatformDashboard
        platform="loop"
        data={mockStudents}
        onUpdateStatus={jest.fn()}
      />
    );
    const enrolledElements = screen.getAllByText("enrolled");

    // Filter to get the one that is an <i> tag (non-editable)
    const aliceStatus = enrolledElements.find(
      (el) => el.tagName.toLowerCase() === "i"
    );

    expect(aliceStatus).toBeInTheDocument();
    expect(aliceStatus?.tagName.toLowerCase()).toBe("i");
  });

  it("Verify that status is rendered as a select box when unenrolled (editable)", () => {
    render(
      <PlatformDashboard
        platform="loop"
        data={mockStudents}
        onUpdateStatus={jest.fn()}
      />
    );

    
    const select = screen.getByDisplayValue("unenrolled");
    expect(select).toBeInTheDocument();
    expect(select.tagName.toLowerCase()).toBe("select");
  });

  it("Verify that onUpdateStatus is called when changing status from unenrolled to enrolled", () => {
    const onUpdateStatus = jest.fn();

    render(
      <PlatformDashboard
        platform="github"
        data={mockStudents}
        onUpdateStatus={onUpdateStatus}
      />
    );
    // Find select for Alice's githubStatus (unenrolled)
    const select = screen.getAllByDisplayValue("unenrolled")[0];

    // Change status to 'enrolled'
    fireEvent.change(select, { target: { value: "enrolled" } });

    // onUpdateStatus should be called with (index, platform, newStatus)
    expect(onUpdateStatus).toHaveBeenCalledWith(0, "github", "enrolled");
  });
});
