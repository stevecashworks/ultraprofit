import express from "express"
import {register} from "./User_controller.js"
const userRouter=express.Router()

userRouter.post("/register",register)
export default userRouter