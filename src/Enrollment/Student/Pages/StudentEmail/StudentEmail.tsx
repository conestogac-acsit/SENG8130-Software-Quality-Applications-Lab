import React, { useState, useCallback } from "react";
import { Student } from "../../studentData/studentTypes";
import Button from "../../../../Components/Button/Button";
import usericon from "../../../../assets/usericon.png";

type Props = {
  student: Student;
  onComposeEmail: (url: string) => void;
  onClose: () => void;
};

const StudentEmail: React.FC<Props> = ({ student, onComposeEmail, onClose }) => {
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMessage] = useState<boolean>(false);

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
    onClose();
  }, [content, student, onComposeEmail, onClose]);

  const handleClose = () => {
    setContent("");
    setErrorMessage(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-lg relative p-6 max-w-2xl w-full mx-4">
        <button className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
          onClick={handleClose}> &times; </button>

        <div className="flex items-center gap-4 mb-6">
          <img src={student.imageUrl || usericon} onError={(e) => {e.currentTarget.src = usericon;}}
            alt="Profile" className="w-24 h-24 rounded-full object-cover"/>
          <div>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-gray-600">{String(student.email)}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Notes</h3>
        <p className="text-gray-700 mb-4">{student.notes}</p>

        <h3 className="text-lg font-semibold mb-2">Email Content</h3>
        <textarea value={content} onChange={(e) => {
            setErrorMessage(false);
            setContent(e.target.value);
          }}
          rows={6}
          className="w-full border rounded p-3 mb-4 text-sm"
          placeholder="Write your message here..." />

        {errorMsg && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded px-4 py-2 w-fit mb-4">
            Please enter email content before composing.
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleComposeEmail} label="Compose Email" />
          <button onClick={handleClose} className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentEmail;