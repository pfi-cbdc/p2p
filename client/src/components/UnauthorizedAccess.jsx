import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedAccess = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <div className="flex items-center mb-8">
        <img
          src="/favicon.ico"
          alt="p-Fi Logo"
          className="h-12 mr-2"
        />
        <h1 className="text-3xl font-bold text-gray-800">Unauthorized Access</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">STOP!</h2>
        <p className="text-lg text-gray-600 mb-6">
          You don't have permission to view this page.
        </p>
        <p className="text-sm text-gray-500 mb-8">
        Leave now or face consequences.
        </p>

        <button
            onClick={handleHome}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Return to Home
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;