import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    fileUpload: '',
    typeOfBusiness: 'Select',
    tenureOfInvoice: '',
    interestRate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data:', formData); // Log the form data
    try {
        const response = await axios.post('http://localhost:5001/api/invoice', formData);
        console.log(response.data);
        alert('Form submitted successfully!');
    } catch (error) {
        console.error('Submission error:', error); // Log the error
        alert('Failed to submit form. Please try again.');
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="fileUpload" placeholder="File Upload" onChange={handleChange} required />
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

export default InvoiceForm
