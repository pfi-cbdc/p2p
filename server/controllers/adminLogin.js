const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const { generateOtp } = require('../utils/otpGenerator');
const { transporter, sendOtpToMail } = require("../utils/emailService");

const date = new Date();
const OTP_EXPIRE_TIME = 300000;

exports.loginAdmin = async (req, res) => {
    try {
        const {email, password, key} = req.body;
    
        // Check the admin
        const admin = await Admin.findOne({email});
        if(!admin) {
            return res.status(400).json({ message: "Invalid Email" });
        } else { console.log('Admin found')}
        
        // Check the key
        const secretKey = `${date.getDate()}${date.getFullYear()}${date.getMonth()+1}`;
        if(!(key === secretKey)) {
            return res.status(400).json({ message: "Invalid Key" });
        } else { console.log('key verified')}
    
        // check the password
        const passAuth = await bcrypt.compare(password, admin.password);
        if(!passAuth) {
            return res.status(400).json({ message: "Invalid Password" });
        } else { console.log('Password verified')}
    
        // generate and send OTP
        const otp = generateOtp();
        const expiration = Date.now() + OTP_EXPIRE_TIME;

        // Create a temprory session
        tempAdmin = {
            adminID: admin._id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            otp: otp,
            otpVerified: false,
            otpExpiration: expiration
        }
        req.session.tempAdmin = tempAdmin;

        sendOtpToMail(email, otp);

        return res.status(200).json({
            message: "Admin Logged in.",
            admin: {
                firstName: admin.firstName,
                email: admin.email,
                otp: otp,
                tempadmin: tempAdmin
            }
        });
    } catch(err) {
        req.session.admin = null;
        return res.json({message: `${err}`});
    }
}

exports.verifyOTP = async (req, res) => {
    const adminSession = req.session.tempAdmin;
    const { otp } = req.body;
    try {
        const tempAdmin = adminSession;
        if(!tempAdmin) {
            return res.status(400).json({ message: "No admin session found"});
        }

        if(tempAdmin.otp === otp && Date.now() <= tempAdmin.otpExpiration) {
            req.session.admin = {
                id: tempAdmin.adminID,
                firstName: tempAdmin.firstName,
                lastName: tempAdmin.lastName,
                email: tempAdmin.email,
                otpVerified: true
            }
            return res.json({
                message: "Done verification",
                admin: {
                    firstName: tempAdmin.firstName,
                    email: tempAdmin.email
                }
            });
        }

        res.json({message: 'Something went wrong'});
    } catch(err) {
        res.status(400).json({message: `${err}`});
    }

}

exports.logoutAdmin = async (req, res) => {
    try {
        if (req.session.admin) {
            // req.session.destroy((err) => {
            //   if (err) {
            //     console.error("Error destroying session:", err.message);
            //     return res.status(500).json({ error: "Error logging out" });
            //   }
            req.session = null;
            res.clearCookie();
            return res.status(200).json({ message: "Logged out successfully" });
            // });
          } else {
            return res.status(400).json({ message: "No admin is logged in" });
          }
    }
    catch(err) {
        return res.status(400).json({message: "Error logging out"});
    }
}

// exports.addAdmin = async (req, res) => {
//     const body = req.body;
//     const newPass = await bcrypt.hash(req.body.password, 10);
//     const newAdmin = new Admin({firstName: body.firstName, lastName: body.lastName, email: body.email, password: newPass});
//     await newAdmin.save();
//     return res.json({message: "Saved"});
// }