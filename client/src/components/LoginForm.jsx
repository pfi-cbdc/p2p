import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const navigate = useNavigate();
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="page1 min-h-screen flex items-center bg-[#FCFCFC]">
            <div className="left h-screen w-[40vw]">
                <div className="element bg-[#F1EFEC] h-[45vw] w-[35vw] ml-[4vw] mt-[1.3vw] rounded-[3vw]">
                    
                </div>
            </div>

            <div className="right h-screen w-[60vw] flex items-center justify-center">
                <div className="w-[28vw] h-[32vw] ml-[-2vw] mt-[-3vw] p-8 space-y-6 text-black rounded-[2.5vw]">
                    <h2 className="text-[3vw] font-bold ml-[-18.3vw] text-center text-black">Login</h2>
                    <hr className="w-[26vw] h-[0.1vw] bg-[##949494]" />

                    {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-[1vw] mt-[1vw] font-medium text-black">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setIsEmailValid(emailRegex.test(e.target.value));
                                }}
                                className="w-full px-4 py-2 border border-gray-300 text-black text-[0.7vw] bg-[#F4F4F4] rounded-[0.8vw] pt-[0.5vw] pb-[0.5vw] focus:outline-none mt-[0.5vw] focus:border-blue-500"
                                required
                            />
                            {!isEmailValid && (
                                <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
                            )}
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="block text-[1vw] font-medium mt-[1vw] text-black">Password</label>
                            <input
                                type={showPassword ? "password" : "text"}
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 pr-10 border border-gray-300 mt-[0.5vw] text-[0.7vw] bg-[#F4F4F4] rounded-[0.8vw] pt-[0.5vw] pb-[0.5vw] focus:outline-none focus:border-blue-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-[3.1vw] right-[1vw] transform text-[0.9vw] -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-[25vw] ml-[0.5vw] px-4 mt-[2vw] pt-[0.5vw] pb-[0.5vw] font-semibold text-[1vw] text-black bg-[#03D771] rounded-[2vw] hover:bg-blue-600 focus:outline-none"
                            >
                                Log In
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-black pt-[1.5vw] text-[1vw]">
                        Don’t have an account?
                        <a href="/register" className="text-blue-500 hover:underline"> Register here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
