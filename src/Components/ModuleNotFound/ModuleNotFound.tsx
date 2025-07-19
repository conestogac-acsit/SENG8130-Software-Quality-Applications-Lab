import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegSadTear } from 'react-icons/fa';

const ModuleNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <div className="text-6xl font-bold text-blue-600" aria-label="404 - Page not found">
        404
      </div>
      <div className="my-4 text-5xl text-gray-500">
        <FaRegSadTear aria-hidden="true" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-4">
        Sorry, we couldn’t find the page you were looking for.
      </p>
      <Link
        to="/"
        className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ModuleNotFound;