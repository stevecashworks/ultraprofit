import express from "express"
import dotenv from "dotenv"
import connect_Db from "./Connect_db.js"
import cors from "cors"
import userRoute from "./Routes/Users/userRoute.js"
import transactionRoute from "./Routes/transactions/transactionRoute.js"
import SendUserError from "./sendUserError.js"
import adminRoute from "./Routes/Users/admin/adminRoute.js"
dotenv.config()
import Usermodel from "./Models/Usermodel.js"
import cron from "node-cron"
const  updateUsers=async()=>{
  try{

    const allUsers =await Usermodel.find()
    allUsers.forEach(async(user)=>{
      const  addition=0.02*user.balance
      user.earnings+=addition
      await user.save()
    })
     console.log("users updated succefully")
  }catch(error){
    console.log(error)
  }
}
cron.schedule("0 0 * * *",updateUsers)


const server = express()


// cross platform origins
server.use(express.json())
server.use(cors())
server.use("/users",userRoute)
server.use("/transactions",transactionRoute)
server.use("/admin", adminRoute)
server.get("/", (req,res)=>{res.send("hello steve")})
server.use(SendUserError)


const port = process.env.port 
const startServer = async()=> {
  try {
    await connect_Db(process.env.mongo_uri)
    console.log("database connected successfully")
    server.listen(port,()=>console.log(`server is  listening on port ${port}`))
  }catch(error) {
    console.log(error.message)
  }

}
startServer()
