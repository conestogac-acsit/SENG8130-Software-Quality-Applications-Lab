import React from 'react';
import CenteredFormContainer from '../../../Components/CenteredFormContainer/CenteredFormContainer';
import Button from '../../../Components/Button/Button';

interface EnrollmentFormProps {
  onEnroll: (type: string) => void;
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ onEnroll }) => {
  return (
    <CenteredFormContainer>
      <h1 className="text-2xl font-semibold mb-4">Student Enrollment Form</h1>
      <form className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Student ID"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Course Name"
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email ID"
          className="border p-2 rounded w-full"
          required
        />

        <div className="flex gap-6 mt-4">
          <label>
            <input type="checkbox" className="mr-2" />
            GITHUB
          </label>
          <label>
            <input type="checkbox" className="mr-2" />
            LOOP
          </label>
        </div>

        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="flex gap-4">
            <Button label="Enroll in GitHub" onClick={() => onEnroll('GitHub')} />
            <Button label="Enroll in Loop" onClick={() => onEnroll('Loop')} />
            <Button label="Enroll in both" onClick={() => onEnroll('Both')} />
          </div>
          <Button label="Submit" onClick={() => onEnroll('Form Submitted')} />
        </div>
      </form>
    </CenteredFormContainer>
  );
};

export default EnrollmentForm;
