// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="text-white text-lg font-bold">YourLogo</div>
            <ul className="flex space-x-4">
                <li><Link className="text-red-300 hover:text-white" to="#services">Our Services</Link></li>
                <li><Link className="text-gray-300 hover:text-white" to="#partners">Our Partners</Link></li>
                <li><Link className="text-gray-300 hover:text-white" to="/lender">Lender</Link></li>
                <li><Link className="text-gray-300 hover:text-white" to="/borrower">Borrower</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;