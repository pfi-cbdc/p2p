// client/src/components/InvoiceForm.js
import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './FileUpload'; // Import the FileUpload component
import { useNavigate } from "react-router-dom";

const InvoiceForm = ({ email, firstName }) => {
  const [formData, setFormData] = useState({
    fileUpload: null,  // This will store the file object
    typeOfBusiness: 'Select',
    tenureOfInvoice: '',
    interestRate: '',
    email: email, // Add email to formData
    firstName: firstName // Add firstName to formData
  });
  const [buttonDiabled, setButtonDisabled] = useState(false);
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

    // Create FormData object to send file + form data
    const formDataToSend = new FormData();
    formDataToSend.append('fileUpload', formData.fileUpload);  // Append the file
    formDataToSend.append('typeOfBusiness', formData.typeOfBusiness);
    formDataToSend.append('tenureOfInvoice', formData.tenureOfInvoice);
    formDataToSend.append('interestRate', formData.interestRate);

    try {
      const response = await axios.post('http://localhost:5001/api/invoice', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      setButtonDisabled(false);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 space-y-6 bg-white shadow-md rounded-lg">
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
      
      <button type="submit" disabled={buttonDiabled} className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">Submit</button>
    </form>
  );
};

export default InvoiceForm;
