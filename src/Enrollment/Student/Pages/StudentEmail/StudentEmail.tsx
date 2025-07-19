import React, { useState, useCallback } from "react";
import { Student } from "../../studentData/studentTypes";
import Button from "../../../../Components/Button/Button";
import usericon from "../../../../assets/usericon.png";

type Props = {
  student: Student; 
  onComposeEmail: (url: string) => void;
};

const StudentEmail: React.FC<Props> = ({ student, onComposeEmail }) => {
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMessage] = useState<boolean>(false);

  if (!student || !onComposeEmail) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>Missing student data. Please upload student data via csv.</p>
      </div>
    );
  }

  const handleComposeEmail = useCallback(() => {
    if (!content.trim()) {
      setErrorMessage(true);
      return;
    }
    const subject = encodeURIComponent(`Message for ${student.name}`);
    const body = encodeURIComponent(content);
    const emailAddress = student.email.toString();
    const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

    onComposeEmail(mailtoUrl);
  }, [content, student, onComposeEmail]);

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={student?.imageUrl || usericon}
            onError={(e) => {
              e.currentTarget.src = usericon;
            }}
            alt={`Profile picture`}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-gray-600">{student.email.toString()}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Notes</h3>
        <p className="text-gray-700 mb-4">{student.notes}</p>

        <h3 className="text-lg font-semibold mb-2">Email Content</h3>
        <textarea
          value={content}
          onChange={(e) => { setErrorMessage(false); setContent(e.target.value); }}
          rows={6}
          className="w-full border rounded p-3 mb-4 text-sm"
          placeholder="Write your message here..."
        />
        {errorMsg && (
          <div className="mt-4 bg-red-100 text-red-700 border border-red-300 rounded px-4 py-2 w-fit">
            Please enter email content before composing.
          </div>
        )}
        <Button onClick={handleComposeEmail} label="Compose Email" />
      </div>
    </div>
  );
};

export default StudentEmail;
