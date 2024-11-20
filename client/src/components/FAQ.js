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
        <div className='h-[45vw] w-full pt-[2vw] bg-[#000000] text-white'>
            <h1 className="text-[2.2vw] font-bold text-blue-500 mb-8 text-center">Frequently Asked Questions</h1>
            <div className='flex'>
            <div className="left h-[45vw] w-[60vw] ml-[3vw]">
            <div className="md:w-[60vw] space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-300 pb-4 pt-[3.2vw]">
                            <div 
                                onClick={() => toggleFAQ(index)} 
                                className="flex justify-between items-center cursor-pointer text-left"
                            >
                                <h3 className="text-[1.5vw] ">{faq.question}</h3>
                                <span className="text-[2vw]">{activeIndex === index ? '-' : '+'}</span>
                            </div>
                            {activeIndex === index && <p className="mt-2 text-[1.5vw] pt-[1vw] text-white">{faq.answer}</p>}
                        </div>
                    ))}
                </div>
            </div>
            <div className="right h-[45vw] w-[40vw]">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="bg-[#000000] p-6 rounded-lg text-left ml-[3vw] mt-[3.5vw]">
                    <p className="text-[2vw] font-semibold  mb-2">Want to learn <br /> more?</p>
                    <p className="text-white font-smibold mb-4 text-[1.5vw] pt-[1.5vw]">Connect with us now! Our support team will help you within 2 hours.</p>
                    <div className="space-y-2">
                        <div className="contact flex flex-col gap-[1vw] mt-[2vw] ">
                        <button className="w-[13vw] h-[2.9vw] px-4 py-2 bg-blue-500 text-white text-[1vw] rounded-[1.5vw] font-bold shadow">WhatsApp Us</button>
                        <button className="w-[13vw] h-[2.9vw] px-4 py-2 bg-blue-500 text-white text-[1vw] rounded-[1.5vw] font-bold shadow">Email Us</button>
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>
            </div>     
        </div>

    );
};

export default FAQ;
