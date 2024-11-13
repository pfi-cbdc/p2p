// client/src/components/Home.js
import React from 'react';
import FAQ from './FAQ';
// import PointImage from './Point_image';
import Hero from './Hero';
import Footer from './Footer';

const Home = () => {
    return (
        <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 space-y-12 bg-gray-100 text-gray-900">
            {/* Hero Section */}
            <div className="w-full max-w-6xl">
                <Hero />
            </div>

            {/* Point Image Section */}
            {/* <div className="w-full max-w-6xl">
                <PointImage />
            </div> */}

            {/* FAQ Section */}
            <div className="w-full max-w-6xl">
                <FAQ />
            </div>

            {/* Footer Section */}
            <div className="w-full max-w-6xl">
                <Footer />
            </div>
        </div>
    );
};

export default Home;
