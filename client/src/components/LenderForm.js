// client/src/components/LenderForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LenderForm = ({ email }) => {
    const [formData, setFormData] = useState({
        aadharCard: '',
        panCard: '',
        gender: '',
        dateOfBirth: '',
        accountStatement: '',
        gstNumber: '',
        employmentStatus: '',
        email: email || localStorage.getItem('email') || ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/lender', formData);
            console.log(response.data);
            localStorage.setItem('isLender', 'true');
            navigate('/lender-dashboard');
        } catch (error) {
            console.error(error.response.data);
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
            <select name="employmentStatus" onChange={handleChange} required>
                <option value="">Select Employment Status</option>
                <option value="self-employed">Self-Employed</option>
                <option value="salaried">Salaried</option>
                <option value="business">Business</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
};

export default LenderForm;
