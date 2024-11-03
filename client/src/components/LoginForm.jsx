import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

// const api = axios.create({
//   baseURL: "http://localhost:5001/api/auth",
//   withCredentials: true,
// });

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await api.post('/api/auth/login', { email, password });
            localStorage.setItem('email', email);
            localStorage.setItem('firstName', response.data.firstName);

            if (response.data.redirect) {
                const userCheckResponse = await api.get(`/api/auth/check-user/${email}`);
                if (userCheckResponse.data.isLender) {
                    navigate('/lender-dashboard');
                } else if (userCheckResponse.data.isBorrower) {
                    navigate('/borrower-dashboard');
                } else {
                    navigate('/role');
                }
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error during login');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

                {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Log In
                    </button>
                </form>

                <p className="text-center text-gray-600">
                    Don’t have an account? 
                    <a href="/register" className="text-blue-500 hover:underline"> Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
