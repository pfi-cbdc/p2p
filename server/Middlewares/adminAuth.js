const Admin = require("../models/Admin");

exports.isAdmin = async (req, res, next) => {
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

        res.status(200).json({message: "All ok. You're Good to go"});
        next();
    } catch(e) {
        return res.status(400).json({message: `${e}`});
    }
}