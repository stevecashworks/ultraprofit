const SendUserError= (err,req,res,next)=>{
const {message,code}=err
   return res.status(code).json({success:false,result:message})
}
module.exports=  SendUserError