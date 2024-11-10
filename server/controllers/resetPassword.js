const ResetPassword = require('../models/ResetPassword');
const User = require('../models/User');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { transporter } = require('../utils/emailService.js');
const url = `http://localhost:3000`; // devlopment

module.exports.resetPasswordHandler = async function (req, res) {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });
        console.log(user);
        if (user && user._id) {
            const token = crypto.randomBytes(20).toString("hex");
            const resetToken = new ResetPassword({
                user_id: user._id,
                token_id: token,
                createdOn: Date.now(),
            });
            await resetToken.save();
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Reset Password',
                text: `Subject: Password Reset Request

Hello Customer,

We received a request to reset the password for your account. If you requested this, please click the link below to reset your password:

Reset Password: ${url}/reset-password?token=${token}

If you didn’t request a password reset, you can safely ignore this email. Your password will remain unchanged.

Important: This link will expire in 24 hours for security reasons. If the link has expired, please request a new password reset.

If you need any assistance, feel free to contact our support team.

Best regards,
p-fi Support Team
`,
                html: `Subject: Password Reset Request

<html>
  <body>
    <p>Hello Customer,</p>
    <p>We received a request to reset the password for your account. If you requested this, please click the link below to reset your password:</p>
    <p><a href="${url}/reset-password?token=${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
    <p>If you didn’t request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
    <p><strong>Important:</strong> This link will expire in 24 hours for security reasons. If the link has expired, please request a new password reset.</p>
    <p>If you need any assistance, feel free to contact our support team.</p>
    <br>
    <p>Best regards,<br>p-fi Support Team</p>
  </body>
</html>
`

            });
            console.log('OTP sent to email');
        }
        else {
            console.log('No user');
            return res.status(400).json({ message: "No user" });
        }

        return res.status(200).json({message: "Done"});
    } catch (err) {
        return res.status(400).json({ message: `${err}` });
    }
}

module.exports.checkToken = async function (req, res) {
    try{
        const token = await req.query.token;
        const resetPasswordToken = await ResetPassword.findOne({ token_id: String(token) });
        let isValid = false;
    
        if (
            Date.now() - resetPasswordToken?.createdOn.getTime() <
            15 * 60 * 60 * 100
        ) {
            isValid = true;
        }
    
        if (req.method == "GET") {
            if (resetPasswordToken && isValid) {
                return res.status(200).json({
                    isValid: true,
                });
            }
    
            return res.status(200).json({
                isValid: false,
            });
        }
    } catch(err) {
        return res.status(400).json({message: `${err}`});
    }
};

module.exports.modifyPassword = async function (req, res) {
    const token = await req.query.token;
    const resetPasswordToken = await ResetPassword.findOne({ token_id: String(token) });

    if (resetPasswordToken) {
        if (req.body.password === req.body.repassword) {
            if (req.body.password) {
                let password = await bcrypt.hash(req.body.password, 10);
                //   console.log(password);
                await User.findByIdAndUpdate(resetPasswordToken.user_id, {
                    $set: { password: password },
                });
                await ResetPassword.deleteOne({
                    user_id: resetPasswordToken.user_id,
                });
                return res
                    .status(200).json({message: "done updating"});
            }
            else {
                return res.json({message: "Umm..."});
            }
        }
        else {
            return res
                .status(200).json({message: "some error"});
        }
    }
    return res.status(400);
};
