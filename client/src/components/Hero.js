import React, { useState, useEffect } from 'react';

const HeroSection = () => {
    const words = ["Wealth creation", "Returns", "Passive Income"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2000);

        return () => clearInterval(intervalId);
    }, [words.length]);

    return (
        <div className="relative w-[80vw] h-screen ml-[10vw] bg-center">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-repeat bg-center opacity-20"
                style={{ backgroundImage: `url('bg1.jpg')` }}
            ></div>

            {/* Content */}
            <div className="relative w-[30vw] ml-[25vw]  pt-[10vw] mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 z-10">
                <div className="space-y-6">
                    <h1 className="text-[3.7vw] text-black font-bold leading-tight">
                        Invest your <br /> money for stable <br />
                        <span className="text-blue-600">{words[currentWordIndex]}</span>
                    </h1>
                    <p className="text-[1.2vw] pt-[2vw] text-gray-700">
                        Join 4,52,175+ active investors who generate up to <br /> 12% Per Annum.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
