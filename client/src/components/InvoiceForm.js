import React, { useState } from 'react';
import api from '../api/axios';
import FileUpload from './FileUpload'; // Import the FileUpload component
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    fileUpload: null,  // This will store the file object
    typeOfBusiness: 'Select',
    tenureOfInvoice: '',
    interestRate: '',
    email: localStorage.getItem('email') || ''
  });
  const [loading, setLoading] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();
  
  // Handle file selection
  const handleFileSelect = (file) => {
    setFormData({ ...formData, fileUpload: file });
  };

  // Handle text and select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    setLoading(true);

    try {
        const email = localStorage.getItem('email');
        if (!email) {
            alert('Error! Please login again');
            setButtonDisabled(false);
            navigate(-1);
            return;
        }

        // Check if the email already exists in the invoice database
        const invoiceCheckResponse = await api.get(`/api/invoices/check?email=${email}`);
        if (invoiceCheckResponse.data.exists) {
            alert('You can fill the invoice form only once.');
            setButtonDisabled(false);
            return;
        }

        // Proceed with the existing KYC checks and form submission
        const res = await api.get(`/api/borrower/status?email=${email}`);
        if (!res) {
            alert('There has been a misunderstanding. Please try again later');
            setButtonDisabled(false);
            navigate(-1);
            return;
        }

        if (!res.data.exists) {
            alert('Please complete your KYC first');
            setButtonDisabled(false);
            navigate('/borrower');
            return;
        } else {
            if(res.data.verified === 2) {
                alert('You are NOT authorized to generate an INVOICE');
                setButtonDisabled(false);
                navigate('/borrower-dashboard');
                return;
            }
            if(res.data.verified === 0) {
                alert('Please wait while we verify your KYC');
                setButtonDisabled(false);
                navigate('/borrower-dashboard');
                return;
            }
        }

        // Create FormData object to send file + form data
        const formDataToSend = new FormData();
        formDataToSend.append('fileUpload', formData.fileUpload);
        formDataToSend.append('typeOfBusiness', formData.typeOfBusiness);
        formDataToSend.append('tenureOfInvoice', formData.tenureOfInvoice);
        formDataToSend.append('interestRate', formData.interestRate);
        formDataToSend.append('email', formData.email);

        const response = await api.post('/api/invoice', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data);
        alert('Form submitted successfully!');
        // Navigate to the WaitingPage after successful submission
        navigate('/waiting');

    } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to submit form. Please try again.');
    } finally {
        setButtonDisabled(false);
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-full max-w-lg p-8 space-y-6 bg-white shadow-md rounded-lg">

      <FileUpload onFileSelect={handleFileSelect} /> {/* File upload component */}
      
      <select name="typeOfBusiness" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
        <option value="Select">Select</option>
        <option value="Sole Proprietorship">Sole Proprietorship</option>
        <option value="Partnership">Partnership</option>
        <option value="Private Limited">Private Limited</option>
        <option value="Public Limited">Public Limited</option>
      </select>

      <input type="number" name="tenureOfInvoice" placeholder="Tenure of Invoice" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
      <input type="number" name="interestRate" placeholder="Interest Rate" onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
      
      <button 
        type="submit" 
        disabled={buttonDisabled} 
        className={`w-full px-4 py-2 mt-4 font-semibold text-white rounded focus:outline-none ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> Uploading...
          </span>
        ) : 'Upload Invoice'}
      </button>
    </form>
  );
};

export default InvoiceForm;
