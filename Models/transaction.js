import mongoose from "mongoose"
const transactionSchema= new mongoose.Schema({
    userId:{
        required:true,
        type:String,

    },
    wallet_id:{
        type:String
    },
    amount:{
        type:Number,
        required:true
    }

},{timestamps:true})
export default mongoose.model("Transactions",transactionSchema)