// client/src/components/Home.js
import React from 'react';
import FAQ from './FAQ';
import PointImage from './Point_image';
import Hero from './Hero';

import Footer from './Footer';
const Home = () => {
    return (
        <div>
            <Hero/>
           <FAQ/>
           <Point_image/>
           <Footer/>
        </div>
    );
};

export default Home;
