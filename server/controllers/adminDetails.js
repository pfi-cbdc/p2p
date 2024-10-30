const User = require("../models/User");
const Lender = require("../models/Lender");
const Borrower = require("../models/Borrower");
const Admin = require("../models/Admin");

exports.getDetails = async (req, res) => {
    const adminSession = req.session.admin;
    try {
        let response = {
            users: [],
            lenders: [],
            borrowers: [],
            demousers: [],
            adminName: adminSession.firstName
        }
        const users = await User.find({});
        response = {...response, users: users};
        const lenders = await Lender.find({});
        response = {...response, lenders: lenders};
        const borrowers = await Borrower.find({});
        response = {...response, borrowers: borrowers};
        
        res.status(200).json(response);
    }
    catch(err) {
        return res.status(400).json({message: `${err}`});
    }
}

exports.checkUser = async (req, res) => {
    try {
        const userSession = req.session.user;
        const currentUser = userSession;
        if(!currentUser) {
            return res.status(400).json({message: "user not present"});
        }
        const userEmail = currentUser.email;
        if(!userEmail) {
            return res.status(400).json({message: 'Not Found!'});
        }
        const response = await Admin.findOne({email: userEmail});
        if(!response) {
            return res.status(400).json({message: "Unauthorized"});
        }
        return res.status(200).json({message: 'Authorized'});
    } catch(err) {
        return res.status(400).json({message: `${err}`});
    }
}