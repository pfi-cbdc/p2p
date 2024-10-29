// client/src/components/BorrowerForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BorrowerForm = () => {
    const [formData, setFormData] = useState({
        aadharCard: '',
        panCard: '',
        gender: '',
        dateOfBirth: '',
        accountStatement: '',
        gstNumber: '',
        typeOfBusiness: '',
        email: localStorage.getItem('email') || ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData); // Log the form data
        try {
            const response = await axios.post('http://localhost:5001/api/borrower', formData);
            console.log(response.data);
            navigate('/borrower-dashboard'); // Navigate to Borrower Dashboard
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data); // Log the error response
                alert(`Error: ${error.response.data.message || 'An error occurred'}`); // Show an alert with the error message
            } else {
                console.error('Error:', error);
                alert('Network error. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="aadharCard" placeholder="Aadhar Card" onChange={handleChange} required />
            <input type="text" name="panCard" placeholder="PAN Card" onChange={handleChange} required />
            <select name="gender" onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <input type="date" name="dateOfBirth" onChange={handleChange} required />
            <input type="text" name="accountStatement" placeholder="Account Statement" onChange={handleChange} required />
            <input type="text" name="gstNumber" placeholder="GST Number" onChange={handleChange} required />
            <select name="typeOfBusiness" onChange={handleChange} required>
                <option value="">Select Type of Business</option>
                <option value="test1">Test 1</option>
                <option value="test2">Test 2</option>
                <option value="test3">Test 3</option>
                <option value="test4">Test 4</option>
                <option value="test5">Test 5</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
};

export default BorrowerForm;
