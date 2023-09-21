import user from "../../Models/Usermodel.js"
import sendMail from "./Sendmail.js"
import getCode from "./generateCode.js"
import appendCodeToHtml from "./Template.js"
const dropusers=async()=>{
  await user.deleteMany()
  console.log("users deleted")
}
dropusers()


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
    const  AllUsers=await user.find()
    res.status(200).json({success:true,result:AllUsers})
    
  }
  catch(error){
    console.log(error.message)
    res.status(500).json({success:false,result:error.message})
  }
}
export const login=async(req,res,next)=>{
  try{
    const {email,password}=req.body
    const thisUser=await user.findOne({email})
    if(!thisUser){
     return res.status(404).json({success:false,result:`Invalid email or password`})
    }
    else{
      if(password!=thisUser.password){
return res.status(404).json({success:false,result:`Invalid email or password`})
      }
    }
  return  res.status(200).json({success:true,result:thisUser})
  }catch(error){
    console.log(error.message)
    res.status(500).json({success:false,result:error.message})
  }
}
export const getUserById=async(req,res)=>{
  const {id}=req.params 
  try{
const thisUser =await user.findById(id)
  if(!thisUser){
    return res.status(500).json({success:false,result:"User not found"})
  }else{
return res.status(200).json({success:true,result:thisUser})
  }
  }catch(error){
    console.log(error.message)
return res.status(500).json({success:true,result:error.message})
  }
  
}