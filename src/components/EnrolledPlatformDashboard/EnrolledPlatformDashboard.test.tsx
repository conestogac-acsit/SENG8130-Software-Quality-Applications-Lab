import { render, screen, fireEvent } from "@testing-library/react";
import PlatformDashboard from "./EnrolledPlatformDashboard";
import '@testing-library/jest-dom';
import { Student } from "../StudentInfoDashboard/StudentInfoDashboard";

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
    const select = screen.getAllByDisplayValue("unenrolled")[0];
    fireEvent.change(select, { target: { value: "enrolled" } });
    expect(onUpdateStatus).toHaveBeenCalledWith(0, "github", "enrolled");
  });
});
