import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RolePage = () => {
    const navigate = useNavigate();
    const firstName = localStorage.getItem('firstName');

    useEffect(() => {
        // Redirect to login if user is not logged in
        if (!firstName) {
            navigate('/login');
        } 
    }, [firstName, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Role Page</h1>
            <p className="text-xl">Hello, {firstName}!</p>
            <div className="flex flex-row mt-8">
                <button 
                    className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate('/lender')}
                >
                    Register as Lender
                </button>
                <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate('/borrower')}
                >
                    Register as Borrower
                </button>
            </div>
        </div>
    );
};

export default RolePage;
