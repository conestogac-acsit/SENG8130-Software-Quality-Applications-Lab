import React from "react";

type StudentEmailProps = {
  name: string;
  email: string;
  imageUrl: string;
  notes: string;
};

const StudentEmail: React.FC<StudentEmailProps> = ({ name, email, imageUrl, notes }) => {
  const handleSendEmail = () => {
    const confirmed = window.confirm("Do you want to send the email?");
    if (confirmed) {
      alert("Email sent successfully!");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <img src={imageUrl} alt={name} className="w-24 h-24 rounded-full" />
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Notes</h3>
        <p className="text-gray-700 mb-4">{notes}</p>

        <button
          onClick={handleSendEmail}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default StudentEmail;
