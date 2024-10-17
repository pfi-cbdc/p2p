// client/src/components/BorrowerDashboard.js
import React, { useState } from 'react';
import InvoiceForm from './InvoiceForm';

const BorrowerDashboard = () => {
    const [showInvoiceForm, setShowInvoiceForm] = useState(false);

    return (
        <div>
            <div className='bg-black text-white text-center'>Welcome to user dashboard</div>
            
            <div className='flex flex-row'>
                {/* ye menu bar hai*/}
                <div className='flex flex-col bg-blue-300 w-[16rem] h-[86vh]'>
                    <button onClick={() => setShowInvoiceForm(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 my-16 px-4 rounded">Upload invoice</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 my-16 px-4 rounded">View invoice</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 my-[17rem] px-4 rounded">Settings</button>
                </div>

            {/* ye form ka area hai*/}
            <div>
                {showInvoiceForm && <div>
                  <InvoiceForm />
                </div>}
            </div>
            </div>


        </div>
    );
};

export default BorrowerDashboard;
