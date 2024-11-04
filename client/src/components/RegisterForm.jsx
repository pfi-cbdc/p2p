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
      localStorage.setItem('firstName', formData.firstName);
      localStorage.setItem('email', formData.email);
      setMessage(response.data.message);
      
      await api.post("/api/auth/send-otp", { email: formData.email });
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        
        {message && <p className="text-center text-red-500">{message}</p>}

        {!otpSent ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-lg font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                  setIsPhoneValid(phoneRegex.test(value));
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
              {!isPhoneValid && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid Indian phone number.</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                  setIsEmailValid(emailRegex.test(e.target.value));
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
              {!isEmailValid && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? "password" : "text"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
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

        <p className="text-center text-gray-600">
          Already have an account? 
          <a href="/login" className="text-blue-500 hover:underline"> Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
