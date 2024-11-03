const express = require('express');
const router = express.Router();
const Investment = require('../models/Investment');



router.post('/', async(req, res) => {
    console.log(req.body); // Log the incoming data
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

module.exports = router;