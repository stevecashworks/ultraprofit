import mongoose from "mongoose"
const adminSchema=mongoose.Schema({
    nairaPerDollar:Number,
    dollarPerNaira:Number,
    proof:String
})
export default mongoose.model("Admin",adminSchema)