import express from "express"
import {register,getAllUsers} from "./User_controller.js"
const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.get("/",getAllUsers)
export default userRouter