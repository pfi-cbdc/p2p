import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white px-8 py-10 pt-[5vw]">
      <div className="w-full  mx-auto grid grid-cols-1 md:grid-cols-3 gap-8  mr-[5vw]">
        {/* Logo and Description */}
        <div>
          <h3 className="text-[1.5vw] text-blue-600 font-semibold mb-2">Per Annum</h3>
          <p className="text-[1vw] text-white">
            Per Annum is building India's largest platform for alternate <br /> and fixed income investments, unlocking a large basket of <br /> investment products previously unavailable to the Indian <br /> retail investor.
          </p>
          <div className="flex mt-4 space-x-4">
          {/* eslint-disable-next-line */}
            <a className="text-gray-500 hover:text-blue-600">
              <FontAwesomeIcon icon={faFacebook} className="text-[1.5vw]" />
            </a>
          {/* eslint-disable-next-line */}
            <a className="text-gray-500 hover:text-blue-600">
              <FontAwesomeIcon icon={faInstagram} className="text-[1.5vw]" />
            </a>
          {/* eslint-disable-next-line */}
            <a className="text-gray-500 hover:text-blue-600">
              <FontAwesomeIcon icon={faLinkedin} className="text-[1.5vw]" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-[1.5vw] text-blue-600 font-semibold mb-2">Navigation</h3>
          <ul className="space-y-2">
          {/* eslint-disable-next-line */}
            <li><a className="text-[1vw] text-white hover:text-blue-600">About us</a></li>
          {/* eslint-disable-next-line */}
            <li><a className="text-[1vw] text-white hover:text-blue-600">Blogs</a></li>
          {/* eslint-disable-next-line */}
            <li><a className="text-[1vw] text-white hover:text-blue-600">FAQs</a></li>
          {/* eslint-disable-next-line */}
            <li><a className="text-[1vw] text-white hover:text-blue-600">How it works</a></li>
          </ul>
        </div>

        {/* Contact and Legal Info */}
        <div>
          <h3 className="text-[1.5vw] text-blue-600 font-semibold mb-2">Contact</h3>
          <p className="text-[1vw] text-white">+91 8448693369</p>
          <p className="text-[1vw] text-white">support@perannum.money</p>
          <p className="text-[1vw] text-white">
            7A, 2nd Floor, Vikram Vihar, Ring Road, Lajpat Nagar - 4, New Delhi - 110024, India
          </p>
          </div>
          <div>
          <div className="mt-[3vw]">
            <h3 className="text-[1.5vw] text-blue-600 mt-[1vw] font-semibold mb-2">Licence</h3>
            {/* eslint-disable-next-line */}
            <a className="text-[1vw] text-white hover:text-blue-600">Privacy Policy</a><br />
            {/* eslint-disable-next-line */}
            <a className="text-[1vw] text-white hover:text-blue-600">Terms of use</a>
          </div>
          </div>
        </div>

      {/* Disclaimer */}
      <div className="w-full mx-auto text-[0.9vw] text-white mt-[5vw] border-t border-gray-200 m;-[0.5vw]">
        <p className="">
          RBI does not guarantee any returns or principal for the amount invested on the P2P platform*<br/><br />
          Per Annum, a brand of Transactree Services Private Limited is a distributor for RBI Registered Non-Banking Financial Company (NBFC-P2P) under COR number N.14-03462.
        </p>
        <p className="mt-[2vw] ">
          We function as a Peer-to-Peer (P2P) Lending Platform, strictly adhering to the guidelines set forth by the Reserve Bank of India (RBI). In accordance with a recent significant decision by the RBI, the aggregate P2P exposure limit for lenders has been increased from ₹10 lakhs to ₹50 lakhs. Users are encouraged to carefully review all terms, conditions, and risks associated with lending on our platform. Per Annum does not guarantee any specific returns, and all investments involve inherent risks. Past performance is not indicative of future results.
        </p>
        <p className="mt-[1vws]">
          By using our platform, users acknowledge and agree to comply with all applicable laws and regulations. Per Annum reserves the right to modify platform features, terms, and conditions without prior notice. Users are encouraged to regularly review our terms of service and stay informed about any updates.
        </p>
        <p className="mt-[2vw]">
          {/* eslint-disable-next-line */}
          Investing on the Per Annum platform is subject to risks. Please read all documents carefully before investing. If you have any questions or concerns, feel free to contact our customer support for assistance. Please also refer to the following link for detailed lenders T&Cs - <a href="#" className="underline text-blue-600">Terms and condition</a>.
        </p>
        <p className="mt-[1vw] mb-[5vw]">
          Note: All information provided here is as of the last update and is subject to change based on regulatory developments or internal policy adjustments.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
