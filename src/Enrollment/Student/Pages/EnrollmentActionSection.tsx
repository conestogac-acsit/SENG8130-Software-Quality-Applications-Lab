import React, { useEffect, useState } from 'react';
import Button from '../../../Components/Button/Button';

const EnrollmentActionSection: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    console.log('EnrollmentActionSection mounted');
  }, []);

  const handleEnroll = (): void => {
    setMessage('Enrollment triggered');
  };

  return (
    <div className="p-6 bg-white rounded shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Enrollment Action</h2>
      <div className="flex flex-col items-center gap-4">
        <Button label="Enroll in GitHub" onClick={handleEnroll} />
        {message && <p className="text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default EnrollmentActionSection;
