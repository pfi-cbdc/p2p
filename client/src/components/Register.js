// client/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/register', formData);
            console.log(response.data);
            navigate('/'); // Redirect to home after successful registration
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Register</button>
        </form>
    );
};

export default Register;

