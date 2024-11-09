import React, { useState, useEffect } from 'react';

const HeroSection = () => {
    const words = ["Wealth creation", "Returns", "Passive Income"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 1000); // Change word every 2 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [words.length]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100">
            {/* Left Section - Heading and Subheading */}
            <div className="md:w-1/2 space-y-4 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
                    Invest your money for stable{" "}
                    <span className="text-green-600 transition-colors duration-500">
                        {words[currentWordIndex]}
                    </span>
                </h1>
                <p className="text-lg text-gray-600">
                    Join 4,52,175+ active investors who generate up to 12% Per Annum
                </p>
            </div>

            {/* Right Section - Signup Form */}
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md mt-8 md:mt-0">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign up to start investing</h2>
                <p className="text-gray-500 mb-4">Welcome to Per Annum</p>
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter name (as on PAN)"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <input
                        type="email"
                        placeholder="Enter email id"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                    >
                        Get started
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HeroSection;
