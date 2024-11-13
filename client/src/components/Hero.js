import React, { useState, useEffect } from 'react';

const HeroSection = () => {
    const words = ["Wealth creation", "Returns", "Passive Income"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2000);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [words.length]);

    return (
        <div className="bg-gray-100 text-gray-900 py-16 px-6 md:px-20">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                <div className="text-center md:text-left space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Invest your money for stable{" "}
                        <span className="text-blue-600">{words[currentWordIndex]}</span>
                    </h1>
                    <p className="text-lg text-gray-600">
                        Join 4,52,175+ active investors who generate up to 12% Per Annum.
                    </p>
                </div>

                {/* Right Section - Signup Form */}
                {/* <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sign up to start investing</h2>
                    <p className="text-gray-600 mb-6">Welcome to Per Annum</p>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter name (as on PAN)"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-600"
                        />
                        <input
                            type="text"
                            placeholder="Enter phone number"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-600"
                        />
                        <input
                            type="email"
                            placeholder="Enter email id"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-600"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition"
                        >
                            Get started
                        </button>
                    </form>
                </div> */}
            </div>
        </div>
    );
};

export default HeroSection;
