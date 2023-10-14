const express = require("express")
const dotenv = require("dotenv")
const connect_Db = require("./Connect_db.js")
const cors = require("cors")
const userRoute = require("./Routes/Users/userRoute.js")
const transactionRoute = require("./Routes/transactions/transactionRoute.js")
const SendUserError = require("./sendUserError.js")
const adminRoute = require("./Routes/Users/admin/adminRoute.js")
const Usermodel = require("./Models/Usermodel.js")
dotenv.config()
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
  console.log("It's not up to a day yet yet only an hour has passed")

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
