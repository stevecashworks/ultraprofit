const  nodemailer = require("nodemailer")
// import createCustomError from "../../createCustomError.js"
const ultraprofitPassword="orszoubuiadnynpu"
const ultraprofitEmail="ulltraprofitcompany@gmail.com"

 const sendMail=(email,html,hasText=false)=>{
   const text=hasText?hasText:""
       const transporter=nodemailer.createTransport({
          service:'gmail',
          auth:{
             user:/*'eventsnorwood@gmail.com'*/ultraprofitEmail,
              pass:/*'ldxybwgafkzoijwn'*/ultraprofitPassword
          }})
          const options={
             from:/*'eventsnorwood@gmail.com'*/ultraprofitEmail,
             to:email,
             subject:"Welcome",
             html:html,
             text
             
    
          }
         return transporter.sendMail(options,(err,info)=>{
             if(err){
               //  console.log(err);
               
               console.log(err.message)
                ;
             }else{
               return false
             }
          })
         
        }
 
 module.exports= sendMail
