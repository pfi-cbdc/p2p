// client/src/components/LenderDashboard.js
import React, { useState } from 'react';
import Invest from './Invest';
import OpenInvoices from './OpenInvoices';

const LenderDashboard = () => {
    const firstName = localStorage.getItem('firstName'); 
    const [showOpenInvoices, setShowOpenInvoices] = useState(false);
    const [showInvestmenForm, setShowInvestmentForm] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-5">
                <h1 className="text-4xl font-bold text-center mb-5">Lender Dashboard</h1>
                <p className="text-lg text-center mb-5">Hi {firstName}, welcome to the Lender Dashboard!</p> {/* Display greeting message */}
                
                {/* Add more content and functionality as needed */}
                <div className='flex bg-white shadow-lg'>
                    <div id='left-panel' className='flex flex-col space-y-4 p-2 w-1/5'>
                        <button onClick={() => {
                            setShowOpenInvoices(false);
                            setShowInvestmentForm(true);
                        }} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Invest</button>
                        <button onClick={() => {
                            setShowInvestmentForm(false);
                            setShowOpenInvoices(true);
                        }} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Open Invoices</button>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Your Payments</button>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Settings</button>
                    </div>
                    <div className="flex-1">
                        {showOpenInvoices && <div>
                        <OpenInvoices />
                        </div>}
                    </div>
                    <div className="flex-1">
                        {showInvestmenForm && <div>
                        <Invest />
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LenderDashboard;
