const Investments = require("../models/Investments")
const z = require("zod");
const Lender = require("../models/Lender");

const addInvestsSchema = z.object({
    amount: z.number(),
    tenure: z.number(),
    monthlyEarnings: z.string(),
    email: z.string()
});

// authMiddleware adds id of the lender from the cookie to req.lenderID
const addInvestments = async (req, res) => {
    try {
        const body = req.body;
        const { success } = addInvestsSchema.safeParse(body);
        if(!success) {
            throw("Invalid entries");
        }
        const emailCheck = await Lender.findOne({email: body.email});
        if(!emailCheck) {
            return res.status(400).json({message: 'There is something very wrong!'});
        }

        const newInv = new Investments({amount: body.amount, tenure: body.tenure, monthlyEarnings: body.monthlyEarnings, lenderID: emailCheck._id});
        await newInv.save();
        return res.status(200).json({
            message: "New Investment Recorded",
            investment: newInv
        });
    } catch(e) {
        res.status(401).json({
            message: `Error occured in adding investments to database ${e}`
        })
    }
}

module.exports = addInvestments;
