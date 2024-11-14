import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        { question: "What is PFi?", answer: "PFi is a decentralized peer-to-peer (P2P) lending and borrowing platform using blockchain and CBDC (e-RUPI). It connects lenders and borrowers directly, automating transactions through smart contracts for faster, secure, and transparent lending." },
        { question: "How does PFi ensure security?", answer: "PFi uses Hyperledger-based blockchain and smart contracts to secure transactions. Escrow services, digital payments via e-RUPI, and a decentralized reputation system create trust between lenders and borrowers." },
        { question: "What are the benefits of PFi?", answer: "PFi offers lower fees, faster processing, and broader access to lending without intermediaries. With blockchain and CBDC integration, it ensures transparency, security, and greater financial inclusion." },
        { question: "How does PFi reduce loan defaults?", answer: "PFi uses smart contracts, automated payments, and risk assessment to enforce loan terms, reducing defaults and Non-Performing Assets (NPAs) through secure and transparent processes." }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-0">
            <h1 className="text-3xl font-bold text-blue-500 mb-8 text-center">Frequently Asked Questions</h1>
            <div className="flex flex-col md:flex-row gap-8">
                {/* FAQ Section */}
                <div className="md:w-2/3 space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-300 pb-4">
                            <div 
                                onClick={() => toggleFAQ(index)} 
                                className="flex justify-between items-center cursor-pointer text-left"
                            >
                                <h3 className="text-lg font-medium">{faq.question}</h3>
                                <span className="text-xl">{activeIndex === index ? '-' : '+'}</span>
                            </div>
                            {activeIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg text-left">
                    <p className="text-lg font-medium mb-2">Want to learn more?</p>
                    <p className="text-gray-700 mb-4">Connect with us now! Our support team will help you within 2 hours.</p>
                    <div className="space-y-2">
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow">WhatsApp Us</button>
                        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow">Email Us</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
