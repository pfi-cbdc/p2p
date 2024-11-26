// client/src/components/Home.js
import React from 'react';
import FAQ from './FAQ';
// import PointImage from './Point_image';
import Hero from './Hero';
// import Footer from './Footer';
import BorrowerFrame from './BorrowerFrame';
import Funding from './Funding';

const Home = () => {
    return (
        <div className="flex flex-col  items-center  bg-gray-100 text-gray-900">
            {/* Hero Section */}
            <div className="w-full ">
                <Hero />
            </div>

            <div className="w-full ">
                <BorrowerFrame />
            </div>

            <div className="w-full ">
                <Funding />
            </div>


            {/* FAQ Section */}
            <div className="w-full ">
                <FAQ />
            </div>

            {/* Footer Section */}
            {/* <div className="w-full ">
                <Footer />
            </div> */}
        </div>
    );
};

export default Home;
