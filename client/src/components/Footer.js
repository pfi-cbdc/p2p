import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 px-8 py-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <h3 className="text-lg text-black font-semibold mb-2">Per Annum</h3>
          <p className="text-sm">
            Per Annum is building India's largest platform for alternate and fixed income investments, unlocking a large basket of investment products previously unavailable to the Indian retail investor.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-800">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-800">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-800">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg text-black font-semibold mb-2">Navigation</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-gray-800">About us</a></li>
            <li><a href="#" className="text-sm hover:text-gray-800">Blogs</a></li>
            <li><a href="#" className="text-sm hover:text-gray-800">FAQs</a></li>
            <li><a href="#" className="text-sm hover:text-gray-800">How it works</a></li>
          </ul>
        </div>

        {/* Contact and Legal Info */}
        <div>
          <h3 className="text-lg text-black font-semibold mb-2">Contact</h3>
          <p className="text-sm">+91 8448693369</p>
          <p className="text-sm">support@perannum.money</p>
          <p className="text-sm">
            7A, 2nd Floor, Vikram Vihar, Ring Road, Lajpat Nagar - 4, New Delhi - 110024, India
          </p>
          <div className="mt-4">
            <h3 className="text-lg text-black font-semibold mb-2">Licence</h3>
            <a href="#" className="text-sm hover:text-gray-800">Privacy Policy</a><br />
            <a href="#" className="text-sm hover:text-gray-800">Terms of use</a>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-screen-xl mx-auto text-xs text-gray-500 mt-10 border-t border-gray-200 pt-4">
        <p>
          RBI does not guarantee any returns or principal for the amount invested on the P2P platform*<br/>
          Per Annum, a brand of Transactree Services Private Limited is a distributor for RBI Registered Non-Banking Financial Company (NBFC-P2P) under COR number N.14-03462.
        </p>
        <p className="mt-2">
          We function as a Peer-to-Peer (P2P) Lending Platform, strictly adhering to the guidelines set forth by the Reserve Bank of India (RBI). In accordance with a recent significant decision by the RBI, the aggregate P2P exposure limit for lenders has been increased from ₹10 lakhs to ₹50 lakhs. Users are encouraged to carefully review all terms, conditions, and risks associated with lending on our platform. Per Annum does not guarantee any specific returns, and all investments involve inherent risks. Past performance is not indicative of future results.
        </p>
        <p className="mt-2">
          By using our platform, users acknowledge and agree to comply with all applicable laws and regulations. Per Annum reserves the right to modify platform features, terms, and conditions without prior notice. Users are encouraged to regularly review our terms of service and stay informed about any updates.
        </p>
        <p className="mt-2">
          Investing on the Per Annum platform is subject to risks. Please read all documents carefully before investing. If you have any questions or concerns, feel free to contact our customer support for assistance. Please also refer to the following link for detailed lenders T&Cs - <a href="#" className="underline text-blue-600">Terms and condition</a>.
        </p>
        <p className="mt-2">
          Note: All information provided here is as of the last update and is subject to change based on regulatory developments or internal policy adjustments.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
