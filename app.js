import express from "express"
import dotenv from "dotenv"
import connect_Db from "./Connect_db.js"
import cors from "cors"
import userRoute from "./Routes/Users/userRoute.js"
dotenv.config()

const server = express()

// cross platform origins
server.use(express.json())
server.use(cors())
server.use("/users",userRoute)
server.get("/", (req,res)=>{res.send("hello steve")})


const port = process.env.port || 5001
const startServer = async()=> {
  try {
    await connect_Db(process.env.mongo_uri)
    console.log("database connected successfully")
    server.listen(port,()=>console.log(port))
  }catch(error) {
    console.log(error.message)
  }

}
startServer()