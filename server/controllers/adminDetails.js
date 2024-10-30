const User = require("../models/User");
const Lender = require("../models/Lender");
const Borrower = require("../models/Borrower");
const Admin = require("../models/Admin");

exports.getDetails = async (req, res) => {
    try {
        let response = {
            users: [],
            lenders: [],
            borrowers: [],
            demousers: []
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

exports.isAdmin = async (req, res) => {
    try {
        const adminSession = req.session.admin;
        const currentAdmin = adminSession;
        const email = currentAdmin.email;
        if(!email) {
            return res.status(400).json({message: "something went wrong"});
        }

        const admin = Admin.findOne({email: email});
        if(!admin) {
            return res.status(400).json({message: 'Something is really wrong with you'});
        }

        return res.status(200).json({message: "All ok. You're Good to go"});
    } catch(e) {
        return res.status(400).json({message: `${e}`});
    }
}