import nodemailer from "nodemailer"
const ultraprofitPassword="orszoubuiadnynpu"
  const ultraprofitEmail="ulltraprofitcompany@gmail.com"
  


 const sendMail=(email,message,html)=>{
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
             text:message
    
          }
          transporter.sendMail(options,(err,info)=>{
             if(err){
                console.log(err);
                throw new error(err.message)
                return;
             }else{
                return info.response
             }
          })
        }
 
 export default sendMail