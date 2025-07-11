import React, { useEffect, useState } from 'react';

const FirstnameInput: React.FC = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log('FirstnameInput mounted');
  }, []);

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="firstname" className="mb-1 text-sm font-medium text-gray-700">
        First Name
      </label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your first name"
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FirstnameInput;