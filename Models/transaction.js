import mongoose from "mongoose"
const transactionSchema= new mongoose.Schema({
    userId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"

    },
    wallet_id:{
        type:String
    },
    amount:{
        type:Number,
        required:true
    },
    transaction_type:{
        type:String,
        enum:["withdrawal","deposit"]
    },
    source:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","approve","rejected"],
        default:"pending"
    }

},{timestamps:true})
export default mongoose.model("Transactions",transactionSchema)