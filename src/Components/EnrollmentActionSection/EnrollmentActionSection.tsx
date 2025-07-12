import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';

const EnrollmentActionSection: React.FC = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('EnrollmentActionSection mounted');
  }, []);

  const handleEnroll = () => {
    setMessage('Enrollment triggered');
  };

  return (
    <div className="p-6 bg-white rounded shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Enrollment Action</h2>
      <Button label="Enroll in GitHub" onClick={handleEnroll} />
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default EnrollmentActionSection;
