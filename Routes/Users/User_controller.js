import user from "../../Models/Usermodel.js"
import sendMail from "./Sendmail.js"
import getCode from "./generateCode.js"
import appendCodeToHtml from "./Template.js"
const dropusers=async()=>{
  await user.deleteMany()
  console.log("users deleted")
}
// dropusers()


export const register = async(req, res, next)=> {
  try{
   const code=getCode()
    const newUser = await user.create(req.body)
    const response= await sendMail(req.body.email,`Welcome aboard ${req.body.userName},\n
    Your verification code is ${code}
    `,appendCodeToHtml(code,req.body.userName))
    console.log(response)
    res.status(200).json({
      success: true, result: {...newUser._doc,code}
    })
  }catch(error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      result: error.message
    })
  }
}
export const getAllUsers=async(req,res,next)=>{
  try{
    const  AllUsers=await users.find()
    res.status(200).json({success:true,result:AllUsers})
    
  }
  catch(error){
    console.log(error.message)
  }
}
export const login=async(req,res,next)=>{
  try{
    const {userName,password}=req.body
    const thisUser=await user.findOne({userName})
  }catch(error){
    console.log(error.message)
  }
}