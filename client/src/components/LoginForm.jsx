import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const api = axios.create({
//   baseURL: "http://localhost:5001/api/auth",
//   withCredentials: true,
// });

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true); // Password eye

    //Regex Implementation
    const [isEmailValid, setIsEmailValid] = useState(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    // Eye Button handler on password box
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setIsEmailValid(emailRegex.test(e.target.value));
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            required
                        />
                        {!isEmailValid && (
                            <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
                        )}
                    </div>
                    <div className='relative'>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? "password" : "text"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                        >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
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
                <p className="text-center text-gray-600">
                    Forgot password? 
                    <a href="/reset-pass" className="text-blue-500 hover:underline">reset</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
