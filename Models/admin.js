const mongoose =require("mongoose")
const adminSchema=mongoose.Schema({
    nairaPerDollar:Number,
    dollarPerNaira:Number,
    proof:String
})
module.exports= mongoose.model("Admin",adminSchema)