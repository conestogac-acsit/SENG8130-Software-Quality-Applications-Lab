import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UploadStudentModal from "./UploadStudentModal";

describe("UploadStudentModal Full Integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const getFileInput = () =>
    document.querySelector('input[type="file"]') as HTMLInputElement;

  const validCsv =
    "studentId,name,email,section,group,role,imageUrl,notes,loopStatus,githubStatus\n1,John Doe,john@example.com,A,G1,Student,,,enrolled,unenrolled";
  const invalidEmailCsv =
    "studentId,name,email,section,group,role,imageUrl,notes,loopStatus,githubStatus\n1,John Doe,invalid-email,A,G1,Student,,,enrolled,unenrolled";
  const csv1 =
    "studentId,name,email,section,group,role,imageUrl,notes,loopStatus,githubStatus\n1,John,john@example.com,A,G1,Student,,,enrolled,unenrolled";
  const csv2 =
    "studentId,name,email,section,group,role,imageUrl,notes,loopStatus,githubStatus\n2,Jane,jane@example.com,B,G2,Student,,,unenrolled,enrolled";

  it("renders modal only when open", () => {
    const { rerender } = render(
      <UploadStudentModal isOpen={false} onClose={() => {}} />
    );
    expect(screen.queryByText(/Upload Student CSV/i)).not.toBeInTheDocument();

    rerender(<UploadStudentModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/Upload Student CSV/i)).toBeInTheDocument();
  });
  it("calls onClose when Cancel is clicked", () => {
    let closed = false;
    const handleClose = () => {
      closed = true;
    };
    render(<UploadStudentModal isOpen={true} onClose={handleClose} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(closed).toBe(true);
  });
    it("shows error if Upload is clicked without selecting a file", async () => {
    render(<UploadStudentModal isOpen={true} onClose={() => {}} />);
    fireEvent.click(screen.getByText("Upload"));
    expect(
      await screen.findByText(/Please select a CSV file/i)
    ).toBeInTheDocument();
  });
  it("resets messages when a new file is selected", async () => {
    render(<UploadStudentModal isOpen={true} onClose={() => {}} />);
    fireEvent.click(screen.getByText("Upload"));
    expect(
      await screen.findByText(/Please select a CSV file/i)
    ).toBeInTheDocument();
    const file = new File([validCsv], "students.csv", { type: "text/csv" });
    fireEvent.change(getFileInput(), { target: { files: [file] } });
    expect(
      screen.queryByText(/Please select a CSV file/i)
    ).not.toBeInTheDocument();
  });
  it("uploads valid CSV and saves to localStorage", async () => {
    render(<UploadStudentModal isOpen={true} onClose={() => {}} />);
    const file = new File([validCsv], "students.csv", { type: "text/csv" });
    fireEvent.change(getFileInput(), { target: { files: [file] } });
    fireEvent.click(screen.getByText("Upload"));
    expect(
      await screen.findByText(/Students uploaded successfully!/i)
    ).toBeInTheDocument();
    const stored = JSON.parse(
      localStorage.getItem("students_list_key") || "[]"
    );
    expect(stored.length).toBe(1);
    expect(stored[0].studentId).toBe("1");
    expect(stored[0].email).toBe("john@example.com");
  });
});
