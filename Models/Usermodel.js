import mongoose from "mongoose"
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true

  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    
  },
  wallet_id: {
    type: String,
    required: true,

  },
  referrer: {
    type: String
  }, 
  balance:{
    type:Number,
    default:0,
    
  },
  earnings:{
    type:Number,
    default:0
  },
  isAdmin:{
    type:Boolean,
    default:false
  }


},{timestamps:true}
)
export default mongoose.model("users", userSchema)