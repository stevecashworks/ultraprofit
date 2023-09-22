const SendUserError= (err,req,res,next)=>{
const {message,statusCode}=err
   return res.status(statusCode).json({success:false,result:message})
}
export default  SendUserError