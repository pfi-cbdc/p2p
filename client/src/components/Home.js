// client/src/components/Home.js
import React from 'react';
import FAQ from './FAQ';
import PointImage from './Point_image';
import Hero from './Hero';
const Home = () => {
    return (
        <div>
            <Hero/>
           <FAQ/>
           <PointImage/>
        </div>
    );
};

export default Home;
