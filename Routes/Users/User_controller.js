import user from "../../Models/Usermodel.js"
import sendMail from "./Sendmail.js"
import getCode from "./generateCode.js"
import appendCodeToHtml from "./Template.js"
import createCustomError from "../../createCustomError.js"
import getResetTemplate from "./resetTemplate.js"
 // delete all users (development only)
const dropusers=async()=>{
  await user.deleteMany()
  console.log("users deleted")
}
dropusers()


export const register = async(req, res, next)=> {
  try{
    
   const code=getCode()
   const response= await sendMail(req.body.email,appendCodeToHtml(code,req.body.userName),next)
   const newUser = await user.create(req.body)
   
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

//login
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
export const forgotPassword=async(req,res,next)=>{
try {
  const {email}=req.body
const thisUser=await user.findOne({email})
if(!thisUser){
  return res.status(404).json({success:false,result:"There is no user with this email"})

}else{
  await sendMail(email,getResetTemplate(thisUser.userName, thisUser._id) )
  return res.status(201).json({success:true, message:"code has been succesfully sent to user"})
}

} catch (error) {
  next(createCustomError(error.message))
}
  

}
export const  updateUser=async(req,res,next)=>{
  const userId=req.params.id;
  try {
    const thisUser=await user.findById(userId);
    if(!thisUser){
      return res.status(404).json({success:false, result:"user not found"})
    }     
    else{
     const newDetails= await user.findByIdAndUpdate(userId,{$set:req.body},{new:true})
     return res.status(202).json({success:true,result:newDetails})

    }

  } catch (error) {
     console.log(error)
     next(createCustomError(error.message))
  }

}