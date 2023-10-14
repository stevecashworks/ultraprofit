 const errorHandler=()=>{
 const {res}=obj;
 res.status(500).json({success:false,result:"Please check the email",message:err.message})
 }
 module.exports= errorHandler