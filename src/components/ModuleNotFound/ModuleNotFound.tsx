import React from 'react';
import { FaRegSadTear } from 'react-icons/fa';

const ModuleNotFound: React.FC = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center p-5"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <div>
        <div
          style={{ fontSize: '6rem', fontWeight: 'bold', color: '#007bff' }}
          aria-label="404 - Page not found"
        >
          404
        </div>
        <div className="mb-4" style={{ fontSize: '4rem', color: '#6c757d' }}>
          <FaRegSadTear aria-hidden="true" />
        </div>
        <h2 className="mb-3">Module Not Found</h2>
        <p className="text-muted">
          Sorry, we couldn’t find the module you’re looking for.
          <br />
          Please check the URL or return to the homepage.
        </p>
        <a href="/" className="btn btn-primary mt-3">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ModuleNotFound;
