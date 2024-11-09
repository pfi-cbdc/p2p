// client/src/components/BorrowerDashboard.js
import React, { useState } from 'react';
import InvoiceForm from './InvoiceForm';
import Invoices from './Invoices';

const BorrowerDashboard = () => {
    const firstName = localStorage.getItem('firstName');
    const [showInvoiceForm, setShowInvoiceForm] = useState(false);
    const [showInvoices, setShowInvoices] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto">
                <div className='bg-black text-white text-center py-4'>Hi {firstName}, Welcome to borrower dashboard</div>
                
                <div className='flex flex-row'>
                    {/* ye menu bar hai*/}
                    <div className='flex flex-col bg-blue-300 w-[16rem] h-[86vh] shadow-lg'>
                        <button onClick={() => {
                            setShowInvoices(false);
                            setShowInvoiceForm(true);
                        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">Upload invoice</button>
                        <button onClick={() => {
                            setShowInvoiceForm(false);
                            setShowInvoices(true);
                            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">My invoices</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300">Settings</button>
                    </div>

                {/* ye form ka area hai*/}
                <div className="flex-1">
                    {showInvoiceForm && <div>
                      <InvoiceForm />
                    </div>}
                </div>
                <div className="flex-1">
                    {showInvoices && <div>
                      <Invoices />
                    </div>}
                </div>
                </div>


            </div>
        </div>
    );
};

export default BorrowerDashboard;
