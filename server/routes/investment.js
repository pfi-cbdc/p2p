const express = require('express');
const router = express.Router();
const Investment = require('../models/Investment');
const User = require('../models/User');
const Lender = require('../models/Lender');
const { sendInvestmentStatusEmail } = require('../utils/emailService');

router.post('/', async(req, res) => {
    // console.log(req.body); // Log the incoming data
    try {
        const user = await User.findOne({ email: req.body.email });
        const lender = await Lender.findOne({ userID: user._id });
        const newInvestment = new Investment({
            amount: req.body.amount,
            tenure: req.body.tenure,
            monthlyEarnings: req.body.monthlyEarnings,
            lenderID: lender._id
            // firstName: req.body.firstName,
            // email: req.body.email
        });

        await newInvestment.save();
        res.status(201).json({ message: 'Investment Submitted'});
    } catch (error) {
        console.error('Error creating investment:', error);
        res.status(400).json({ message: 'Error creating investment', error });
    }
});

router.get('/all', async (req, res) => {
    try {
        const investments = await Investment.find();
        const lenders = await Lender.find();
        const users = await User.find();

        const investmentsWithUserDetails = investments.map(investment => {
            const lender = lenders.find(lender => lender._id.equals(investment.lenderID));
            const user = lender ? users.find(user => user._id.equals(lender.userID)) : null;
            return {
                ...investment.toObject(),
                firstName: user ? user.firstName : '---',
                email: user ? user.email : '---'
            };
        });

        return res.status(200).json(investmentsWithUserDetails);
    } catch (error) {
        console.error('Error fetching investments:', error);
        res.status(400).json({ message: 'Error fetching investments', error });
    }
});

router.put('/update', async (req, res) => {
    const {id, stat, email, firstName} = req.body;
    //console.log(id);
    //console.log(stat);
    const investment = await Investment.findByIdAndUpdate(id, { $set: { verified: Number(stat) } });
    if (!investment) {
        return res.status(400).json({ message: "Error during update" });
    }
    const lender = await Lender.findById(investment.lenderID);
    const user = await User.findById(lender.userID);
    await sendInvestmentStatusEmail(user.email, user.firstName, stat); 

    return res.status(200).json({message: "All set!"});
});

module.exports = router;