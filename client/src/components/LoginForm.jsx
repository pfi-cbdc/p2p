import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', {
                email,
                password,
            }, { withCredentials: true });

            console.log('Login response:', response.data);

            if (response.data.redirect) {
                console.log('Redirecting to:', response.data.redirect);
                localStorage.setItem('firstName', response.data.firstName);
                localStorage.setItem('email', email);
                const userCheckResponse = await axios.get(`http://localhost:5001/api/auth/check-user/${email}`);
                console.log('User check response:', userCheckResponse.data);

                if (userCheckResponse.data.isLender) {
                    console.log('Navigating to lender dashboard');
                    navigate('/lender-dashboard');
                } else if (userCheckResponse.data.isBorrower) {
                    console.log('Navigating to borrower dashboard');
                    navigate('/borrower-dashboard');
                } else {
                    console.log('Navigating to role selection');
                    navigate('/role');
                }
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
                    className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;
