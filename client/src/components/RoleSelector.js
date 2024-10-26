import React from 'react';
import { useNavigate } from 'react-router-dom';

const RolePage = () => {
    const navigate = useNavigate();
    // Retrieve the first name from localStorage
    const firstName = localStorage.getItem('firstName');

    // Redirect to login if user is not logged in
    if (!firstName) {
        navigate('/login');
        return null; // Prevent rendering
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Role Page</h1>
            <p className="text-xl">Hello, {firstName}!</p> {/* Display the first name */}
        </div>
    );
};

export default RolePage;
