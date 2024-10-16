// client/src/components/BorrowerForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BorrowerForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        panCard: '',
        dateOfBirth: '',
        employmentStatus: '',
        loanAmount: '',
        loanPurpose: '',
        annualIncome: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/borrower', formData);
            console.log(response.data);
            navigate('/borrower-dashboard'); // Navigate to Borrower Dashboard
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="panCard" placeholder="PAN Card" onChange={handleChange} />
            <input type="date" name="dateOfBirth" onChange={handleChange} required />
            <input type="text" name="employmentStatus" placeholder="Employment Status" onChange={handleChange} required />
            <input type="number" name="loanAmount" placeholder="Loan Amount" onChange={handleChange} required />
            <input type="text" name="loanPurpose" placeholder="Loan Purpose" onChange={handleChange} required />
            <input type="number" name="annualIncome" placeholder="Annual Income" onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default BorrowerForm;
