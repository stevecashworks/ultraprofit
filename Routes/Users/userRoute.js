import express from "express"
import {register,getAllUsers,login,getUserById,forgotPassword, updateUser} from "./User_controller.js"
const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/",getAllUsers)
userRouter.get("/:id", getUserById)
userRouter.post("/sendlink",forgotPassword)
userRouter.post("/update/:id",updateUser)
export default userRouter