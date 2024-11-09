import React, { useState } from 'react';
import img1 from '../img1.webp';
import img2 from '../img2.webp';
import img3 from '../img3.webp';
import img4 from '../img4.webp';

const PointImage = () => {
    const [selectedPoint, setSelectedPoint] = useState(0);

    const points = [
        { label: "Earn High Returns", image: img1 },
        { label: "Non - Market Linked Assets", image: img2 },
        { label: "Accomplish All Your Goals", image: img3 },
        { label: "Start Investing With Ease", image: img4 },
    ];

    return (
        <div className=" flex flex-col md:flex-row items-start justify-center md:space-x-8 p-6">
            {/* Left Section - Heading and Buttons */}
            <div className="md:w-1/3 text-center md:text-left mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-6">
                    Access products previously off-limits to Indian retail investors
                </h2>
                <div className="space-y-3">
                    {points.map((point, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedPoint(index)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition font-semibold ${
                                selectedPoint === index
                                    ? 'bg-green-500 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                        >
                            {point.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Section - Introductory Text and Dynamic Image */}
            <div className="md:w-2/3 space-y-6">
                {/* Introductory Text */}
                <p className="text-lg font-medium">
                    Per Annum is building India’s largest platform for alternate and fixed income investments, unlocking a large basket of investment products previously unavailable to the Indian retail investor.
                </p>
                
                {/* Dynamic Image */}
                <div className="flex justify-center">
                    <img
                        src={points[selectedPoint].image}
                        alt={points[selectedPoint].label}
                        className="w-full max-w-lg rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default PointImage;
