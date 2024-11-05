import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api/axios";
import { useNavigate } from 'react-router-dom';

const ResetMailPassword = () => {
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [showRePassword, setShowRePassword] = useState(true);
    const navigate = useNavigate();

    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);
    const token = queryParams.get('token');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRePasswordVisibility = () => {
        setShowRePassword(!showRePassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Set loading state

        try {
            if (password !== repassword) {
                setErrorMessage('Both passwords must match.');
                setLoading(false);
                return;
            }

            const response = await api.get(`/api/reset/check-token?token=${token}`);
            if (response?.data?.isValid) {
                const res = await api.post(`/api/reset/password-update?token=${token}`, { password, repassword });
                if (res.status === 200) {
                    navigate('/login');
                } else {
                    setErrorMessage(res?.data?.message || 'An error occurred. Please try again.');
                }
            } else {
                setErrorMessage(response?.data?.message || 'Invalid token. Please try again.');
            }
        } catch (err) {
            setErrorMessage('Something went wrong. Please try again later.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Refill your details and DO NOT forget this time.</h2>
                {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div className='relative'>
                        <label htmlFor="repassword" className="block text-lg font-medium text-gray-700">Retype Password</label>
                        <input
                            type={showRePassword ? "password" : "text"}
                            id="repassword"
                            value={repassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleRePasswordVisibility}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                        >
                            {showRePassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 font-semibold text-white ${loading ? 'bg-gray-400' : 'bg-blue-500'} rounded hover:bg-blue-600 focus:outline-none`}
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset NOW!'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetMailPassword;
