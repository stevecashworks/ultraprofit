import Usermodel from "../../../Models/Usermodel.js"
export const getStats=async(req,res,next)=>{
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