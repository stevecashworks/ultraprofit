const Usermodel=("../../Models/Usermodel.js");
const sendMail =require("./Sendmail.js");
const notify=async(req,res,next)=>{
try {
     const {message}=req.body
     const sendMultiple=(list)=>{
        list.forEach(async(user)=>{
          await sendMail(user.email,"",message)
        })
    }
    const allUsers= await Usermodel.find()
    await sendMultiple(allUsers)
    res.status(201).json({success:true,result:"users have been notified"})
} catch (error) {
    console.log(error.message)
    return res.status(500).json({success:false,result:error.message})
}
}
module.exports= notify