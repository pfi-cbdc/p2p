// client/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Navbar = () => {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            await api.post('/api/auth/logout');
            localStorage.clear(); // Clear user info from local storage
            navigate('/'); // Redirect to homepage after logout
        } catch (error) {
            console.error('Logout error:', error);
            if (error.response && error.response.status === 400) {
                // Clear local storage if session is invalid
                localStorage.clear();
                navigate('/login');
            }
        }
    };
    

    // Check if user is logged in by checking local storage
    const isLoggedIn = localStorage.getItem('firstName') !== null;

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold text-red-600">PFI</Link>
                </div>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            <button className="text-red-600 hover:underline" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="text-blue-600 hover:underline" to="/register">Register</Link>
                            <Link className="text-blue-600 hover:underline" to="/login">Log In</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

