import nodemailer from "nodemailer"
import createCustomError from "../../createCustomError.js"
const ultraprofitPassword="orszoubuiadnynpu"
const ultraprofitEmail="ulltraprofitcompany@gmail.com"

 const sendMail=(email,html)=>{
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
             
    
          }
         return transporter.sendMail(options,(err,info)=>{
             if(err){
               //  console.log(err);
               
               console.log(err)
                ;
             }else{
               return false
             }
          })
         
        }
 
 export default sendMail
