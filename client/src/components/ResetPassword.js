import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    //Regex Implementation
    const [isEmailValid, setIsEmailValid] = useState(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await api.post('/api/reset/reset-password', { email });

            if (response?.data?.message === "Done") {
                setErrorMessage('Please check your email');
            }
            else {
                navigate('/login');
            }
        } catch (error) {
            setErrorMessage("Hmm... Looks like something isn't right. Care to try again later?");
        }
    };
   return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800">Haha... Looks like someone forgot their password</h2>

            {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Enter registered email</label>
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
                    
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Send reset mail
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;