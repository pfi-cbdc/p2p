// client/src/components/LenderDashboard.js
import React, { useState } from 'react';
import Invest from './Invest';
import OpenInvoices from './OpenInvoices';
import Payments from './Payments';

const LenderDashboard = () => {
    const firstName = localStorage.getItem('firstName'); 
    const [showOpenInvoices, setShowOpenInvoices] = useState(false);
    const [showInvestmentForm, setShowInvestmentForm] = useState(false);
    const [showPayemts, setShowPayemts] = useState(false);

    return (
        <div className="min-h-screen">
                
                
                <div className="flex shadow-lg ">
                    {/* Left Panel for Navigation Buttons */}
                    <div 
                        id="left-panel" 
                        className="flex flex-col space-y-4 p-5 w-1/6 h-screen bg-slate-300"
                    >

                    <div className='border-t-2 border-gray-400'></div>

                        <button 
                            onClick={() => {
                                setShowOpenInvoices(false);
                                setShowPayemts(false);
                                setShowInvestmentForm(true);
                            }} 
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Invest
                        </button>

                        <div className='border-t-2 border-gray-400'></div>

                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Home
                        </button>

                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Profile
                        </button>

                        <div className='border-t-2 border-gray-400'></div>

                        <button 
                            onClick={() => {
                                setShowInvestmentForm(false);
                                setShowPayemts(false);
                                setShowOpenInvoices(true);
                            }} 
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Open Invoices
                        </button>
                        <button onClick={() => {
                            setShowOpenInvoices(false);
                            setShowInvestmentForm(false);
                            setShowPayemts(true);
                        }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Your Payments
                        </button>
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Wallet
                        </button>

                        <div className='border-t-2 border-gray-400'></div>

                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Dummy button
                        </button>

                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Dummy button
                        </button>

                        <div className='border-t-2 border-gray-400'></div>

                    </div>
                    
                    {/* Right Panel for Greeting and Main Content */}
                    <div className="flex-1 p-5">
                    <h1 className="text-4xl font-bold text-center mb-5">Lender Dashboard</h1>
                        <p className="text-lg text-center mb-5">Hi {firstName}, welcome to the Lender Dashboard!</p>
                        
                        {/* Conditional Rendering of Components */}
                        {showOpenInvoices && <OpenInvoices />}
                        {showInvestmentForm && <Invest />}
                        {showPayemts && <Payments />}
                    </div>
                </div>
            </div>
    );
};

export default LenderDashboard;
