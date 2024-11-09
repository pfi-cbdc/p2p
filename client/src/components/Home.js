// client/src/components/Home.js
import React from 'react';
import FAQ from './FAQ';
import Point_image from './Point_image';
import Hero from './Hero';
const Home = () => {
    return (
        <div>
            <Hero/>
           <FAQ/>
           <Point_image/>
        </div>
    );
};

export default Home;
