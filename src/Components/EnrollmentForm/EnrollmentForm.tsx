import React from 'react';
import CenteredFormContainer from '../CenteredFormContainer/CenteredFormContainer';
import Button from '../Button/Button';

const EnrollmentForm = () => {
  return (
    <CenteredFormContainer>
      <form className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Student ID"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Course Name"
            className="border p-2 rounded w-full"
          />
        </div>

        <input
          type="email"
          placeholder="Email ID"
          className="border p-2 rounded w-full"
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
            <Button label="Enroll in GitHub" onClick={() => alert('GitHub')} />
            <Button label="Enroll in Loop" onClick={() => alert('Loop')} />
            <Button label="Enroll in both" onClick={() => alert('Both')} />
          </div>
          <Button label="Submit" onClick={() => alert('Form Submitted')} />
        </div>
      </form>
    </CenteredFormContainer>
  );
};

export default EnrollmentForm;
