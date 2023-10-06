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
console.log(`Date : ${new Date().toLocaleString()}`)
let date= new Date()

const  updateUsers=async()=>{
  try{

    const allUsers =await Usermodel.find()
    const date=new Date()
    const currentDate= date.toLocaleDateString()
    allUsers.forEach(async(user)=>{
      const  addition=0.02*Number(user.balance)
      let newUserEarnings= Number(user.earnings)+Number(addition)
      if(String(newUserEarnings).length>7){
        newUserEarnings=Number(newUserEarnings.toFixed(4))
      }
      
      user.earnings=newUserEarnings
      
      await user.save()
       console.log(`users updated succesfully last updated at: ${currentDate}`)
    })
    
  }catch(error){
    console.log(error)
  }
}

// schedule my 


const server = express()

setInterval(()=>{
 const  currentDate=new Date()
 const aDayHasPassed=currentDate.getDay()>date.getDay() 
 if(aDayHasPassed){
  date=new Date()
  console.log("A day has passed")
  updateUsers()
 }
 else{
  console.log("It's not up to a minute yet only an hour has passed")

 }
},3600000)

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
