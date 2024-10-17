// client/src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="flex space-x-4 mb-4">
                <Link to="/lender" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Register as Lender
                </Link>
                <Link to="/borrower" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    Register as Borrower
                </Link>
            </div>
        </div>
    );
};

export default Home;
