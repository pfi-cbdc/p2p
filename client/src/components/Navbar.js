// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">YourLogo</div>
            <ul className="nav-links">
                <li><Link to="#services">Our Services</Link></li>
                <li><Link to="#partners">Our Partners</Link></li>
                <li><Link to="/lender">Lender</Link></li>
                <li><Link to="/borrower">Borrower</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
