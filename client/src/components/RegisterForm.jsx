// src/pages/Registration.js
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
    try {
      const response = await api.post("/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });
      // Store the user's first name in localStorage
      localStorage.setItem('firstName', formData.firstName);
      setMessage(response.data.message);
      
      // Send verification email
      await api.post("/send-otp", { email: formData.email });
      setOtpSent(true); // Indicate that the OTP has been sent
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
        // Redirect to the role page after successful verification
        window.location.href = "/role";
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error verifying OTP");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}

      {!otpSent ? (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {/* Link to Login Page */}
      <p>
            Already have an account? 
            <a href="/login" className="text-blue-500 hover:underline"> Login here</a>
        </p>

    </div>
  );
};

export default Registration;
