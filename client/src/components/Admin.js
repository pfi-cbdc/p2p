import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for routing
import api from '../api/axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [key, setKey] = useState('');
    const [otp, setOtp] = useState('');
    const [sendOtp, setSendOtp] = useState(false);
    const [buttonState, setButtonState] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setButtonState(true);
            const response = await api.post('/api/admin/login', {
                email,
                password,
                key
            });
            setButtonState(false);
            if(response.status === 200) {
                setSendOtp(true);
            } else {
                navigate('/admin-pfi-2406');
            }
        } catch (error) {
            // handle error
            setButtonState(false);
            navigate('/admin-pfi-2406');
        }
    }
    const handleOTPVerification = async (e) => {
        e.preventDefault();
        try {
            setButtonState(true);
            const otpResponse = await api.post('/api/admin/verify-otp', {
                otp
            });
            setButtonState(false);
            // Ensure the response includes the admin's first name
            if (otpResponse.data.admin && otpResponse.data.admin.firstName) {
                alert(otpResponse.data.message);
            } else {
                // handle error
                navigate('/admin-pfi-2406');
            }
            navigate('/admin-pfi-2406/dashboard'); // Redirect to the dashboard after login
        } catch (err) {
            // handle error
            setButtonState(false);
            navigate('/admin-pfi-2406');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

            {!sendOtp ? (
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
                    <div className="mb-4">
                        <label htmlFor="Secret Key" className="block text-sm font-medium text-gray-700">Secret Key</label>
                        <input
                            type="password"
                            id="secret"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        disabled={buttonState}
                    >
                        Send OTP
                    </button>
                </form>

            ) : (
                <form onSubmit={handleOTPVerification}>
                    <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">One Time Password</label>
                            <input
                                type="password"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                            disabled={buttonState}
                        >
                            Verify and LOGIN!
                        </button>
                </form>
            )}
        </div>
    );
};

export default AdminLogin;