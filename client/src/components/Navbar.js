// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="flex items-center">
                    <div className="text-2xl font-bold text-red-600">PFI</div>
                </div>
                <div className="flex space-x-4">
                    <Link className="text-blue-600 hover:underline" to="/register">Register</Link>
                    <Link className="text-blue-600 hover:underline" to="/login">Log In</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
