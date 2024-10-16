import React, { useState } from "react";

const Invest = () => {
    const [amount, setAmount] = useState(0);
    const [tenure, setTenure] = useState(1);
    const [monthlyEarn, setEarnings] = useState('');

    const submitHandler = () => {
        // handle a request to backend here.
        console.log(amount);
        console.log(tenure);
        console.log(monthlyEarn);
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 rounded-lg">
            <form onSubmit={submitHandler} className="space-y-6">
                <div>
                    <label className="block font-medium mb-2">Amount:</label>
                    <input type="number" id="amount" placeholder="Enter amount(INR):" className="shadow-lg" onChange={(e) => {setAmount(e.target.value)}} />
                </div>
                <div>
                    <label className="block font-medium mb-2">Tenure:</label>
                    <input type="range" id="tenure" min={1} max={36} value={1} className="shadow-lg" onChange={(e) => {setTenure(e.target.value)}} />
                    <span className="text-sm">{tenure} months</span>
                </div>
                <div>
                    <label className="block font-medium mb-2">Monthly Earnings:</label>
                    <input type="number" id="monthlyEarn" placeholder="Enter Monthly Earnings" className="shadow-lg" onChange={(e) => {setEarnings(e.target.value)}} />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">I am ready to invest</button>
            </form>
        </div>
    );
}

export default Invest;