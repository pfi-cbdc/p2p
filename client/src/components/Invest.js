import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios';

const Invest = () => {
    const [amount, setAmount] = useState(0);
    const [tenure, setTenure] = useState(1);
    const [monthlyEarn, setEarnings] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setButtonDisabled(true);
        try {
            // first check the kyc completion
            const email = localStorage.getItem('email');
            if(!email) {
                alert('Error! Please login again');
                setButtonDisabled(false);
                navigate(-1);
            };
            const response = await api.get(`/api/lender/status?email=${email}`);
            if(!response) {
                alert('There has been a misunderstanding. Please try again later');
                setButtonDisabled(false);
                navigate(-1);
            };
            if(!response.data.exists) {
                alert('Please complete your KYC first');
                setButtonDisabled(false);
                navigate('/lender');
            } else {
                const submitData = await api.post('/api/lender/newInv', {amount: Number(amount), tenure: Number(tenure), monthlyEarnings: monthlyEarn, email: email});
                if(!submitData) {
                    alert('Error in adding a new Investment');
                    setButtonDisabled(false);
                    navigate(-1);
                }
                else {
                    alert('Added Investment');
                    setButtonDisabled(false);
                }
            }
        }
        catch(e) {
            setButtonDisabled(false);
            console.error(e);
        }
    }

    return (
        <div className="bg-white shadow-lg p-6 rounded-lg">
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
                <button type="submit" disabled={buttonDisabled} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">I am ready to invest</button>
            </form>
        </div>
    );
}

export default Invest;