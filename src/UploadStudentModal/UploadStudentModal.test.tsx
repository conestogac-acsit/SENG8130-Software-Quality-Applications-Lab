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
});
