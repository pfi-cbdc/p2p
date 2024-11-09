import React from 'react';
import { Link } from 'react-router-dom';

const WaitingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-700">Have patience while we confirm your invoice.</h1>
            <h2 className='text-xl font-bold text-gray-500'>We will confirm your status via mail</h2>
            <Link to="/borrower-dashboard">
                <button className="mt-4 text-blue-500 hover:underline hover:text-blue-700 transition duration-300 ease-in-out">
                    Go to Borrower Dashboard
                </button>
            </Link>
        </div>
    );
};

export default WaitingPage;
