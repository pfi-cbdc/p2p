// client/src/components/LenderDashboard.js
import React from 'react';
import Invest from './Invest';

const LenderDashboard = () => {
    return (
        <div>
            <h1>Lender Dashboard</h1>
            <p>Welcome to the Lender Dashboard!</p>
            {/* Add more content and functionality as needed */}
            <div className='flex bg-white shadow-lg'>
                <div id='left-panel' className='flex flex-col space-y-4 p-2 w-1/5'>
                    <button onClick={() => {}} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Invest</button>
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Open Invoices</button>
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Your Payments</button>
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Settings</button>
                </div>
                <div id='right-panel' className='w-4/5'> 
                    <p>This is right one.</p>
                    <Invest />
                </div>
            </div>
        </div>
    );
};

export default LenderDashboard;

