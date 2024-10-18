const Investments = require("../models/Investments")
const z = require("zod");

const addInvestsSchema = z.object({
    amount: z.number(),
    tenure: z.number(),
    monthlyEarnings: z.string(), 
    lenderID: z.string()
});

// authMiddleware adds id of the lender from the cookie to req.lenderID
const addInvestments = async (req, res) => {
    try {
        const body = req.body;
        const { success } = addInvestsSchema.safeParse(body);
        if(!success) {
            throw("Invalid entries");
        }

        const newInv = new Investments(req.body);
        // const newInv = new Investments({...req.body, lenderID: req.lenderID});
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
