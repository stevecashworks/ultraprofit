import express from "express"
import {register,getAllUsers,login,getUserById} from "./User_controller.js"
const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/",getAllUsers)
userRouter.get("/:id", getUserById)
export default userRouter