exports.generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
};