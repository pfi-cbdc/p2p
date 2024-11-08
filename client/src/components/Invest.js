import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios';

const Invest = () => {
    const [formData, setFormData] = useState({
        amount: '',
        tenure: '',
        monthlyEarnings: '',
        firstName: localStorage.getItem('firstName') || '',
        email: localStorage.getItem('email') || ''
      });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();

    // Handle text and select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    try {
      // First check the KYC completion
      const email = localStorage.getItem('email');
      if (!email) {
          alert('Error! Please login again');
          setButtonDisabled(false);
          navigate(-1);
          return; // Ensure to return after navigating
      }

      const res = await api.get(`/api/lender/status?email=${email}`);
      if (!res) {
          alert('There has been a misunderstanding. Please try again later');
          setButtonDisabled(false);
          navigate(-1);
          return; // Ensure to return after navigating
      }

      if (!res.data.exists) {
          alert('Please complete your KYC first');
          setButtonDisabled(false);
          navigate('/lender');
          return; // Ensure to return after navigating
      } else {
        if(res.data.verified === 2) {
            alert('You are NOT authorized to INVEST');
            setButtonDisabled(false);
            navigate('/lender-dashboard');
            return;
        }
        if(res.data.verified === 0) {
            alert('Please wait while we verify your KYC');
            setButtonDisabled(false);
            navigate('/lender-dashboard');
            return;
        }
        const response = await api.post('/api/investment', {
            amount: formData.amount,
            tenure: formData.tenure,
            monthlyEarnings: formData.monthlyEarnings,
            firstName: formData.firstName,
            email: formData.email,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
          });
          console.log(response.data);
          alert('Form submitted successfully!');
      }
    } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to submit form. Please try again.');
    } finally {
        setButtonDisabled(false);
    }
    };

    return (
        <div className="bg-white shadow-lg p-6 rounded-lg">
            <form onSubmit={handleSubmit} enctype="multipart/form-data" className="w-full max-w-lg p-8 space-y-6 bg-white shadow-md rounded-lg">
                <div>
                    <label className="block font-medium mb-2">Amount:</label>
                    <input type="number" name="amount" placeholder="Amount(in INR)" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                    <label className="block font-medium mb-2">Tenure:</label>
                    <input type="number" name="tenure" placeholder="Tenure of Investment" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                    <label className="block font-medium mb-2">Monthly Earnings:</label>
                    <input type="number" name="monthlyEarnings" placeholder="Montly Earnings" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                </div>
                <button type="submit"  disabled={buttonDisabled} className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">Submit</button>
            </form>
        </div>
    );
}

export default Invest;