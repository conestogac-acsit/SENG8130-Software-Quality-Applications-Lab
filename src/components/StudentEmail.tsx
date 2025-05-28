import React from "react";
import { useParams } from "react-router-dom";

const StudentEmail = () => {
  const { id } = useParams();

  if (!id) return <p className="p-4 text-red-500">No student ID provided.</p>;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Send Email to Student ID: {id}</h1>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Recipient email"
          defaultValue={`student${id}@example.com`}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Subject"
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Message"
          className="w-full border p-2 rounded h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default StudentEmail;
