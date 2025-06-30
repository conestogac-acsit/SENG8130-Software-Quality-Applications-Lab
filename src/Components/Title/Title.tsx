import React, { useEffect } from 'react';

const Title: React.FC = () => {
  useEffect(() => {
    console.log('Title component mounted');
  }, []);

  return (
    <h1 className="text-3xl font-bold text-center text-blue-800 my-6">
      Automated Student Enrollment Form
    </h1>
  );
};

export default Title;