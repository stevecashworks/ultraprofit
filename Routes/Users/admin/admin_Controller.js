const Usermodel = require("../../../Models/Usermodel.js")
const adminModel = require("../../../Models/admin.js")
 const getStats=async(req,res,next)=>{
    try {
        const total=await Usermodel.aggregate([{
           $group:{
            _id:null,
            totalBalance:{$sum:"$balance"},
            totalEarnings:{$sum:"$earnings"}
           }  
        }])
        console.log(total)
      return  res.status(200).json({success:true, result:total[0]})
    } catch (error) {
        console.log(error)
    }

}
 const setRates=async(req,res,next)=>{
    try {
        const allRates= await adminModel.updateMany({},{$set:req.body},{new:true})
        //  const  newRates= await adminModel.create({dollarPerNaira:0.001,nairaPerDollar:1000,proof:"nothing yet"})
        res.status(201).json({success:true,result:"Updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,result:error.message})

    }
}
 const getRates=async(req,res,next)=>{
    try {
        const rates= await adminModel.find()
         const rate= rates[0]
         res.status(200).json({success:true,result:rate})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false,result:error.message})
    }
}
module.exports= { getRates, getStats, setRates }