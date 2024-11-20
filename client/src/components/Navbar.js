// client/src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import "remixicon/fonts/remixicon.css";
import gsap from 'gsap';

const Navbar = () => {
    const navigate = useNavigate();

    // State to manage popup visibility
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    // Function to handle showing/hiding the popup
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    useEffect(() => {
        // Only animate if the popup is visible
        if (isPopupVisible) {
            gsap.from('.elem', {
                y: 400,
                opacity: 0,
                duration: 1.5,
                ease: 'power2.out',
                stagger: 0.2,
            });
        }
    }, [isPopupVisible]); // Re-run this effect only when `isPopupVisible` changes

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
        <nav className="bg-[#F3F4F6] px-4 shadow-md">
             <div className="container  flex justify-between items-center ">
                <div className="flex ml-[12vw] items-center">
                    <Link to="/" className="text-[2.2vw] font-bold text-blue-600">PFI</Link>
                </div>
                <div className="flex flex-end space-x-">
                    {isLoggedIn ? (
                        <button className="text-blue-600 font-semibold hover:underline" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <div className="flex ml-[55vw]  gap-[3vw]">
                            <Link className="text-gray-800 bg-[#E9EAEC] font-semibold text-[1.2vw] rounded-lg w-[5.5vw] h-[2.2vw] mt-[1vw] text-center hover:text-blue-600" to="/register">
                                Register
                            </Link>
                            <Link className="text-white bg-[#1C1C1C] font-semibold text-[1.2vw] rounded-lg w-[5.5vw] h-[2.3vw] mt-[1vw] text-center hover:text-blue-600" to="/login">
                                Log In
                            </Link>
                            <i
                                className="ri-menu-line text-[2vw] ml-[1.5vw] mt-[0.5vw] cursor-pointer"
                                onClick={togglePopup}
                            ></i>
                        </div> 
                    )}
                </div>
            </div> 
            {isPopupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#000000] w-full h-full text-white">
                        {/* Header with PFI link and Close button aligned horizontally */}
                        <div className="flex items-center justify-between ">
                            <Link to="/" className="text-[2.2vw] font-bold ml-[12vw] mt-[-0.2vw] text-blue-600">PFI</Link>
                            <button 
                                onClick={togglePopup} 
                                className="h-[7vw] w-[7vw] text-[4vw] mr-[6vw] mt-[-0.2vw] text-gray-700"
                            >
                                &times;
                            </button>
                        </div>
                        
                        {/* Content below the header */}
                        <div className="text pt-[1vw] ml-[8.8vw]">
                            <h1 className="elem text-[2vw] font-semibold mt-[2vw] w-[20vw] h-[5vw] border-b-2 border-white ">ABOUT US</h1>
                            <h1 className="elem text-[2vw] font-semibold mt-[2vw] w-[20vw] h-[5vw] border-b-2 border-white ">GROW YOUR MONEY</h1>
                            <h1 className="elem text-[2vw] font-semibold mt-[2vw] w-[20vw] h-[5.3vw] border-b-2 border-white ">GROW YOUR BUSINESS</h1>
                            <h1 className="elem text-[2vw] font-semibold mt-[2vw] w-[20vw] h-[5vw] border-b-2 border-white ">OUR SERVICES</h1>
                            
                            <h1 className="elem text-[2vw] font-semibold mt-[2vw] w-[20vw] h-[5vw] border-b-2 border-white ">CONTACT US</h1>
                        </div> 
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
