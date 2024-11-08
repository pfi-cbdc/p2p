import React, { useState } from "react";
import api from "../api/axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const api = axios.create({
//   baseURL: "http://localhost:5001/api/auth",
//   withCredentials: true,
// });

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true); // Password eye

  //Regex Implementation email and phone number
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (otpSent) return;
    try {
      const response = await api.post("/api/auth/register", formData);
      setMessage(response.data.message);
      if(response.status !== 200 && response.status !== 400) {
        await api.post("/api/auth/send-otp", { email: formData.email });
      }
      setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error during registration");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/verify-otp", { otp });
      setMessage(response.data.message);
      if (response.status === 200) {
        localStorage.setItem('firstName', formData.firstName);
        localStorage.setItem('email', formData.email);
        window.location.href = "/role";
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error verifying OTP");
    }
  };
  
  // Eye Button handler on password box
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFCFC][">
      <div className="left h-screen w-[40vw] ">
      <div className="element bg-[#F1EFEC] h-[45vw] w-[35vw] ml-[2vw] mt-[1.3vw] rounded-[3vw]">
      </div>
      </div>
      <div className="right h-screen w-[60vw]  ">
      <div className="w-[30vw] h-[34vw]  ml-[16vw] mt-[7vw] p-8 space-y-6 text-black rounded-[2.5vw]">
        <h2 className="text-[3vw] font-bold text-center text-black ml-[-17vw]">Register</h2>
        <hr className="w-[25.5vw] h-[0.15vw] bg-[##949494]" />
        
        {message && <p className="text-center text-red-500">{message}</p>}

        {!otpSent ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-[1vw] mt-[1.5vw]  font-medium text-black">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-[25.5vw] px-4 py-2 border border-gray-300 text-black text-[0.7vw] pt-[0.4vw] pb-[0.4vw] bg-[#F4F4F4] rounded-[0.8vw] focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-[1vw] mt-[1vw] font-medium text-black">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-[25.5vw] px-4 py-2 border border-gray-300 text-black text-[0.7vw] bg-[#F4F4F4] pt-[0.4vw] pb-[0.4vw] rounded-[0.8vw] focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-[1vw] mt-[1vw] font-medium text-black">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                  setIsPhoneValid(phoneRegex.test(value));
                }}
                className="w-[25.5vw] px-4 py-2 border border-gray-300 text-black text-[0.7vw] pt-[0.4vw] pb-[0.4vw] bg-[#F4F4F4] rounded-[0.8vw] focus:outline-none focus:border-blue-500"
                required
              />
              {!isPhoneValid && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid Indian phone number.</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-[1vw] mt-[1vw] font-medium text-black">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                  setIsEmailValid(emailRegex.test(e.target.value));
                }}
                className="w-[25.5vw] px-4 py-2 border border-gray-300 text-black text-[0.7vw] pt-[0.4vw] pb-[0.4vw] bg-[#F4F4F4] rounded-[0.8vw] focus:outline-none focus:border-blue-500"
                required
              />
              {!isEmailValid && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-[1vw] mt-[1vw] font-medium text-black">Password</label>
              <input
                type={showPassword ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-[25.5vw] px-4 py-2 border border-gray-300 text-black text-[0.7vw] pt-[0.4vw] pb-[0.4vw] bg-[#F4F4F4] rounded-[0.8vw] focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-[2.5vw] right-[3.5vw] transform text-[0.9vw] -translate-y-1/2 text-gray-500"
              >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-[25.5vw] px-4 py-2  pt-[0.5vw] pb-[0.5vw]  font-semibold text-[1vw]  text-black bg-[#03D771] rounded-[2vw] hover:bg-blue-600 focus:outline-none"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-lg font-medium text-gray-700">Enter OTP</label>
              <input
                type="text"
                name="otp"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
            >
              Verify OTP
            </button>
          </form>
        )}

        <p className="text-center text-black pt-[1.5vw] text-[1vw]">
          Already have an account? 
          <a href="/login" className="text-blue-500 hover:underline"> Login here</a>
        </p>
      </div>
      </div>
      
    </div>
  );
};

export default Registration;
