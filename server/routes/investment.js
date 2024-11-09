const express = require('express');
const router = express.Router();
const Investment = require('../models/Investment');
const { sendInvestmentStatusEmail } = require('../utils/emailService');

router.post('/', async(req, res) => {
    // console.log(req.body); // Log the incoming data
    try {
        const newInvestment = new Investment({
            amount: req.body.amount,
            tenure: req.body.tenure,
            monthlyEarnings: req.body.monthlyEarnings,
            firstName: req.body.firstName,
            email: req.body.email
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
        res.status(200).json(investments);
    } catch (error) {
        console.error('Error fetching investments:', error);
        res.status(400).json({ message: 'Error fetching investments', error });
    }
});

router.put('/update', async (req, res) => {
    const {id, stat} = req.body;
    //console.log(id);
    //console.log(stat);
    const invoice = await Investment.findByIdAndUpdate(id, {$set: {verified: Number(stat)}});
    if(!invoice) {
        return res.status(400).json({message: "Error during update"});
    }

    const investment = await Investment.findByIdAndUpdate(id, { $set: { verified: Number(stat) } });
    if (!investment) {
        return res.status(400).json({ message: "Error during update" });
    }

    await sendInvestmentStatusEmail(investment.email, investment.firstName, stat); 

    return res.status(200).json({message: "All set!"});
});

module.exports = router;