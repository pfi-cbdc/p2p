import React, { useState } from 'react';
import Invest from './Invest';
import OpenInvoices from './OpenInvoices';
import api from '../api/axios';

const LenderDashboard = () => {
    const firstName = localStorage.getItem('firstName'); 
    const [showOpenInvoices, setShowOpenInvoices] = useState(false);
    const [showInvestmentForm, setShowInvestmentForm] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [showGreeting, setShowGreeting] = useState(true); // State to toggle greeting visibility

    const handleProfileClick = async () => {
        const email = localStorage.getItem('email');
        if (!email) {
            console.error('Email not found in local storage');
            return;
        }

        try {
            const response = await api.get(`/api/lender/profile?email=${email}`);
            const { firstName, lastName, phone, email: userEmail, lenderID } = response.data;
            console.log(firstName, lastName, phone, userEmail, lenderID);
            setUserDetails({ firstName, lastName, phone, userEmail, lenderID });
            setShowInvestmentForm(false);
            setShowOpenInvoices(false);
            setShowUserDetails(true);
            setShowGreeting(false); // Hide greeting when profile is shown
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="flex shadow-lg">
                {/* Left Panel for Navigation Buttons */}
                <div 
                    id="left-panel" 
                    className="flex flex-col space-y-4 p-5 w-1/6 h-screen bg-slate-300"
                >
                    <div className='border-t-2 border-gray-400'></div>

                    <button 
                        onClick={() => {
                            setShowOpenInvoices(false);
                            setShowInvestmentForm(true);
                            setShowUserDetails(false);
                            setShowGreeting(true);
                        }} 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Invest
                    </button>

                    <div className='border-t-2 border-gray-400'></div>

                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Home
                    </button>

                    <button onClick={handleProfileClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Profile
                    </button>

                    <div className='border-t-2 border-gray-400'></div>

                    <button 
                        onClick={() => {
                            setShowInvestmentForm(false);
                            setShowOpenInvoices(true);
                            setShowUserDetails(false);
                            setShowGreeting(true);
                        }} 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Open Invoices
                    </button>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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
                    {/* Conditional rendering of greeting */}
                    {showGreeting && (
                        <>
                            <h1 className="text-4xl font-bold text-center mb-5">Lender Dashboard</h1>
                            <p className="text-lg text-center mb-5">Hi {firstName}, welcome to the Lender Dashboard!</p>
                        </>
                    )}
                    
                    {/* Conditional Rendering of Components */}
                    {showOpenInvoices && <OpenInvoices />}
                    {showInvestmentForm && <Invest />}
                    
                    {/* New section to display user details */}
                    {showUserDetails && userDetails && (
                        <div className="mt-5">
                            <h2 className="text-2xl font-bold">User Details</h2>
                            <p><strong>First Name:</strong> {userDetails.firstName}</p>
                            <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                            <p><strong>Email:</strong> {userDetails.userEmail}</p>
                            <p><strong>Phone:</strong> {userDetails.phone}</p>
                            <p><strong>Lender ID:</strong> {userDetails.lenderID}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LenderDashboard;
