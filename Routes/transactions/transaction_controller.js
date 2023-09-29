import transaction from "../../Models/transaction.js"
import Usermodel from "../../Models/Usermodel.js"
// Deposit funds
export const deposit=async(req,res,next)=>{
    try {
        const  id= req.user.id
        const userId=id
        const userExists= await Usermodel.findById(id);
        if(!userExists){
            return res.status(404).json({success:false,result:"User not found,try logging in"})
        }else{
            const newTransaction= await transaction.create({...req.body,transaction_type:"deposit",userId})
            res.status(200).json({success:true,result:newTransaction})
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,result:error.message})
    }
}

// withdraw funds
export const  withdrawFunds=async(req,res,next)=>{
 try {
    const  id= req.user.id
        const userId=id
        const userExists= await Usermodel.findById(id);
        if(!userExists){
            return res.status(404).json({success:false,result:"User not found,try logging in"})
        }else{
            const newTransaction= await transaction.create({...req.body,transaction_type:"withdrawal",userId})
            res.status(200).json({success:true,result:newTransaction})
        }
 } catch (error) {
    console.log(error)
    res.status(500).json({success:false,result:error.message}) 
 }   
}

//show All transactions (admins only)
 export const allTransactions=async(req,res,next)=>{
  try {
    const allTransactions=await transaction.find()
    res.status(201).json({success:true,result:allTransactions})

  } catch (error) {
    console.log(error)
    res.status(200).json({success:false,result:error.message})
  }  
 }

 // get all users deposits
 export const getDeposits =async(req,res,next)=>{
    try {
      const allTransactions=await transaction.find({transaction_type:"deposit"}).populate("userId")
      res.status(201).json({success:true,result:allTransactions})
  
    } catch (error) {
      console.log(error)
      res.status(200).json({success:false,result:error.message})
    }  
   }
   //get all users withdrawals

   export const getWithdrawals =async(req,res,next)=>{
    try {
      const allTransactions=await transaction.find({transaction_type:"withdrawal"}).populate("userId")
      res.status(201).json({success:true,result:allTransactions})
  
    } catch (error) {
      console.log(error)
      res.status(200).json({success:false,result:error.message})
    }  
   }
   

export const approveTransaction=async(req,res,next)=>{
try {
   const  transactionId=req.params.id;
    const thisTransaction=  await transaction.findById(transactionId)
    const doNotremove=thisTransaction.source=="earnings"||thisTransaction.source=="referral bonus"
    if(!thisTransaction){
      return res.status(500).json({success:false,result:"Transaction not valid"})
    }
    else{
      if(thisTransaction.status=="approved"){
        return res.status(200).json({success:true,result:"Transaction has already been approved"})
      }
      const {userId,transaction_type,amount}= thisTransaction;
      const thisUser= await Usermodel.findById(userId);
      if(!thisUser){
        return res.status(404).json({success:false,result:`user not found`})
      }
      else{
        if(thisUser.referrer){
         const allTransactionsByThisUser=await transaction.find({userId,status:"approved"})
         console.log(allTransactionsByThisUser)
         console.log(thisUser)
         if(allTransactionsByThisUser.length===0){
          const  addition=0.05*amount

          await Usermodel.findByIdAndUpdate(thisUser.referrer,{$inc:{referralBonus:addition}},{new:true})
         }  
        }
         let  addition=transaction_type=="deposit"?amount:amount*(-1)
         if(doNotremove){
          addition=0
         }
         const newUserDetails= await Usermodel.findByIdAndUpdate(userId,{$inc:{balance:addition}},{new:true})
         const newTransactionDetails= await transaction.findByIdAndUpdate(transactionId,{$set:{status:"approved"}},{new:true}) 
         
         //  add referrer's 
         
         
         return res.status(200).json({success:true,result:{newUserDetails,message:"transaction approved"}})
        }
    }
} catch (error) {
  console.log(error.message);
  return res.status(500).json({success:false,result:error.message})
}
}
export const getMyDeposits= async(req,res,next)=>{
try {
  const userId=req.user.id
const myDeposits= await transaction.find({userId,transaction_type:"deposit"})
return res.status(200).json({success:true,result:myDeposits})
} catch (error) {
  console.log(error.message)
  
  return res.staus(500).json({success:false,result:error.message})
}
  
}













export const getMyWithdrawals= async(req,res,next)=>{
  try {
    const userId=req.user.id
  const myDeposits= await transaction.find({userId,transaction_type:"withdrawal"})
  return res.status(200).json({success:true,result:myDeposits})
  } catch (error) {
    console.log(error.message)
    
    return res.staus(500).json({success:false,result:error.message})
  }
    
  }
  export const getMyTransactions= async(req,res,next)=>{
    try {
      const userId=req.user.id
    const myDeposits= await transaction.find({userId})
    return res.status(200).json({success:true,result:myDeposits})
    } catch (error) {
      console.log(error.message)
      
      return res.staus(500).json({success:false,result:error.message})
    }
      
    }
    export const declineTransaction=async(req,res,next)=>{
      try{
        const  transactionId=req.params.id
        const thisTransaction=await transaction.findById(transactionId)
        if(!thisTransaction){
          return res.status(404).json({success:false, result:"we couldn't process transcaction details"})
        }else{
            if(thisTransaction.status!="pending"){
              return res.status(200).json({success:false,result:"Transaction has been proccessed"})
            }
            else{
               const  newTransaction= await transaction.findByIdAndUpdate(transactionId,{$set:{status:"rejected"}},{new:true})
              return res.status(200).json({success:true,result:newTransaction})
            }
        }
      }catch(error){
        console.log(error.message)
       return res.status(500).json({success:false,result:error.message})
      }

    }