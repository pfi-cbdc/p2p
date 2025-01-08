import React from 'react';

const Numbers = () => {
    return (
        <div className="flex flex-col items-center px-6 md:px-12 lg:px-20 space-y-8 text-blue-900 py-4">
            {/* Heading Section */}
            <div className="flex flex-col text-left w-full space-y-4">
                <h2 className="text-4xl text-left md:text-4xl font-bold leading-tight">
                    Our Numbers Justify Our Commitment
                </h2>
                <p className="text-sm md:text-xl text-gray-700 max-w-3xl">
                    Introducing India&apos;s next breakthrough investment product. Earn up to 12% in 
                    annual returns lending to India’s most creditworthy people. Benefit from our proven 
                    track record of stable returns and over 8 years of trust.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {[
                    { title: 'Monthly Deposits', value: '₹ --- Cr.' },
                    { title: 'Data', value: '₹ --- Cr.' },
                    { title: 'Active Investors', value: '---' },
                    { title: 'Data', value: '---' },
                ].map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white py-6 px-4 mx-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                        <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                        <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Numbers;
