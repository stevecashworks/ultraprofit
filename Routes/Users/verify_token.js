import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const verifyToken=async(req,res,next)=>{
    try {
       
        const token= req.headers.token
        const user=jwt.verify(token,process.env.jwt_pass,(err,user)=>{
           if(err){
               console.log(err.message)
               return res.status(403).json({success:false,result:"You are not allowed , authentication failed"}
               )
               
           }
           else{
               req.user=user
               next()
           }
        })
    } catch (error) {
        console.log(error)
        return res.status(403).json({success:false,result:error.message})
        
    }
    
}
export const verifyAdmin=(req,res,next)=>{
    try {
       
        const token= req.headers.token
        const user=jwt.verify(token,process.env.jwt_pass,(err,user)=>{
           if(err){
               console.log(err.message)
               return res.status(403).json({success:false,result:"You are not allowed , authentication failed"}
               )
               
           }
           else{
            if(user.isAdmin){
                req.user=user

                next()
            }else{
                return res.status(403).json({success:false,result:"Only admins can do this"})
            }
               
           }
        })
    } catch (error) {
        console.log(error)
        return res.status(403).json({success:false,result:error.message})
        
    }
    
}
