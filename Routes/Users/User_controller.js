const user = require("../../Models/Usermodel.js")
const sendMail = require("./Sendmail.js")
const getCode = require("./generateCode.js")
const appendCodeToHtml = require("./Template.js")
const createCustomError = require("../../createCustomError.js")
const getResetTemplate = require("./resetTemplate.js")
const  dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
dotenv.config()
// delete all users (development only)
 const shorten=(str)=>{
  if(str.length>6){
    return(str.substr(0,6))
  }
  return str
 }
  const verifyUserEmail=async(req,res,next)=>{
  try {
   const code=getCode()
   const shortCode=shorten(code) 
   await sendMail(req.body.email,appendCodeToHtml(shortCode,req.body.userName),next)
 return res.status(200).json({success:true,result:shortCode})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({success:false,result:error.message})
  }
}


 const register = async(req, res, next)=> {
  try{
    
   //
   const newUser = await user.create(req.body)
   const accessToken=jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.jwt_pass)
       res.status(200).json({
      success: true, result: {...newUser._doc,tk:accessToken}
    })
    return
  }
  catch(error) {
    console.log(error.message)
  //  
  res.status(500).json({success:false,result:error.message})
  }
}

 const getAllUsers=async(req,res,next)=>{
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
 const login=async(req,res,next)=>{
  try{
    const {userName,password}=req.body
    console.log(req.body)
    const thisUser=await user.findOne({userName})
    if(!thisUser){
     return res.status(404).json({success:false,result:`Invalid user name or password`})
    }
    else{
      if(password!=thisUser.password){
return res.status(404).json({success:false,result:`Invalid email or password`})
      }
    }
    const token=jwt.sign({id:thisUser._id,isAdmin:thisUser.isAdmin},process.env.jwt_pass)
  return  res.status(200).json({success:true,result:{...thisUser._doc,tk:token}})
  }catch(error){
    console.log(error.message)
    res.status(500).json({success:false,result:error.message})
  }
}
 const getUserById=async(req,res)=>{
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
 const forgotPassword=async(req,res,next)=>{
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
 const  updateUser=async(req,res,next)=>{
  const userId=req.params.id;
  console.log({userId})
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
 const deleteSingleUser=async(req,res,next)=>{
  try {

    console.log("deleting...")
    const id=req.params.id
     const deleted= await user.findByIdAndDelete(id)
     res.status(201).json({success:true,result:"user deleted successfully"})
    
  } catch (error) {
    console.log(error)
    next(createCustomError(error.message))
  }

}
 const  loginWithToken=async(req,res,next)=>{
  try {
     if(req.user){
      const userDetails=await user.findById(req.user.id)
       res.status(200).json({success:true,result:userDetails})
     }
     else{
      res.status(403).json({success:false,result:"user Authentication failed"})
     }
  } catch (error) {
    console.log(error)
    next(createCustomError(error.message))
  }

}
module.exports={register,getAllUsers,login,getUserById,forgotPassword, updateUser, deleteSingleUser, loginWithToken, verifyUserEmail}