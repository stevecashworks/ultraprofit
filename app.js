import express from "express"
import dotenv from "dotenv"
import connect_Db from "./Connect_db.js"
import cors from "cors"
import userRoute from "./Routes/Users/userRoute.js"
import transactionRoute from "./Routes/transactions/transactionRoute.js"
import SendUserError from "./sendUserError.js"
dotenv.config()

const server = express()

// cross platform origins
server.use(express.json())
server.use(cors())
server.use("/users",userRoute)
server.use("/transactions",transactionRoute)
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
