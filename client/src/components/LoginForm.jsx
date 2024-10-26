import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for routing

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error messages

        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', {
                email,
                password,
            }, { withCredentials: true }); // Include withCredentials to send cookies

            // Ensure the response includes the user's first name
            if (response.data.user && response.data.user.firstName) {
                // Store the user's first name in localStorage
                localStorage.setItem('firstName', response.data.user.firstName);
                alert(response.data.message);
                navigate('/role'); // Redirect to the role page after login
            } else {
                setErrorMessage('Login successful, but user information is not available.');
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'An error occurred');
            } else {
                setErrorMessage('Network error. Please try again.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
