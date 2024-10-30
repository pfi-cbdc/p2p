import React, { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api/auth",
  withCredentials: true,
});

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
      const response = await api.post("/register", formData);
      localStorage.setItem('firstName', formData.firstName);
      localStorage.setItem('email', formData.email);
      setMessage(response.data.message);
      
      // await api.post("/send-otp", { email: formData.email });
      setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error during registration");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/verify-otp", { otp });
      setMessage(response.data.message);
      if (response.status === 200) {
        window.location.href = "/role";
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error verifying OTP");
    }
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
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
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
