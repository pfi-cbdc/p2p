const express = require("express");
const app = express();
const borrower =require("./routes/borrower");
const lender = require("./routes/lender")
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.uri);

app.use(express.json());
app.use("/borrower",borrower);
app.use("/lender",lender);

PORT = 5001;
app.listen(PORT, ()=>{
    console.log(`server listening at PORT ${PORT}`);
})





