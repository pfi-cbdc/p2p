const User = require("../models/User");
const Lender = require("../models/Lender");
const Borrower = require("../models/Borrower");

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