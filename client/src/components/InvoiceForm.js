// client/src/components/InvoiceForm.js
import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './FileUpload'; // Import the FileUpload component

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    fileUpload: null,  // This will store the file object
    typeOfBusiness: 'Select',
    tenureOfInvoice: '',
    interestRate: ''
  });

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
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileUpload onFileSelect={handleFileSelect} /> {/* File upload component */}
      
      <select name="typeOfBusiness" onChange={handleChange} required>
        <option value="Select">Select</option>
        <option value="Sole Proprietorship">Sole Proprietorship</option>
        <option value="Partnership">Partnership</option>
        <option value="Private Limited">Private Limited</option>
        <option value="Public Limited">Public Limited</option>
      </select>

      <input type="number" name="tenureOfInvoice" placeholder="Tenure of Invoice" onChange={handleChange} required />
      <input type="number" name="interestRate" placeholder="Interest Rate" onChange={handleChange} required />
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default InvoiceForm;
