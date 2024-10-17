// client/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        phoneNumber: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/login', credentials);
            console.log(response.data);
            navigate('/'); // Redirect to home after successful login
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Login</button>
        </form>
    );
};

export default Login;

