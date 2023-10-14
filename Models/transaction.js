const mongoose = require("mongoose")
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
        enum:["pending","approved","rejected"],
        default:"pending"
    },
    baseCurrency:{
        type:String,
        enum: ["naira","dollar"]
    },
    bankName:{
        type:String
    },
    accountName:{
        type:String
    },
    accountNumber:{
        type:String
    }

},{timestamps:true})
module.exports= mongoose.model("Transactions",transactionSchema)