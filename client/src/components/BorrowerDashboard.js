// client/src/components/BorrowerDashboard.js
import React, { useState } from 'react';
import InvoiceForm from './InvoiceForm';

const BorrowerDashboard = () => {
    const firstName = localStorage.getItem('firstName');
    const [showInvoiceForm, setShowInvoiceForm] = useState(true);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto">
                <div className='bg-black text-white text-center py-4'>Hi {firstName}, Welcome to borrower dashboard</div>
                
                <div className='flex flex-row'>
                    {/* ye menu bar hai*/}
                    <div className='flex flex-col bg-blue-300 w-[16rem] h-[86vh] shadow-lg'>
                        <button onClick={() => setShowInvoiceForm(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">Upload invoice</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">View invoice</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">Settings</button>
                    </div>

                {/* ye form ka area hai*/}
                <div className="flex-1">
                    {showInvoiceForm && <div>
                      <InvoiceForm />
                    </div>}
                </div>
                </div>


            </div>
        </div>
    );
};

export default BorrowerDashboard;
